from urllib import response

from django.contrib.auth import get_user_model
from django.conf import settings


User = get_user_model()


def test_users_list_requires_auth(api_client):
    response = api_client.get("/api/v1/user/")
    assert response.status_code == 401

# Email availability check tests
def test_email_is_available(api_client, db):
    response = api_client.post(
        "/api/v1/user/check-email-availability/",
        data={"email": "available_email@gmail.com"},
        format="json",
    )
    assert response.status_code == 200
    assert response.data["detail"] == "Email is available"


def test_email_is_available_empty(api_client, db):
    response = api_client.post(
        "/api/v1/user/check-email-availability/",
        data={"email": ""},
        format="json",
    )
    assert response.status_code == 400
    assert response.data["email"] == ["This field may not be blank."]


def test_email_is_available_not_valid(api_client, db):
    response = api_client.post(
        "/api/v1/user/check-email-availability/",
        data={"email": "invalid_email"},
        format="json",
    )
    assert response.status_code == 400
    assert response.data["email"] == ["Enter a valid email address."]


def test_email_is_not_available(api_client, user):
    response = api_client.post(
        "/api/v1/user/check-email-availability/",
        data={"email": user.email},
        format="json",
    )
    assert response.status_code == 400
    assert response.data["email"] == ["This email is already in use."]

# Phone number availability check tests
def test_phone_number_is_available(api_client, db):
    response = api_client.post(
        "/api/v1/user/check-phone-number-availability/",
        data={"phone_number": "1212121221"},
        format="json",
    )
    assert response.status_code == 200
    assert response.data["detail"] == "Phone number is available"


def test_phone_number_is_not_available(api_client, user):
    response = api_client.post(
        "/api/v1/user/check-phone-number-availability/",
        data={"phone_number": user.phone_number},
        format="json",
    )
    assert response.status_code == 400
    assert response.data["phone_number"] == ["This phone number is already in use."]

# Registration endpoint checks
def test_register_user_success(api_client, db):
    payload = {
        "email": "new_user@test.com",
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "password": "StrongPass123!",
        "phone_number": "987654321",
        "role": "volunteer",
    }
    response = api_client.post(
        "/api/v1/user/register/",
        data=payload,
        format="json",
    )

    assert response.status_code == 201
    assert response.data["message"] == "User registered successfully"
    assert response.data["email"] == payload["email"]
    assert response.data["role"] == payload["role"]

    assert User.objects.filter(email=payload["email"]).exists()


def test_register_user_email_and_phone_number_are_taken(api_client, user):
    payload = {
        "email": user.email,
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "password": "StrongPass123!",
        "phone_number": user.phone_number,
        "role": "volunteer",
    }
    response = api_client.post(
        "/api/v1/user/register/",
        data=payload,
        format="json",
    )

    assert response.status_code == 400
    assert response.data["email"] == ["user with this email already exists."]
    assert response.data["phone_number"] == ["user with this phone number already exists."]


def test_register_user_password_is_too_short(api_client, db):
    payload = {
        "email": "new_user@test.com",
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "password": "wrong",
        "phone_number": "987654321",
        "role": "volunteer",
    }

    response = api_client.post(
        "/api/v1/user/register/",
        data=payload,
        format="json",
    )

    assert response.status_code == 400
    assert response.data["password"] == ["Password must be between 8 and 20 characters long."]


def test_register_user_password_is_too_long(api_client, db):
    payload = {
        "email": "new_user@test.com",
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "password": "wrong!!!!!!!!!!!!!!!!!!!!!!!!!",
        "phone_number": "987654321",
        "role": "volunteer",
    }

    response = api_client.post(
        "/api/v1/user/register/",
        data=payload,
        format="json",
    )

    assert response.status_code == 400
    assert response.data["password"] == ["Password must be between 8 and 20 characters long."]


def test_register_user_password_must_include_uppercase_letter(api_client, db):
    payload = {
        "email": "new_user@test.com",
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "password": "wrong123!!",
        "phone_number": "987654321",
        "role": "volunteer",
    }

    response = api_client.post(
        "/api/v1/user/register/",
        data=payload,
        format="json",
    )

    assert response.status_code == 400
    assert response.data["password"] == ["Password must contain at least one uppercase Latin letter."]


def test_register_user_password_must_include_digit(api_client, db):
    payload = {
        "email": "new_user@test.com",
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "password": "Wrongggggg!!",
        "phone_number": "987654321",
        "role": "volunteer",
    }

    response = api_client.post(
        "/api/v1/user/register/",
        data=payload,
        format="json",
    )

    assert response.status_code == 400
    assert response.data["password"] == ["Password must contain at least one digit."]


def test_register_user_password_must_include_special_character(api_client, db):
    payload = {
        "email": "new_user@test.com",
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "password": "Wrong123",
        "phone_number": "987654321",
        "role": "volunteer",
    }

    response = api_client.post(
        "/api/v1/user/register/",
        data=payload,
        format="json",
    )

    assert response.status_code == 400
    assert response.data["password"] == ["Password must contain at least one special character."]


# Admin register endpoint tests
def test_register_admin_success(api_client, db):
    payload = {
        "email": "new_admin@test.com",
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "password": "Correct1[",
        "phone_number": "987654321",
        "secret_code": settings.ADMIN_SECRET_CODE,
    }

    response = api_client.post(
        "/api/v1/user/register/admin/",
        data=payload,
        format="json",
    )

    assert response.status_code == 201
    assert response.data["message"] == "Admin user created successfully"


def test_register_admin_not_provided_secret_code(api_client, db):
    payload = {
        "email": "new_admin@test.com",
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "password": "Correct1[",
        "phone_number": "987654321",
    }

    response = api_client.post(
        "/api/v1/user/register/admin/",
        data=payload,
        format="json",
    )

    assert response.status_code == 400
    assert response.data["secret_code"] == ["This field is required."]


def test_register_admin_wrong_secret_code(api_client, db):
    payload = {
        "email": "new_admin@test.com",
        "first_name": "test_first_name",
        "last_name": "test_last_name",
        "password": "Correct1[",
        "phone_number": "987654321",
        "secret_code": "wrong",
    }

    response = api_client.post(
        "/api/v1/user/register/admin/",
        data=payload,
        format="json",
    )

    assert response.status_code == 400
    assert response.data["secret_code"] == ["Invalid secret code."]
