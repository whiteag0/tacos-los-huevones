from square.client import Client
from config import get_settings
from typing import Optional, Dict, Any
import uuid

settings = get_settings()

# Initialize Square client
square_client = Client(
    access_token=settings.square_access_token,
    environment=settings.square_environment
)


async def create_payment_link(
    order_id: str,
    amount_cents: int,
    customer_email: str,
    description: str = "Food Order"
) -> Dict[str, Any]:
    """
    Create a Square payment link with application fee

    Args:
        order_id: Our internal order ID
        amount_cents: Total amount in cents
        customer_email: Customer's email
        description: Order description

    Returns:
        Dict with payment_link_url and payment_link_id
    """
    checkout_api = square_client.checkout

    # Calculate application fee ($1 = 100 cents)
    app_fee_cents = settings.platform_fee_cents

    result = checkout_api.create_payment_link(
        body={
            "idempotency_key": str(uuid.uuid4()),
            "order": {
                "location_id": settings.square_location_id,
                "line_items": [
                    {
                        "name": description,
                        "quantity": "1",
                        "base_price_money": {
                            "amount": amount_cents,
                            "currency": "USD"
                        }
                    }
                ],
                "reference_id": order_id,
            },
            "checkout_options": {
                "redirect_url": f"{settings.frontend_url}/order/{order_id}/confirmation",
                "ask_for_shipping_address": False,
                "accepted_payment_methods": {
                    "apple_pay": True,
                    "google_pay": True,
                    "cash_app_pay": True,
                }
            },
            "pre_populated_data": {
                "buyer_email": customer_email
            },
            "payment_note": f"Order #{order_id[:8]}",
            # Application fee - this is your $1
            "app_fee_money": {
                "amount": app_fee_cents,
                "currency": "USD"
            }
        }
    )

    if result.is_success():
        payment_link = result.body.get("payment_link", {})
        return {
            "success": True,
            "payment_link_url": payment_link.get("url"),
            "payment_link_id": payment_link.get("id"),
            "order_id": payment_link.get("order_id"),
        }
    else:
        return {
            "success": False,
            "errors": [error.get("detail") for error in result.errors]
        }


async def get_payment_status(payment_link_id: str) -> Dict[str, Any]:
    """Check the status of a payment link"""
    checkout_api = square_client.checkout

    result = checkout_api.retrieve_payment_link(id=payment_link_id)

    if result.is_success():
        payment_link = result.body.get("payment_link", {})
        return {
            "success": True,
            "status": "completed" if payment_link.get("order_id") else "pending",
            "payment_link": payment_link
        }
    else:
        return {
            "success": False,
            "errors": [error.get("detail") for error in result.errors]
        }


async def retrieve_order(square_order_id: str) -> Dict[str, Any]:
    """Retrieve order details from Square"""
    orders_api = square_client.orders

    result = orders_api.retrieve_order(order_id=square_order_id)

    if result.is_success():
        return {
            "success": True,
            "order": result.body.get("order")
        }
    else:
        return {
            "success": False,
            "errors": [error.get("detail") for error in result.errors]
        }
