from fastapi import APIRouter
from models import BusinessSettings
from services import settings_service

router = APIRouter()


@router.get("/", response_model=BusinessSettings)
async def get_public_settings():
    """Get public business settings (hours, accepting orders, etc.)"""
    return await settings_service.get_settings()
