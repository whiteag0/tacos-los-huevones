from fastapi import APIRouter, HTTPException, Depends, Header
from typing import List, Optional
from models import (
    MenuItem, MenuItemCreate, MenuItemUpdate,
    Order, OrderUpdate, OrderStatus,
    BusinessSettings, BusinessSettingsUpdate
)
from services import menu_service, order_service, settings_service, notification_service
from config import get_settings

router = APIRouter()
config = get_settings()


async def verify_admin(x_admin_key: str = Header(...)):
    """Verify admin API key"""
    if x_admin_key != config.admin_api_key:
        raise HTTPException(status_code=401, detail="Invalid admin key")
    return True


# ============ MENU MANAGEMENT ============

@router.post("/menu", response_model=MenuItem, dependencies=[Depends(verify_admin)])
async def create_menu_item(item: MenuItemCreate):
    """Create a new menu item"""
    return await menu_service.create_menu_item(item)


@router.put("/menu/{item_id}", response_model=MenuItem, dependencies=[Depends(verify_admin)])
async def update_menu_item(item_id: str, item: MenuItemUpdate):
    """Update a menu item"""
    updated = await menu_service.update_menu_item(item_id, item)
    if not updated:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return updated


@router.delete("/menu/{item_id}", dependencies=[Depends(verify_admin)])
async def delete_menu_item(item_id: str):
    """Delete a menu item"""
    deleted = await menu_service.delete_menu_item(item_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return {"status": "deleted"}


@router.patch("/menu/{item_id}/availability", response_model=MenuItem, dependencies=[Depends(verify_admin)])
async def toggle_item_availability(item_id: str, is_available: bool):
    """Toggle menu item availability"""
    item = await menu_service.toggle_availability(item_id, is_available)
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item


# ============ ORDER MANAGEMENT ============

@router.get("/orders/active", response_model=List[Order], dependencies=[Depends(verify_admin)])
async def get_active_orders():
    """Get all active orders"""
    return await order_service.get_active_orders()


@router.get("/orders/today", response_model=List[Order], dependencies=[Depends(verify_admin)])
async def get_todays_orders():
    """Get today's orders"""
    return await order_service.get_todays_orders()


@router.get("/orders/recent", response_model=List[Order], dependencies=[Depends(verify_admin)])
async def get_recent_orders(limit: int = 50):
    """Get recent orders"""
    return await order_service.get_recent_orders(limit)


@router.patch("/orders/{order_id}/status", response_model=Order, dependencies=[Depends(verify_admin)])
async def update_order_status(order_id: str, status: OrderStatus):
    """Update order status"""
    order = await order_service.update_order_status(order_id, status)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Send notification when order is ready
    if status == OrderStatus.READY:
        await notification_service.send_order_ready(order)

    return order


@router.patch("/orders/{order_id}", response_model=Order, dependencies=[Depends(verify_admin)])
async def update_order(order_id: str, update_data: OrderUpdate):
    """Update an order"""
    order = await order_service.update_order(order_id, update_data)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


# ============ SETTINGS MANAGEMENT ============

@router.get("/settings", response_model=BusinessSettings, dependencies=[Depends(verify_admin)])
async def get_business_settings():
    """Get business settings"""
    return await settings_service.get_settings()


@router.put("/settings", response_model=BusinessSettings, dependencies=[Depends(verify_admin)])
async def update_business_settings(updates: BusinessSettingsUpdate):
    """Update business settings"""
    return await settings_service.update_settings(updates)


@router.post("/settings/toggle-orders", response_model=BusinessSettings, dependencies=[Depends(verify_admin)])
async def toggle_accepting_orders(accepting: bool):
    """Toggle whether accepting orders"""
    return await settings_service.toggle_accepting_orders(accepting)


# ============ DASHBOARD STATS ============

@router.get("/stats", dependencies=[Depends(verify_admin)])
async def get_dashboard_stats():
    """Get dashboard statistics"""
    todays_orders = await order_service.get_todays_orders()
    active_orders = await order_service.get_active_orders()
    settings = await settings_service.get_settings()

    # Calculate stats
    total_revenue = sum(o.total for o in todays_orders if o.status != OrderStatus.CANCELLED)
    completed_orders = len([o for o in todays_orders if o.status == OrderStatus.COMPLETED])
    pending_orders = len([o for o in active_orders if o.status == OrderStatus.PAID])
    preparing_orders = len([o for o in active_orders if o.status == OrderStatus.PREPARING])

    return {
        "today": {
            "total_orders": len(todays_orders),
            "completed_orders": completed_orders,
            "total_revenue": total_revenue,
        },
        "active": {
            "pending": pending_orders,
            "preparing": preparing_orders,
            "ready": len([o for o in active_orders if o.status == OrderStatus.READY]),
        },
        "settings": {
            "is_accepting_orders": settings.is_accepting_orders,
            "estimated_wait_minutes": settings.estimated_wait_minutes,
        }
    }
