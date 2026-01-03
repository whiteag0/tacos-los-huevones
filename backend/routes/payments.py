from fastapi import APIRouter, HTTPException, Request
from models import OrderStatus
from services import order_service, square_service, notification_service

router = APIRouter()


@router.post("/create-link/{order_id}")
async def create_payment_link(order_id: str):
    """Create a Square payment link for an order"""
    order = await order_service.get_order_by_id(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order.status != OrderStatus.PENDING:
        raise HTTPException(status_code=400, detail="Order has already been processed")

    # Convert to cents
    amount_cents = int(order.total * 100)

    # Create items description
    items_desc = ", ".join([f"{item.quantity}x {item.name}" for item in order.items])
    description = f"Tacos Los Huevones: {items_desc}"

    result = await square_service.create_payment_link(
        order_id=order.id,
        amount_cents=amount_cents,
        customer_email=order.customer_email,
        description=description
    )

    if not result.get("success"):
        raise HTTPException(status_code=500, detail=result.get("errors", ["Payment failed"]))

    return {
        "payment_url": result["payment_link_url"],
        "payment_link_id": result["payment_link_id"]
    }


@router.post("/webhook")
async def payment_webhook(request: Request):
    """Handle Square webhook for payment completion"""
    body = await request.json()
    event_type = body.get("type")

    if event_type == "payment.completed":
        payment = body.get("data", {}).get("object", {}).get("payment", {})
        reference_id = payment.get("reference_id")  # Our order ID

        if reference_id:
            # Update order status
            order = await order_service.update_order_status(
                reference_id,
                OrderStatus.PAID,
                payment_id=payment.get("id")
            )

            if order:
                # Send notifications
                await notification_service.notify_new_order(order)
                await notification_service.send_order_confirmation(order)

    return {"status": "ok"}


@router.get("/verify/{order_id}")
async def verify_payment(order_id: str):
    """Verify if payment was completed (called after redirect)"""
    order = await order_service.get_order_by_id(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return {
        "order_id": order.id,
        "status": order.status,
        "paid": order.status != OrderStatus.PENDING,
        "total": order.total
    }
