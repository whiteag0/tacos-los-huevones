from fastapi import APIRouter, HTTPException
from typing import List
from models import Order, OrderCreate, OrderItem, OrderStatus
from services import order_service, menu_service, settings_service

router = APIRouter()


@router.post("/", response_model=Order)
async def create_order(order_data: OrderCreate):
    """Create a new order"""
    # Get settings for tax rate
    settings = await settings_service.get_settings()

    if not settings.is_accepting_orders:
        raise HTTPException(status_code=400, detail="Sorry, we're not accepting orders right now")

    # Calculate totals
    subtotal = 0.0
    for item in order_data.items:
        menu_item = await menu_service.get_menu_item_by_id(item.menu_item_id)
        if not menu_item:
            raise HTTPException(status_code=400, detail=f"Menu item {item.menu_item_id} not found")
        if not menu_item.is_available:
            raise HTTPException(status_code=400, detail=f"{menu_item.name} is currently unavailable")
        subtotal += menu_item.price * item.quantity

    tax = round(subtotal * settings.tax_rate, 2)
    total = round(subtotal + tax, 2)

    if settings.minimum_order > 0 and subtotal < settings.minimum_order:
        raise HTTPException(
            status_code=400,
            detail=f"Minimum order is ${settings.minimum_order:.2f}"
        )

    order = await order_service.create_order(order_data, subtotal, tax, total)
    return order


@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """Get an order by ID"""
    order = await order_service.get_order_by_id(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.get("/{order_id}/status")
async def get_order_status(order_id: str):
    """Get just the status of an order (for polling)"""
    order = await order_service.get_order_by_id(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return {
        "order_id": order.id,
        "status": order.status,
        "estimated_ready_time": order.estimated_ready_time
    }
