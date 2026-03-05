import os
import secrets

import requests


def generate_reset_code():
    return f"{secrets.randbelow(10**6):06d}"


def send_email(to_email, subject, html_content):
    response = requests.post(
        "https://api.resend.com/emails",
        headers={
            "Authorization": f"Bearer {os.getenv('RESEND_API_KEY')}",
            "Content-Type": "application/json",
        },
        json={
            "from": os.getenv("DEFAULT_FROM_EMAIL"),
            "to": to_email,
            "subject": subject,
            "html": html_content,
        },
    )

    if not response.ok:
        raise Exception(f"Email send failed{response.text}")

    return response.json()
