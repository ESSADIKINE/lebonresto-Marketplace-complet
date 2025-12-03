# LeBonResto Backend API Endpoints

This document lists all customer-facing API endpoints for the LeBonResto marketplace frontend.

## Base URL

```
http://localhost:3000
```

Production: Update based on deployment

---

## Authentication Endpoints

### POST /auth/register/customer

Register a new customer account.

**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+212612345678"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "customer@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "customer"
  }
}
```

---

### POST /auth/login

Login to customer account.

**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "password123",
  "role": "customer"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "customer@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "customer"
  }
}
```

---

### POST /auth/refresh

Refresh access token using refresh token.

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST /auth/forgot-password

Request password reset (placeholder for future implementation).

**Request Body:**
```json
{
  "email": "customer@example.com"
}
```

---

## Customer Endpoints

### GET /customers/me

Get current logged-in customer profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "id": "uuid",
  "email": "customer@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+212612345678",
  "created_at": "2025-12-03T10:00:00Z"
}
```

---

## Lookup Endpoints

### GET /cities

Get all available cities.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Agadir",
    "created_at": "2025-12-03T10:00:00Z"
  },
  {
    "id": "uuid",
    "name": "Casablanca",
    "created_at": "2025-12-03T10:00:00Z"
  }
]
```

---

### GET /categories

Get all restaurant categories.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Moroccan",
    "description": "Traditional Moroccan cuisine",
    "created_at": "2025-12-03T10:00:00Z"
  },
  {
    "id": "uuid",
    "name": "Italian",
    "description": "Authentic Italian cuisine",
    "created_at": "2025-12-03T10:00:00Z"
  }
]
```

---

### GET /tags

Get all restaurant tags.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Terrasse",
    "created_at": "2025-12-03T10:00:00Z"
  },
  {
    "id": "uuid",
    "name": "Halal",
    "created_at": "2025-12-03T10:00:00Z"
  },
  {
    "id": "uuid",
    "name": "WiFi",
    "created_at": "2025-12-03T10:00:00Z"
  }
]
```

---

## Restaurant Endpoints

### GET /restaurants

Get all restaurants with optional filters.

**Query Parameters:**
- `cityId` (optional): Filter by city UUID
- `categoryId` (optional): Filter by category UUID
- `tagId` (optional): Filter by tag UUID
- `q` (optional): Search query string
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Dar Tajine Agadir",
      "description": "Authentic Moroccan cuisine with traditional tajines",
      "address": "123 Rue Mohammed V, Agadir",
      "phone": "+212 5 28 84 12 34",
      "email": "contact@dartajine.ma",
      "city_id": "uuid",
      "category_id": "uuid",
      "owner_id": "uuid",
      "status": "APPROVED",
      "created_at": "2025-12-03T10:00:00Z",
      "city": {
        "id": "uuid",
        "name": "Agadir"
      },
      "category": {
        "id": "uuid",
        "name": "Moroccan"
      }
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

---

### GET /restaurants/:id

Get single restaurant details by ID.

**Response:**
```json
{
  "id": "uuid",
  "name": "Dar Tajine Agadir",
  "description": "Authentic Moroccan cuisine with traditional tajines",
  "address": "123 Rue Mohammed V, Agadir",
  "phone": "+212 5 28 84 12 34",
  "email": "contact@dartajine.ma",
  "city_id": "uuid",
  "category_id": "uuid",
  "owner_id": "uuid",
  "status": "APPROVED",
  "created_at": "2025-12-03T10:00:00Z",
  "city": {
    "id": "uuid",
    "name": "Agadir"
  },
  "category": {
    "id": "uuid",
    "name": "Moroccan"
  }
}
```

---

### GET /restaurants/:id/images

Get all images for a restaurant.

**Response:**
```json
[
  {
    "id": "uuid",
    "url": "https://res.cloudinary.com/...",
    "restaurant_id": "uuid",
    "is_primary": true,
    "created_at": "2025-12-03T10:00:00Z"
  }
]
```

---

### GET /restaurants/:id/menus

Get all menus for a restaurant.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Lunch Menu",
    "description": "Special lunch offers",
    "restaurant_id": "uuid",
    "pdf_url": "https://res.cloudinary.com/.../menu.pdf",
    "created_at": "2025-12-03T10:00:00Z"
  }
]
```

---

### GET /restaurants/:id/plats

Get all dishes (plats) for a restaurant.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Chicken Tajine",
    "description": "Traditional Moroccan chicken tajine with preserved lemons and olives",
    "price": 85.00,
    "restaurant_id": "uuid",
    "menu_id": "uuid",
    "created_at": "2025-12-03T10:00:00Z"
  }
]
```

---

### GET /restaurants/:id/events

Get all events for a restaurant.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Traditional Music Night",
    "description": "Live traditional Moroccan music performance",
    "restaurant_id": "uuid",
    "event_date": "2025-12-15T20:00:00Z",
    "event_type": "MUSIC",
    "created_at": "2025-12-03T10:00:00Z"
  }
]
```

---

### GET /restaurants/:id/feedback

Get all feedback/reviews for a restaurant.

**Response:**
```json
[
  {
    "id": "uuid",
    "customer_id": "uuid",
    "restaurant_id": "uuid",
    "rating": 5,
    "comment": "Amazing food and great service!",
    "created_at": "2025-12-03T10:00:00Z",
    "customer": {
      "id": "uuid",
      "first_name": "John",
      "last_name": "Doe"
    }
  }
]
```

---

## Reservation Endpoints

### GET /customers/:customerId/reservations

Get all reservations for a customer.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
[
  {
    "id": "uuid",
    "customer_id": "uuid",
    "restaurant_id": "uuid",
    "reservation_date": "2025-12-10T19:00:00Z",
    "party_size": 4,
    "status": "CONFIRMED",
    "special_requests": "Window table please",
    "created_at": "2025-12-03T10:00:00Z",
    "restaurant": {
      "id": "uuid",
      "name": "Dar Tajine Agadir"
    }
  }
]
```

---

### POST /reservations

Create a new reservation.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "customer_id": "uuid",
  "restaurant_id": "uuid",
  "reservation_date": "2025-12-10T19:00:00Z",
  "party_size": 4,
  "special_requests": "Window table please"
}
```

**Response:**
```json
{
  "id": "uuid",
  "customer_id": "uuid",
  "restaurant_id": "uuid",
  "reservation_date": "2025-12-10T19:00:00Z",
  "party_size": 4,
  "status": "PENDING",
  "special_requests": "Window table please",
  "created_at": "2025-12-03T10:00:00Z"
}
```

---

### GET /reservations/:id

Get reservation details.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "id": "uuid",
  "customer_id": "uuid",
  "restaurant_id": "uuid",
  "reservation_date": "2025-12-10T19:00:00Z",
  "party_size": 4,
  "status": "CONFIRMED",
  "special_requests": "Window table please",
  "created_at": "2025-12-03T10:00:00Z",
  "restaurant": {
    "id": "uuid",
    "name": "Dar Tajine Agadir",
    "address": "123 Rue Mohammed V, Agadir",
    "phone": "+212 5 28 84 12 34"
  }
}
```

---

### PATCH /reservations/:id

Update reservation status.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "status": "CANCELLED"
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "CANCELLED",
  "updated_at": "2025-12-03T10:00:00Z"
}
```

---

## Error Responses

All endpoints may return the following error formats:

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

Tokens are obtained from `/auth/login` or `/auth/register/customer` endpoints.

**Token Expiry:**
- Access Token: 15 minutes
- Refresh Token: 7 days

Use `/auth/refresh` to get a new access token when it expires.
