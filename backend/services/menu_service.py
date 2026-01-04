from typing import List, Optional, Dict
from models import MenuItem, MenuItemCreate, MenuItemUpdate, MenuCategory
from services.database_service import fetch_one, fetch_all, execute_returning
from cachetools import TTLCache
from decimal import Decimal

# In-memory cache for menu items (5 minute TTL)
_menu_cache: TTLCache = TTLCache(maxsize=100, ttl=300)
_MENU_CACHE_KEY = "available_menu_items"
_ALL_MENU_CACHE_KEY = "all_menu_items"


def _row_to_menu_item(row: dict) -> MenuItem:
    """Convert a database row to MenuItem, handling Decimal conversion"""
    data = dict(row)
    if isinstance(data.get('price'), Decimal):
        data['price'] = float(data['price'])
    return MenuItem(**data)


def _invalidate_menu_cache():
    """Invalidate all menu caches when menu is modified"""
    _menu_cache.clear()


async def get_all_menu_items() -> List[MenuItem]:
    """Get all menu items (cached for 5 minutes)"""
    if _ALL_MENU_CACHE_KEY in _menu_cache:
        return _menu_cache[_ALL_MENU_CACHE_KEY]

    rows = await fetch_all(
        "SELECT * FROM menu_items ORDER BY category"
    )
    items = [_row_to_menu_item(row) for row in rows]
    _menu_cache[_ALL_MENU_CACHE_KEY] = items
    return items


async def get_available_menu_items() -> List[MenuItem]:
    """Get only available menu items (cached for 5 minutes)"""
    if _MENU_CACHE_KEY in _menu_cache:
        return _menu_cache[_MENU_CACHE_KEY]

    rows = await fetch_all(
        "SELECT * FROM menu_items WHERE is_available = true ORDER BY category"
    )
    items = [_row_to_menu_item(row) for row in rows]
    _menu_cache[_MENU_CACHE_KEY] = items
    return items


async def get_menu_items_by_category(category: MenuCategory) -> List[MenuItem]:
    """Get menu items by category"""
    rows = await fetch_all(
        "SELECT * FROM menu_items WHERE category = $1 AND is_available = true",
        category.value
    )
    return [_row_to_menu_item(row) for row in rows]


async def get_menu_item_by_id(item_id: str) -> Optional[MenuItem]:
    """Get a single menu item by ID"""
    row = await fetch_one(
        "SELECT * FROM menu_items WHERE id = $1",
        item_id
    )
    if row:
        return _row_to_menu_item(row)
    return None


async def get_menu_items_by_ids(item_ids: List[str]) -> Dict[str, MenuItem]:
    """
    Batch fetch multiple menu items by IDs in a single query.
    Returns a dict mapping item_id -> MenuItem for easy lookup.
    """
    if not item_ids:
        return {}

    # Use ANY for batch query - single DB call instead of N calls
    rows = await fetch_all(
        "SELECT * FROM menu_items WHERE id = ANY($1)",
        item_ids
    )

    # Return as dict for O(1) lookups
    return {str(row["id"]): _row_to_menu_item(row) for row in rows}


async def create_menu_item(item: MenuItemCreate) -> MenuItem:
    """Create a new menu item"""
    row = await execute_returning(
        """
        INSERT INTO menu_items (name, description, price, category, image_url,
                               is_available, is_popular, spicy_level, is_vegetarian)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        """,
        item.name,
        item.description,
        item.price,
        item.category,
        item.image_url,
        item.is_available if item.is_available is not None else True,
        item.is_popular if item.is_popular is not None else False,
        item.spicy_level if item.spicy_level is not None else 0,
        item.is_vegetarian if item.is_vegetarian is not None else False
    )
    _invalidate_menu_cache()
    return _row_to_menu_item(row)


async def update_menu_item(item_id: str, item: MenuItemUpdate) -> Optional[MenuItem]:
    """Update a menu item"""
    update_data = {k: v for k, v in item.model_dump().items() if v is not None}
    if not update_data:
        return await get_menu_item_by_id(item_id)

    # Build dynamic update query
    set_clauses = []
    values = []
    for i, (key, value) in enumerate(update_data.items(), start=1):
        set_clauses.append(f"{key} = ${i}")
        values.append(value)

    values.append(item_id)
    query = f"""
        UPDATE menu_items
        SET {', '.join(set_clauses)}
        WHERE id = ${len(values)}
        RETURNING *
    """

    row = await execute_returning(query, *values)
    _invalidate_menu_cache()
    if row:
        return _row_to_menu_item(row)
    return None


async def delete_menu_item(item_id: str) -> bool:
    """Delete a menu item"""
    row = await execute_returning(
        "DELETE FROM menu_items WHERE id = $1 RETURNING id",
        item_id
    )
    _invalidate_menu_cache()
    return row is not None


async def toggle_availability(item_id: str, is_available: bool) -> Optional[MenuItem]:
    """Toggle menu item availability"""
    row = await execute_returning(
        "UPDATE menu_items SET is_available = $1 WHERE id = $2 RETURNING *",
        is_available,
        item_id
    )
    _invalidate_menu_cache()
    if row:
        return _row_to_menu_item(row)
    return None
