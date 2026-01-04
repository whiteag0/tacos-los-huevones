from typing import Optional
from decimal import Decimal
import json
from models import BusinessSettings, BusinessSettingsUpdate, BusinessHours
from services.database_service import fetch_one, execute_returning
from cachetools import TTLCache

# In-memory cache for settings (5 minute TTL)
_settings_cache: TTLCache = TTLCache(maxsize=10, ttl=300)
_SETTINGS_CACHE_KEY = "business_settings"

# Default business hours for Tacos Los Huevones
DEFAULT_HOURS = [
    BusinessHours(day="monday", open_time="08:00", close_time="19:00"),
    BusinessHours(day="tuesday", open_time="08:00", close_time="19:00"),
    BusinessHours(day="wednesday", open_time="08:00", close_time="19:00"),
    BusinessHours(day="thursday", open_time="08:00", close_time="19:00"),
    BusinessHours(day="friday", open_time="08:00", close_time="19:00"),
    BusinessHours(day="saturday", open_time="08:00", close_time="19:00"),
    BusinessHours(day="sunday", open_time="08:00", close_time="15:00"),
]

DEFAULT_SETTINGS = BusinessSettings(
    id="main",
    business_name="Tacos Los Huevones",
    tagline="Authentic Mexican Street Food",
    address="Parker, Colorado",
    hours=DEFAULT_HOURS,
    is_accepting_orders=True,
    estimated_wait_minutes=15,
    tax_rate=0.08,
)


def _invalidate_settings_cache():
    """Invalidate settings cache when settings are modified"""
    _settings_cache.clear()


def _row_to_settings(row: dict) -> BusinessSettings:
    """Convert a database row to BusinessSettings"""
    data = dict(row)
    # Convert Decimal fields to float
    if isinstance(data.get('tax_rate'), Decimal):
        data['tax_rate'] = float(data['tax_rate'])
    if isinstance(data.get('minimum_order'), Decimal):
        data['minimum_order'] = float(data['minimum_order'])
    # Parse hours from JSON if it's a string
    if isinstance(data.get('hours'), str):
        data['hours'] = json.loads(data['hours'])
    # Convert hours to BusinessHours objects
    if data.get('hours'):
        data['hours'] = [BusinessHours(**h) if isinstance(h, dict) else h for h in data['hours']]
    return BusinessSettings(**data)


async def get_settings() -> BusinessSettings:
    """Get business settings (cached for 5 minutes)"""
    # Check cache first
    if _SETTINGS_CACHE_KEY in _settings_cache:
        return _settings_cache[_SETTINGS_CACHE_KEY]

    try:
        row = await fetch_one(
            "SELECT * FROM settings WHERE id = $1",
            "main"
        )
        if row:
            settings = _row_to_settings(row)
            _settings_cache[_SETTINGS_CACHE_KEY] = settings
            return settings
    except Exception:
        pass
    return DEFAULT_SETTINGS


async def update_settings(updates: BusinessSettingsUpdate) -> BusinessSettings:
    """Update business settings"""
    update_dict = {k: v for k, v in updates.model_dump().items() if v is not None}

    # Convert hours to JSON for storage
    if "hours" in update_dict:
        update_dict["hours"] = json.dumps([h.model_dump() for h in update_dict["hours"]])

    if not update_dict:
        return await get_settings()

    # Build upsert query
    columns = ["id"] + list(update_dict.keys())
    values = ["main"] + list(update_dict.values())
    placeholders = [f"${i}" for i in range(1, len(values) + 1)]

    # Build ON CONFLICT update clause
    update_clauses = [f"{k} = EXCLUDED.{k}" for k in update_dict.keys()]

    query = f"""
        INSERT INTO settings ({', '.join(columns)})
        VALUES ({', '.join(placeholders)})
        ON CONFLICT (id) DO UPDATE SET {', '.join(update_clauses)}
        RETURNING *
    """

    await execute_returning(query, *values)
    _invalidate_settings_cache()
    return await get_settings()


async def toggle_accepting_orders(accepting: bool) -> BusinessSettings:
    """Toggle whether the truck is accepting orders"""
    await execute_returning(
        """
        INSERT INTO settings (id, is_accepting_orders)
        VALUES ($1, $2)
        ON CONFLICT (id) DO UPDATE SET is_accepting_orders = EXCLUDED.is_accepting_orders
        RETURNING *
        """,
        "main",
        accepting
    )
    _invalidate_settings_cache()
    return await get_settings()
