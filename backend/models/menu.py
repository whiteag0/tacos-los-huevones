from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum


class MenuCategory(str, Enum):
    PLATOS_FUERTES = "platos_fuertes"
    TACOS = "tacos"
    BURRITOS = "burritos"
    QUESADILLAS = "quesadillas"
    BREAKFAST = "breakfast"
    SIDES = "sides"
    DRINKS = "drinks"
    SPECIALS = "specials"
    KIDS = "kids"


class MenuVariantOption(BaseModel):
    """Individual variant option (e.g., a specific meat type)"""
    id: str  # e.g., "pastor", "asada"
    name: str  # Spanish name, e.g., "Pastor"
    name_en: str  # English name, e.g., "Al Pastor"
    price_modifier: float = 0  # Additional cost for this option


class MenuVariants(BaseModel):
    """Variants configuration for a menu item"""
    label: str  # e.g., "Choose your meat"
    required: bool = True
    options: List[MenuVariantOption]


class MenuItem(BaseModel):
    id: str
    name: str
    description: str
    price: float  # in dollars (base price)
    category: MenuCategory
    image_url: Optional[str] = None
    is_available: bool = True
    is_popular: bool = False
    spicy_level: int = 0  # 0-3
    is_vegetarian: bool = False
    variants: Optional[MenuVariants] = None  # Optional variants for items like tacos/quesadillas
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class MenuItemCreate(BaseModel):
    name: str
    description: str
    price: float
    category: MenuCategory
    image_url: Optional[str] = None
    is_available: bool = True
    is_popular: bool = False
    spicy_level: int = 0
    is_vegetarian: bool = False
    variants: Optional[MenuVariants] = None


class MenuItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[MenuCategory] = None
    image_url: Optional[str] = None
    is_available: Optional[bool] = None
    is_popular: Optional[bool] = None
    spicy_level: Optional[int] = None
    is_vegetarian: Optional[bool] = None
    variants: Optional[MenuVariants] = None
