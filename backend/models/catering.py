from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum


class EventType(str, Enum):
    WEDDING = "wedding"
    CORPORATE = "corporate"
    BIRTHDAY = "birthday"
    GRADUATION = "graduation"
    PRIVATE = "private"
    OTHER = "other"


class GuestCount(str, Enum):
    SMALL = "20-50"
    MEDIUM = "50-100"
    LARGE = "100-200"
    XLARGE = "200-500"
    MASSIVE = "500+"


class BudgetRange(str, Enum):
    UNDER_500 = "under-500"
    RANGE_500_1000 = "500-1000"
    RANGE_1000_2500 = "1000-2500"
    RANGE_2500_5000 = "2500-5000"
    OVER_5000 = "5000+"


class CateringInquiry(BaseModel):
    name: str
    email: str
    phone: str
    eventType: str
    eventDate: str
    guestCount: str
    budget: Optional[str] = None
    message: Optional[str] = None


class CateringInquiryResponse(BaseModel):
    success: bool
    message: str
    inquiry_id: Optional[str] = None
