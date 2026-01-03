from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum


class OrderStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    PREPARING = "preparing"
    READY = "ready"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class OrderItem(BaseModel):
    menu_item_id: str
    name: str
    quantity: int
    price: float  # unit price
    special_instructions: Optional[str] = None


class Order(BaseModel):
    id: str
    customer_name: str
    customer_email: str
    customer_phone: str
    items: List[OrderItem]
    subtotal: float
    tax: float
    total: float
    status: OrderStatus = OrderStatus.PENDING
    payment_id: Optional[str] = None
    estimated_ready_time: Optional[datetime] = None
    special_instructions: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class OrderCreate(BaseModel):
    customer_name: str
    customer_email: str
    customer_phone: str
    items: List[OrderItem]
    special_instructions: Optional[str] = None


class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    estimated_ready_time: Optional[datetime] = None
