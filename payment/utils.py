import base64
import hashlib
import hmac

from django.conf import settings


def generate_esewa_signature(
    total_amount,
    transaction_uuid,
    product_code=settings.ESEWA_PRODUCT_CODE
):
    message = (
        f"total_amount={total_amount},"
        f"transaction_uuid={transaction_uuid},"
        f"product_code={product_code}"
    )

    signature = hmac.new(
        settings.ESEWA_SECRET_KEY.encode("utf-8"),
        message.encode("utf-8"),
        hashlib.sha256,
    )

    return base64.b64encode(
        signature.digest()
    ).decode("utf-8")