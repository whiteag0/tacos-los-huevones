from typing import List, Optional
from datetime import datetime, timedelta
from models import Order, OrderCreate, OrderUpdate, OrderStatus
from services.supabase_service import get_supabase
import uuid


async def create_order(order_data: OrderCreate, subtotal: float, tax: float, total: float) -> Order:
    """Create a new order"""
    supabase = get_supabase()

    order_dict = {
        "id": str(uuid.uuid4()),
        "customer_name": order_data.customer_name,
        "customer_email": order_data.customer_email,
        "customer_phone": order_data.customer_phone,
        "items": [item.model_dump() for item in order_data.items],
        "subtotal": subtotal,
        "tax": tax,
        "total": total,
        "status": OrderStatus.PENDING.value,
        "special_instructions": order_data.special_instructions,
        "created_at": datetime.utcnow().isoformat(),
    }

    response = supabase.table("orders").insert(order_dict).execute()
    return Order(**response.data[0])


async def get_order_by_id(order_id: str) -> Optional[Order]:
    """Get an order by ID"""
    supabase = get_supabase()
    response = supabase.table("orders").select("*").eq("id", order_id).single().execute()
    if response.data:
        return Order(**response.data)
    return None


async def update_order(order_id: str, update_data: OrderUpdate) -> Optional[Order]:
    """Update an order"""
    supabase = get_supabase()
    update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow().isoformat()

    # Convert enum to string if present
    if "status" in update_dict:
        update_dict["status"] = update_dict["status"].value

    response = supabase.table("orders").update(update_dict).eq("id", order_id).execute()
    if response.data:
        return Order(**response.data[0])
    return None


async def update_order_status(order_id: str, status: OrderStatus, payment_id: Optional[str] = None) -> Optional[Order]:
    """Update order status"""
    supabase = get_supabase()
    update_dict = {
        "status": status.value,
        "updated_at": datetime.utcnow().isoformat()
    }
    if payment_id:
        update_dict["payment_id"] = payment_id

    response = supabase.table("orders").update(update_dict).eq("id", order_id).execute()
    if response.data:
        return Order(**response.data[0])
    return None


async def get_active_orders() -> List[Order]:
    """Get all active orders (paid, preparing, ready)"""
    supabase = get_supabase()
    response = supabase.table("orders").select("*").in_(
        "status", [OrderStatus.PAID.value, OrderStatus.PREPARING.value, OrderStatus.READY.value]
    ).order("created_at", desc=False).execute()
    return [Order(**order) for order in response.data]


async def get_orders_by_status(status: OrderStatus) -> List[Order]:
    """Get orders by status"""
    supabase = get_supabase()
    response = supabase.table("orders").select("*").eq("status", status.value).order("created_at", desc=False).execute()
    return [Order(**order) for order in response.data]


async def get_recent_orders(limit: int = 50) -> List[Order]:
    """Get recent orders"""
    supabase = get_supabase()
    response = supabase.table("orders").select("*").order("created_at", desc=True).limit(limit).execute()
    return [Order(**order) for order in response.data]


async def get_todays_orders() -> List[Order]:
    """Get today's orders"""
    supabase = get_supabase()
    today = datetime.utcnow().date().isoformat()
    response = supabase.table("orders").select("*").gte("created_at", today).order("created_at", desc=True).execute()
    return [Order(**order) for order in response.data]
