from fastapi import APIRouter, HTTPException
from typing import List, Optional
from models import MenuItem, MenuCategory
from services import menu_service

router = APIRouter()


@router.get("/", response_model=List[MenuItem])
async def get_menu():
    """Get all available menu items"""
    return await menu_service.get_available_menu_items()


@router.get("/all", response_model=List[MenuItem])
async def get_all_menu():
    """Get all menu items (including unavailable) - for admin"""
    return await menu_service.get_all_menu_items()


@router.get("/category/{category}", response_model=List[MenuItem])
async def get_menu_by_category(category: MenuCategory):
    """Get menu items by category"""
    return await menu_service.get_menu_items_by_category(category)


@router.get("/{item_id}", response_model=MenuItem)
async def get_menu_item(item_id: str):
    """Get a single menu item"""
    item = await menu_service.get_menu_item_by_id(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item
