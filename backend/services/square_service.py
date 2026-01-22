from config import get_settings
from typing import Optional, Dict, Any
import uuid

settings = get_settings()

# Initialize Square client (graceful degradation if SDK unavailable)
square_client = None
try:
    from square.client import Client
    square_client = Client(
        access_token=settings.square_access_token,
        environment=settings.square_environment,
    )
except ImportError as e:
    print(f"Warning: Square SDK not available ({e}). Payment features disabled.")


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
    # Check if Square SDK is available
    if square_client is None:
        return {
            "success": False,
            "errors": ["Square SDK not available. Please contact support."]
        }

    # Calculate application fee ($1.50 = 150 cents)
    app_fee_cents = settings.platform_fee_cents

    try:
        result = square_client.checkout.create_payment_link(
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
            }
        )

        if result.is_success():
            payment_link = result.body.get("payment_link", {})
        else:
            return {
                "success": False,
                "errors": [str(e) for e in result.errors]
            }
        return {
            "success": True,
            "payment_link_url": payment_link.get("url") if payment_link else None,
            "payment_link_id": payment_link.get("id") if payment_link else None,
            "order_id": payment_link.get("order_id") if payment_link else None,
        }
    except Exception as e:
        return {
            "success": False,
            "errors": [str(e)]
        }


async def get_payment_status(payment_link_id: str) -> Dict[str, Any]:
    """Check the status of a payment link"""
    if square_client is None:
        return {
            "success": False,
            "errors": ["Square SDK not available"]
        }
    try:
        result = square_client.checkout.retrieve_payment_link(id=payment_link_id)
        if result.is_success():
            payment_link = result.body.get("payment_link", {})
            return {
                "success": True,
                "status": "completed" if payment_link and payment_link.get("order_id") else "pending",
                "payment_link": payment_link
            }
        else:
            return {
                "success": False,
                "errors": [str(e) for e in result.errors]
            }
    except Exception as e:
        return {
            "success": False,
            "errors": [str(e)]
        }


async def retrieve_order(square_order_id: str) -> Dict[str, Any]:
    """Retrieve order details from Square"""
    if square_client is None:
        return {
            "success": False,
            "errors": ["Square SDK not available"]
        }
    try:
        result = square_client.orders.retrieve_order(order_id=square_order_id)
        if result.is_success():
            return {
                "success": True,
                "order": result.body.get("order")
            }
        else:
            return {
                "success": False,
                "errors": [str(e) for e in result.errors]
            }
    except Exception as e:
        return {
            "success": False,
            "errors": [str(e)]
        }
