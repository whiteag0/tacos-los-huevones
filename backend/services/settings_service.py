from typing import Optional
from models import BusinessSettings, BusinessSettingsUpdate, BusinessHours
from services.supabase_service import get_supabase

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


async def get_settings() -> BusinessSettings:
    """Get business settings"""
    supabase = get_supabase()
    try:
        response = supabase.table("settings").select("*").eq("id", "main").single().execute()
        if response.data:
            # Parse hours from JSON
            data = response.data
            if data.get("hours"):
                data["hours"] = [BusinessHours(**h) for h in data["hours"]]
            return BusinessSettings(**data)
    except Exception:
        pass
    return DEFAULT_SETTINGS


async def update_settings(updates: BusinessSettingsUpdate) -> BusinessSettings:
    """Update business settings"""
    supabase = get_supabase()
    update_dict = {k: v for k, v in updates.model_dump().items() if v is not None}

    # Convert hours to dict for storage
    if "hours" in update_dict:
        update_dict["hours"] = [h.model_dump() for h in update_dict["hours"]]

    response = supabase.table("settings").upsert({
        "id": "main",
        **update_dict
    }).execute()

    return await get_settings()


async def toggle_accepting_orders(accepting: bool) -> BusinessSettings:
    """Toggle whether the truck is accepting orders"""
    supabase = get_supabase()
    supabase.table("settings").upsert({
        "id": "main",
        "is_accepting_orders": accepting
    }).execute()
    return await get_settings()
