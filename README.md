# 🚗 Easy Rental — Backend API

> REST API for the Easy Rental vehicle rental platform.
> Built with **Django 6.1** · **Django REST Framework** · **JWT Auth** · **eSewa ePay**

---

## 📋 Table of Contents

1. [Tech Stack](#-tech-stack)
2. [Prerequisites](#-prerequisites)
3. [Getting Started](#-getting-started)
4. [Project Structure](#-project-structure)
5. [API Reference](#-api-reference)
6. [Authentication Guide](#-authentication-guide)
7. [eSewa Payment Flow](#-esewa-payment-flow)
8. [Test Credentials](#-test-credentials)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Django 6.1 |
| API | Django REST Framework 3.18 |
| Auth | JWT via `djangorestframework-simplejwt` |
| API Docs | `drf-spectacular` (Swagger / ReDoc) |
| Payment | eSewa ePay (UAT sandbox) |
| Database | SQLite (dev) |
| Media | Pillow (image uploads) |

---

## ✅ Prerequisites

- **Python 3.11+** — https://www.python.org/downloads/
- **Git** — https://git-scm.com/

---

## 🚀 Getting Started

### 1. Clone the backend branch

> ⚠️ This project has separate `frontend` and `backend` branches. Always clone the `backend` branch.

```bash
git clone -b backend https://github.com/ManishPanta91/Easy_rental1.git
cd Easy_rental1
```

### 2. Create & activate virtual environment

**Windows (PowerShell):**
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
python -m venv .venv
.venv\Scripts\activate.bat
```

**macOS / Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

> You will see `(.venv)` at the start of your terminal prompt when activated.

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Key values in `.env`:

```env
SECRET_KEY=your-secret-django-key-here
DEBUG=True

# eSewa UAT (already configured in settings.py for testing)
ESEWA_PRODUCT_CODE=EPAYTEST
ESEWA_SECRET_KEY=8gBm/:&EnhH.1/q
ESEWA_PAYMENT_URL=https://rc-epay.esewa.com.np/api/epay/main/v2/form
ESEWA_STATUS_URL=https://rc.esewa.com.np/api/epay/transaction/status/
ESEWA_SUCCESS_URL=http://localhost:8000/payment/payments/esewa/success/
ESEWA_FAILURE_URL=http://localhost:8000/payment/payments/esewa/failure/
```

### 5. Run database migrations

```bash
python manage.py migrate
```

### 6. Create a superuser (admin)

```bash
python manage.py createsuperuser
```

You will be prompted:
```
Email: admin@example.com
Password: ********
Password (again): ********
```

> The admin account is required to add vehicles, confirm/complete bookings, and access `/admin/`.

### 7. Run the development server

```bash
python manage.py runserver
```

Server starts at: **http://localhost:8000**

---

## 📁 Project Structure

```
Easy_rental1/          <- repo root (backend branch)
├── core/              <- Django project settings & root URL config
│   ├── settings.py
│   └── urls.py
├── common/            <- Shared BaseModel (UUID pk, created_at, updated_at)
│   └── models.py
├── user/              <- User registration, login, JWT auth
├── vehicles/          <- Vehicle & VehicleImage CRUD
├── booking/           <- Booking lifecycle management
├── payment/           <- eSewa ePay payment integration
├── media/             <- Uploaded vehicle images (auto-created)
├── manage.py
└── requirements.txt
```

---

## 📡 API Reference

### Interactive Docs (Swagger)

| URL | Description |
|---|---|
| `http://localhost:8000/` | **Swagger UI** — interactive API explorer (test endpoints here) |
| `http://localhost:8000/api/redoc/` | **ReDoc** — clean documentation view |
| `http://localhost:8000/api/schema/` | Raw OpenAPI schema (JSON/YAML download) |
| `http://localhost:8000/admin/` | Django Admin panel |

---

### 🔐 Authentication URLs

Base prefix: `/user/`

| Method | URL | Auth Required | Description |
|---|---|---|---|
| `POST` | `/user/register/` | No | Register a new user account |
| `POST` | `/user/login/` | No | Login and receive JWT tokens |
| `POST` | `/user/refresh/` | No | Get a new access token using refresh token |
| `GET` | `/user/me/` | Yes (JWT) | Get the currently logged-in user profile |

**`POST /user/register/`**
```json
// Request body
{
  "email": "john@example.com",
  "password": "SecurePass123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "9800000000"
}

// Response 201
{
  "message": "User registered successfully.",
  "user": {
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

**`POST /user/login/`**
```json
// Request body
{
  "email": "john@example.com",
  "password": "SecurePass123"
}

// Response 200
{
  "message": "Login successful.",
  "access": "<access_token>",
  "refresh": "<refresh_token>",
  "user": { ... }
}
```

**`POST /user/refresh/`**
```json
// Request body
{ "refresh": "<your_refresh_token>" }

// Response 200
{ "access": "<new_access_token>" }
```

**`GET /user/me/`**
```
Header: Authorization: Bearer <access_token>
// Response 200 — returns logged-in user data
```

---

### 🚗 Vehicle URLs

Base prefix: `/vehicle/`

| Method | URL | Auth Required | Description |
|---|---|---|---|
| `GET` | `/vehicle/vehicles/` | No (Public) | List all vehicles |
| `GET` | `/vehicle/vehicles/{id}/` | No (Public) | Get a single vehicle's full details |
| `POST` | `/vehicle/vehicles/` | Admin only | Add a new vehicle |
| `PUT` | `/vehicle/vehicles/{id}/` | Admin only | Update all vehicle fields |
| `PATCH` | `/vehicle/vehicles/{id}/` | Admin only | Partially update a vehicle |
| `DELETE` | `/vehicle/vehicles/{id}/` | Admin only | Delete a vehicle |
| `GET` | `/vehicle/vehicle-images/` | Admin only | List all vehicle images |
| `POST` | `/vehicle/vehicle-images/` | Admin only | Upload a new vehicle image |
| `GET` | `/vehicle/vehicle-images/{id}/` | Admin only | Get a specific image |
| `DELETE` | `/vehicle/vehicle-images/{id}/` | Admin only | Delete a vehicle image |

**`POST /vehicle/vehicles/`** — Add Vehicle (Admin only)
```json
{
  "name": "Honda CB Shine",
  "brand": "Honda",
  "model": "CB Shine",
  "year": 2022,
  "color": "Black",
  "registration_number": "BA 1 PA 2345",
  "vehicle_type": "motorcycle",
  "transmission": "manual",
  "fuel_type": "petrol",
  "engine_cc": 125,
  "mileage_kmpl": "55.00",
  "horsepower": 10,
  "seats": 2,
  "price_per_day": "800.00",
  "security_deposit": "2000.00",
  "min_rental_days": 1,
  "has_ac": false,
  "has_bluetooth": false,
  "pickup_location": "Kathmandu, Baneshwor",
  "status": "active"
}
```

**Available choices:**

- `vehicle_type`: `cycle` `scooter` `motorcycle` `auto_rickshaw` `car` `jeep` `bus` `truck`
- `transmission`: `manual` `automatic`
- `fuel_type`: `petrol` `diesel` `electric` `hybrid`
- `status`: `active` `inactive` `maintenance`

**`POST /vehicle/vehicle-images/`** — Upload Image (multipart/form-data)
```
vehicle    = <vehicle-uuid>
image      = <image file>
is_primary = true
alt_text   = "Front view of Honda CB Shine"
```

---

### 📅 Booking URLs

Base prefix: `/booking/`

| Method | URL | Auth Required | Description |
|---|---|---|---|
| `GET` | `/booking/bookings/` | Yes (JWT) | List bookings — users see own, admin sees all |
| `POST` | `/booking/bookings/` | Yes (JWT) | Create a new booking |
| `GET` | `/booking/bookings/{id}/` | Yes (JWT) | Get a specific booking |
| `POST` | `/booking/bookings/{id}/cancel/` | Yes (JWT) | Cancel your own pending booking |
| `POST` | `/booking/bookings/{id}/confirm/` | Admin only | Confirm a booking after payment verified |
| `POST` | `/booking/bookings/{id}/complete/` | Admin only | Mark booking as completed (vehicle returned) |
| `PUT` | `/booking/bookings/{id}/` | Admin only | Update booking details |
| `DELETE` | `/booking/bookings/{id}/` | Admin only | Delete a booking |

**`POST /booking/bookings/`** — Create Booking
```json
// Header: Authorization: Bearer <access_token>
{
  "vehicle": "uuid-of-vehicle",
  "start_date": "2026-10-01",
  "end_date": "2026-10-05"
}

// Response 201
{
  "id": "uuid",
  "vehicle": "uuid-of-vehicle",
  "start_date": "2026-10-01",
  "end_date": "2026-10-05",
  "price_per_day": "800.00",
  "total_days": 4,
  "total_price": "3200.00",
  "status": "pending",
  "created_at": "2026-09-26T..."
}
```

**Booking status lifecycle:**
```
pending  ---[user pays]---> confirmed ---[admin]---> completed
   |
   +---[user cancels]---> cancelled
```

---

### 💳 Payment & eSewa URLs

Base prefix: `/payment/`

| Method | URL | Auth Required | Description |
|---|---|---|---|
| `GET` | `/payment/payments/` | Yes (JWT) | List payments — users see own, admin sees all |
| `POST` | `/payment/payments/` | Yes (JWT) | Initiate eSewa payment for a booking |
| `GET` | `/payment/payments/{id}/` | Yes (JWT) | Get payment details |
| `GET` | `/payment/payments/esewa/success/` | No (Public) | eSewa success callback — called automatically by eSewa |
| `GET` | `/payment/payments/esewa/failure/` | No (Public) | eSewa failure callback — called automatically by eSewa |

**`POST /payment/payments/`** — Initiate Payment
```json
// Header: Authorization: Bearer <access_token>
{ "booking": "uuid-of-booking" }

// Response 201 — use ALL these fields to build the eSewa payment form
{
  "payment_id": "uuid",
  "amount": "3200.00",
  "total_amount": "3200.00",
  "transaction_uuid": "a1b2c3d4-e5f6-...",
  "product_code": "EPAYTEST",
  "tax_amount": "0",
  "product_service_charge": "0",
  "product_delivery_charge": "0",
  "success_url": "http://localhost:8000/payment/payments/esewa/success/",
  "failure_url": "http://localhost:8000/payment/payments/esewa/failure/",
  "signed_field_names": "total_amount,transaction_uuid,product_code",
  "signature": "base64-hmac-sha256-signature==",
  "payment_url": "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
}
```

**`GET /payment/payments/esewa/success/?data=<base64>`**
- Automatically called by eSewa after payment
- Decodes the Base64 eSewa response
- Verifies payment via eSewa Status Check API (prevents fraud)
- Updates: `Payment.status = "completed"`, `Booking.status = "confirmed"`

**`GET /payment/payments/esewa/failure/?data=<base64>`**
- Automatically called by eSewa on failure or cancellation
- Updates: `Payment.status = "failed"`

**Payment status values:** `pending` `completed` `failed` `full_refund` `partial_refund` `ambiguous` `not_found` `canceled`

---

## 🔑 Authentication Guide

This API uses **JWT (JSON Web Token)** authentication with the following token lifetimes:

| Token | Lifetime |
|---|---|
| Access token | 7 days |
| Refresh token | 15 days |

**How to use:**

1. Login → `POST /user/login/` — get `access` and `refresh` tokens
2. Add header to every protected request:
   ```
   Authorization: Bearer <access_token>
   ```
3. When access token expires, get a new one:
   ```
   POST /user/refresh/  →  { "refresh": "<token>" }
   ```

**Permission Levels:**

| Role | Permissions |
|---|---|
| Public (no token) | Browse and view vehicle listings |
| Authenticated user | Create bookings, pay, cancel own bookings, view own payments |
| Admin / Staff | Full CRUD on vehicles, manage all bookings and payments |

---

## 💳 eSewa Payment Flow

```
Step 1: User creates a booking
        POST /booking/bookings/   →   gets booking UUID

Step 2: User initiates payment
        POST /payment/payments/   →   gets all eSewa form fields

Step 3: Frontend builds HTML form and submits to eSewa payment URL

Step 4: User logs in to eSewa sandbox and confirms payment

Step 5: eSewa redirects to success_url with ?data=<base64-response>

Step 6: Backend decodes response, calls eSewa Status Check API to verify

Step 7: Payment → "completed", Booking → "confirmed"
```

**Frontend eSewa form template:**
```html
<form action="{{ payment_url }}" method="POST">
  <input type="hidden" name="amount"                  value="{{ amount }}">
  <input type="hidden" name="tax_amount"              value="{{ tax_amount }}">
  <input type="hidden" name="total_amount"            value="{{ total_amount }}">
  <input type="hidden" name="transaction_uuid"        value="{{ transaction_uuid }}">
  <input type="hidden" name="product_code"            value="{{ product_code }}">
  <input type="hidden" name="product_service_charge"  value="{{ product_service_charge }}">
  <input type="hidden" name="product_delivery_charge" value="{{ product_delivery_charge }}">
  <input type="hidden" name="success_url"             value="{{ success_url }}">
  <input type="hidden" name="failure_url"             value="{{ failure_url }}">
  <input type="hidden" name="signed_field_names"      value="{{ signed_field_names }}">
  <input type="hidden" name="signature"               value="{{ signature }}">
  <button type="submit">Pay with eSewa</button>
</form>
```

---

## 🧪 Test Credentials

### eSewa UAT Sandbox

| Field | Value |
|---|---|
| eSewa ID | `9806800001` or `9806800002` |
| Password | `Nepal@123` |
| OTP | `123456` |
| Product Code | `EPAYTEST` |
| Secret Key | `8gBm/:&EnhH.1/q` |

### Django Admin

Use the email/password you set during `python manage.py createsuperuser`.
Login at: `http://localhost:8000/admin/`

---

## 📌 All Endpoints — Quick Reference

```
GET    /                                           Swagger UI (API docs)
GET    /api/redoc/                                 ReDoc documentation
GET    /api/schema/                                OpenAPI schema download
GET    /admin/                                     Django Admin

POST   /user/register/                             Register new user
POST   /user/login/                                Login (get JWT tokens)
POST   /user/refresh/                              Refresh access token
GET    /user/me/                                   My profile [JWT]

GET    /vehicle/vehicles/                          List all vehicles [Public]
POST   /vehicle/vehicles/                          Add vehicle [Admin]
GET    /vehicle/vehicles/{id}/                     Vehicle detail [Public]
PUT    /vehicle/vehicles/{id}/                     Update vehicle [Admin]
PATCH  /vehicle/vehicles/{id}/                     Partial update [Admin]
DELETE /vehicle/vehicles/{id}/                     Delete vehicle [Admin]
GET    /vehicle/vehicle-images/                    List images [Admin]
POST   /vehicle/vehicle-images/                    Upload image [Admin]
GET    /vehicle/vehicle-images/{id}/               Image detail [Admin]
DELETE /vehicle/vehicle-images/{id}/               Delete image [Admin]

GET    /booking/bookings/                          My bookings [JWT]
POST   /booking/bookings/                          Create booking [JWT]
GET    /booking/bookings/{id}/                     Booking detail [JWT]
POST   /booking/bookings/{id}/cancel/              Cancel booking [JWT]
POST   /booking/bookings/{id}/confirm/             Confirm booking [Admin]
POST   /booking/bookings/{id}/complete/            Complete booking [Admin]
PUT    /booking/bookings/{id}/                     Update booking [Admin]
DELETE /booking/bookings/{id}/                     Delete booking [Admin]

GET    /payment/payments/                          My payments [JWT]
POST   /payment/payments/                          Initiate payment [JWT]
GET    /payment/payments/{id}/                     Payment detail [JWT]
GET    /payment/payments/esewa/success/            eSewa success callback [Public]
GET    /payment/payments/esewa/failure/            eSewa failure callback [Public]
```

---

## 🔧 Common Issues & Fixes

| Problem | Fix |
|---|---|
| `ModuleNotFoundError` | Activate virtual environment first |
| `no such table` error | Run `python manage.py migrate` |
| Image uploads failing | Run `pip install pillow` |
| Admin login failing | Run `python manage.py createsuperuser` |
| `Activate.ps1 cannot be loaded` | Run `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` in PowerShell |

---

*Copyright 2026 ManishPanta91 — Easy Rental Project*
