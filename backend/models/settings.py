from pydantic import BaseModel
from typing import Optional, List
from datetime import time


class BusinessHours(BaseModel):
    day: str  # monday, tuesday, etc.
    open_time: str  # "08:00"
    close_time: str  # "19:00"
    is_closed: bool = False


class BusinessSettings(BaseModel):
    id: str
    business_name: str = "Tacos Los Huevones"
    tagline: str = "Authentic Mexican Street Food"
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    hours: List[BusinessHours] = []
    is_accepting_orders: bool = True
    estimated_wait_minutes: int = 15
    tax_rate: float = 0.08  # 8%
    minimum_order: float = 0.0
    hero_image_url: Optional[str] = None
    logo_url: Optional[str] = None


class BusinessSettingsUpdate(BaseModel):
    business_name: Optional[str] = None
    tagline: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    hours: Optional[List[BusinessHours]] = None
    is_accepting_orders: Optional[bool] = None
    estimated_wait_minutes: Optional[int] = None
    tax_rate: Optional[float] = None
    minimum_order: Optional[float] = None
    hero_image_url: Optional[str] = None
    logo_url: Optional[str] = None
