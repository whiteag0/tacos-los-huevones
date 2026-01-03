from typing import List, Optional
from models import MenuItem, MenuItemCreate, MenuItemUpdate, MenuCategory
from services.supabase_service import get_supabase


async def get_all_menu_items() -> List[MenuItem]:
    """Get all menu items"""
    supabase = get_supabase()
    response = supabase.table("menu_items").select("*").order("category").execute()
    return [MenuItem(**item) for item in response.data]


async def get_available_menu_items() -> List[MenuItem]:
    """Get only available menu items"""
    supabase = get_supabase()
    response = supabase.table("menu_items").select("*").eq("is_available", True).order("category").execute()
    return [MenuItem(**item) for item in response.data]


async def get_menu_items_by_category(category: MenuCategory) -> List[MenuItem]:
    """Get menu items by category"""
    supabase = get_supabase()
    response = supabase.table("menu_items").select("*").eq("category", category.value).eq("is_available", True).execute()
    return [MenuItem(**item) for item in response.data]


async def get_menu_item_by_id(item_id: str) -> Optional[MenuItem]:
    """Get a single menu item by ID"""
    supabase = get_supabase()
    response = supabase.table("menu_items").select("*").eq("id", item_id).single().execute()
    if response.data:
        return MenuItem(**response.data)
    return None


async def create_menu_item(item: MenuItemCreate) -> MenuItem:
    """Create a new menu item"""
    supabase = get_supabase()
    response = supabase.table("menu_items").insert(item.model_dump()).execute()
    return MenuItem(**response.data[0])


async def update_menu_item(item_id: str, item: MenuItemUpdate) -> Optional[MenuItem]:
    """Update a menu item"""
    supabase = get_supabase()
    update_data = {k: v for k, v in item.model_dump().items() if v is not None}
    if not update_data:
        return await get_menu_item_by_id(item_id)

    response = supabase.table("menu_items").update(update_data).eq("id", item_id).execute()
    if response.data:
        return MenuItem(**response.data[0])
    return None


async def delete_menu_item(item_id: str) -> bool:
    """Delete a menu item"""
    supabase = get_supabase()
    response = supabase.table("menu_items").delete().eq("id", item_id).execute()
    return len(response.data) > 0


async def toggle_availability(item_id: str, is_available: bool) -> Optional[MenuItem]:
    """Toggle menu item availability"""
    supabase = get_supabase()
    response = supabase.table("menu_items").update({"is_available": is_available}).eq("id", item_id).execute()
    if response.data:
        return MenuItem(**response.data[0])
    return None
