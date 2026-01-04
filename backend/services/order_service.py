from typing import List, Optional, Dict, Any
from datetime import datetime
from decimal import Decimal
import json
import uuid
from models import Order, OrderCreate, OrderUpdate, OrderStatus, OrderItem
from services.database_service import fetch_one, fetch_all, execute_returning


def _row_to_order(row: dict) -> Order:
    """Convert a database row to Order, handling type conversions"""
    data = dict(row)
    # Convert Decimal to float
    for key in ['subtotal', 'tax', 'total']:
        if isinstance(data.get(key), Decimal):
            data[key] = float(data[key])
    # Parse JSON items
    if isinstance(data.get('items'), str):
        data['items'] = json.loads(data['items'])
    # Convert items to OrderItem objects
    if data.get('items'):
        data['items'] = [OrderItem(**item) if isinstance(item, dict) else item for item in data['items']]
    return Order(**data)


async def create_order(order_data: OrderCreate, subtotal: float, tax: float, total: float) -> Order:
    """Create a new order"""
    order_id = str(uuid.uuid4())
    items_json = json.dumps([item.model_dump() for item in order_data.items])

    row = await execute_returning(
        """
        INSERT INTO orders (id, customer_name, customer_email, customer_phone,
                           items, subtotal, tax, total, status, special_instructions, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
        """,
        order_id,
        order_data.customer_name,
        order_data.customer_email,
        order_data.customer_phone,
        items_json,
        subtotal,
        tax,
        total,
        OrderStatus.PENDING.value,
        order_data.special_instructions,
        datetime.utcnow()
    )
    return _row_to_order(row)


async def get_order_by_id(order_id: str) -> Optional[Order]:
    """Get an order by ID"""
    row = await fetch_one(
        "SELECT * FROM orders WHERE id = $1",
        order_id
    )
    if row:
        return _row_to_order(row)
    return None


async def get_order_status_only(order_id: str) -> Optional[Dict[str, Any]]:
    """Get only order status fields (optimized for polling)"""
    row = await fetch_one(
        "SELECT id, status, estimated_ready_time FROM orders WHERE id = $1",
        order_id
    )
    if row:
        return {
            "order_id": str(row["id"]),
            "status": row["status"],
            "estimated_ready_time": row.get("estimated_ready_time")
        }
    return None


async def update_order(order_id: str, update_data: OrderUpdate) -> Optional[Order]:
    """Update an order"""
    update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
    if not update_dict:
        return await get_order_by_id(order_id)

    # Convert enum to string if present
    if "status" in update_dict:
        update_dict["status"] = update_dict["status"].value

    # Build dynamic update query
    set_clauses = ["updated_at = $1"]
    values = [datetime.utcnow()]

    for i, (key, value) in enumerate(update_dict.items(), start=2):
        set_clauses.append(f"{key} = ${i}")
        values.append(value)

    values.append(order_id)
    query = f"""
        UPDATE orders
        SET {', '.join(set_clauses)}
        WHERE id = ${len(values)}
        RETURNING *
    """

    row = await execute_returning(query, *values)
    if row:
        return _row_to_order(row)
    return None


async def update_order_status(order_id: str, status: OrderStatus, payment_id: Optional[str] = None) -> Optional[Order]:
    """Update order status"""
    if payment_id:
        row = await execute_returning(
            """
            UPDATE orders
            SET status = $1, payment_id = $2, updated_at = $3
            WHERE id = $4
            RETURNING *
            """,
            status.value,
            payment_id,
            datetime.utcnow(),
            order_id
        )
    else:
        row = await execute_returning(
            """
            UPDATE orders
            SET status = $1, updated_at = $2
            WHERE id = $3
            RETURNING *
            """,
            status.value,
            datetime.utcnow(),
            order_id
        )

    if row:
        return _row_to_order(row)
    return None


async def get_active_orders() -> List[Order]:
    """Get all active orders (paid, preparing, ready)"""
    rows = await fetch_all(
        """
        SELECT * FROM orders
        WHERE status = ANY($1)
        ORDER BY created_at ASC
        """,
        [OrderStatus.PAID.value, OrderStatus.PREPARING.value, OrderStatus.READY.value]
    )
    return [_row_to_order(row) for row in rows]


async def get_orders_by_status(status: OrderStatus) -> List[Order]:
    """Get orders by status"""
    rows = await fetch_all(
        "SELECT * FROM orders WHERE status = $1 ORDER BY created_at ASC",
        status.value
    )
    return [_row_to_order(row) for row in rows]


async def get_recent_orders(limit: int = 50) -> List[Order]:
    """Get recent orders"""
    rows = await fetch_all(
        "SELECT * FROM orders ORDER BY created_at DESC LIMIT $1",
        limit
    )
    return [_row_to_order(row) for row in rows]


async def get_todays_orders() -> List[Order]:
    """Get today's orders"""
    today = datetime.utcnow().date()
    rows = await fetch_all(
        "SELECT * FROM orders WHERE created_at >= $1 ORDER BY created_at DESC",
        today
    )
    return [_row_to_order(row) for row in rows]


async def get_dashboard_stats() -> Dict[str, Any]:
    """
    Get dashboard statistics using SQL aggregations.
    More efficient than fetching all orders and calculating in Python.
    """
    today = datetime.utcnow().date()

    # Get today's orders with just the fields we need
    today_rows = await fetch_all(
        "SELECT status, total FROM orders WHERE created_at >= $1",
        today
    )

    # Calculate stats
    total_orders = len(today_rows)
    completed_orders = sum(1 for o in today_rows if o["status"] == OrderStatus.COMPLETED.value)
    cancelled_orders = sum(1 for o in today_rows if o["status"] == OrderStatus.CANCELLED.value)
    total_revenue = sum(
        float(o["total"]) if isinstance(o["total"], Decimal) else o["total"]
        for o in today_rows
        if o["status"] != OrderStatus.CANCELLED.value
    )

    # Get active orders count
    active_rows = await fetch_all(
        "SELECT status FROM orders WHERE status = ANY($1)",
        [OrderStatus.PAID.value, OrderStatus.PREPARING.value, OrderStatus.READY.value]
    )

    pending = sum(1 for o in active_rows if o["status"] == OrderStatus.PAID.value)
    preparing = sum(1 for o in active_rows if o["status"] == OrderStatus.PREPARING.value)
    ready = sum(1 for o in active_rows if o["status"] == OrderStatus.READY.value)

    return {
        "today": {
            "total_orders": total_orders,
            "completed_orders": completed_orders,
            "total_revenue": float(total_revenue),
        },
        "active": {
            "pending": pending,
            "preparing": preparing,
            "ready": ready,
        }
    }
