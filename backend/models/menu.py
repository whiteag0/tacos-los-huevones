from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum


class MenuCategory(str, Enum):
    TACOS = "tacos"
    BURRITOS = "burritos"
    QUESADILLAS = "quesadillas"
    BREAKFAST = "breakfast"
    SIDES = "sides"
    DRINKS = "drinks"


class MenuItem(BaseModel):
    id: str
    name: str
    description: str
    price: float  # in dollars
    category: MenuCategory
    image_url: Optional[str] = None
    is_available: bool = True
    is_popular: bool = False
    spicy_level: int = 0  # 0-3
    is_vegetarian: bool = False
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
