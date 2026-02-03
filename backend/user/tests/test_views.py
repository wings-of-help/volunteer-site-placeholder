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
