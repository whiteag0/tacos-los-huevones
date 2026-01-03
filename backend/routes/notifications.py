from fastapi import APIRouter, HTTPException, Depends, Header
from services import notification_service, order_service
from config import get_settings

router = APIRouter()
config = get_settings()


async def verify_admin(x_admin_key: str = Header(...)):
    """Verify admin API key"""
    if x_admin_key != config.admin_api_key:
        raise HTTPException(status_code=401, detail="Invalid admin key")
    return True


@router.post("/order-ready/{order_id}", dependencies=[Depends(verify_admin)])
async def send_order_ready_notification(order_id: str):
    """Manually send order ready notification"""
    order = await order_service.get_order_by_id(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    await notification_service.send_order_ready(order)
    return {"status": "sent"}


@router.post("/test-sms", dependencies=[Depends(verify_admin)])
async def test_sms(phone: str, message: str = "Test message from Tacos Los Huevones!"):
    """Send a test SMS"""
    success = await notification_service.send_sms(phone, message)
    return {"success": success}


@router.post("/test-email", dependencies=[Depends(verify_admin)])
async def test_email(email: str, subject: str = "Test Email", message: str = "Test from Tacos Los Huevones!"):
    """Send a test email"""
    success = await notification_service.send_email(email, subject, f"<p>{message}</p>")
    return {"success": success}
