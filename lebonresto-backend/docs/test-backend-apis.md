# Backend API Test Commands

This document contains curl commands to test all customer-facing API endpoints.

## Prerequisites

- Backend server running on `http://localhost:3000`
- `jq` installed for pretty JSON output (optional)

---

## 1. Authentication Tests

### Register a Customer

```bash
curl -X POST http://localhost:3000/auth/register/customer \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "first_name": "Test",
    "last_name": "User",
    "phone": "+212612345678"
  }' | jq
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "role": "customer"
  }' | jq
```

**Save the access_token from the response for subsequent authenticated requests.**

Set token variable:
```bash
TOKEN="your_access_token_here"
```

### Refresh Token

```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "your_refresh_token_here"
  }' | jq
```

---

## 2. Customer Tests

### Get Current Customer Profile

```bash
curl -X GET http://localhost:3000/customers/me \
  -H "Authorization: Bearer $TOKEN" | jq
```

---

## 3. Lookup Tests

### Get All Cities

```bash
curl -X GET http://localhost:3000/cities | jq
```

### Get All Categories

```bash
curl -X GET http://localhost:3000/categories | jq
```

### Get All Tags

```bash
curl -X GET http://localhost:3000/tags | jq
```

---

## 4. Restaurant Tests

### Get All Restaurants

```bash
curl -X GET http://localhost:3000/restaurants | jq
```

### Get Restaurants with Filters

```bash
# Filter by city (replace CITY_ID with actual UUID)
curl -X GET "http://localhost:3000/restaurants?cityId=CITY_ID" | jq

# Filter by category (replace CATEGORY_ID with actual UUID)
curl -X GET "http://localhost:3000/restaurants?categoryId=CATEGORY_ID" | jq

# Search by name
curl -X GET "http://localhost:3000/restaurants?q=tajine" | jq

# Combined filters
curl -X GET "http://localhost:3000/restaurants?cityId=CITY_ID&categoryId=CATEGORY_ID&q=moroccan" | jq
```

### Get Single Restaurant

```bash
# Replace RESTAURANT_ID with actual UUID
curl -X GET http://localhost:3000/restaurants/RESTAURANT_ID | jq
```

### Get Restaurant Images

```bash
# Replace RESTAURANT_ID with actual UUID
curl -X GET http://localhost:3000/restaurants/RESTAURANT_ID/images | jq
```

### Get Restaurant Menus

```bash
# Replace RESTAURANT_ID with actual UUID
curl -X GET http://localhost:3000/restaurants/RESTAURANT_ID/menus | jq
```

### Get Restaurant Plats (Dishes)

```bash
# Replace RESTAURANT_ID with actual UUID
curl -X GET http://localhost:3000/restaurants/RESTAURANT_ID/plats | jq
```

### Get Restaurant Events

```bash
# Replace RESTAURANT_ID with actual UUID
curl -X GET http://localhost:3000/restaurants/RESTAURANT_ID/events | jq
```

### Get Restaurant Feedback (Reviews)

```bash
# Replace RESTAURANT_ID with actual UUID
curl -X GET http://localhost:3000/restaurants/RESTAURANT_ID/feedback | jq
```

---

## 5. Reservation Tests

### Get Customer Reservations

```bash
# Replace CUSTOMER_ID with actual UUID
curl -X GET http://localhost:3000/customers/CUSTOMER_ID/reservations \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Create a Reservation

```bash
# Replace CUSTOMER_ID and RESTAURANT_ID with actual UUIDs
curl -X POST http://localhost:3000/reservations \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "CUSTOMER_ID",
    "restaurant_id": "RESTAURANT_ID",
    "reservation_date": "2025-12-10T19:00:00Z",
    "party_size": 4,
    "special_requests": "Window table please"
  }' | jq
```

### Get Reservation Details

```bash
# Replace RESERVATION_ID with actual UUID
curl -X GET http://localhost:3000/reservations/RESERVATION_ID \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Update Reservation Status

```bash
# Replace RESERVATION_ID with actual UUID
curl -X PATCH http://localhost:3000/reservations/RESERVATION_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "CANCELLED"
  }' | jq
```

---

## 6. Error Testing

### Test Unauthorized Access

```bash
# Should return 401 Unauthorized
curl -X GET http://localhost:3000/customers/me
```

### Test Invalid Login

```bash
# Should return 401 Unauthorized
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid@example.com",
    "password": "wrongpassword",
    "role": "customer"
  }' | jq
```

### Test Missing Required Fields

```bash
# Should return 400 Bad Request
curl -X POST http://localhost:3000/auth/register/customer \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }' | jq
```

### Test Not Found

```bash
# Should return 404 Not Found
curl -X GET http://localhost:3000/restaurants/00000000-0000-0000-0000-000000000000 | jq
```

---

## 7. Full Integration Test Script

Create a file `test-all-endpoints.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:3000"

echo "=== Testing Lookup Endpoints ==="
echo "Cities:"
curl -s $BASE_URL/cities | jq '.[] | {id, name}' | head -20

echo -e "\nCategories:"
curl -s $BASE_URL/categories | jq '.[] | {id, name}' | head -20

echo -e "\nTags:"
curl -s $BASE_URL/tags | jq '.[] | {id, name}' | head -20

echo -e "\n=== Testing Authentication ==="
echo "Registering customer..."
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/auth/register/customer \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test'$(date +%s)'@example.com",
    "password": "password123",
    "first_name": "Test",
    "last_name": "User",
    "phone": "+212612345678"
  }')

echo $REGISTER_RESPONSE | jq

TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.access_token')
echo "Token: $TOKEN"

echo -e "\n=== Testing Restaurants ==="
echo "Fetching restaurants..."
RESTAURANTS=$(curl -s $BASE_URL/restaurants)
echo $RESTAURANTS | jq '.data[0]'

FIRST_RESTAURANT_ID=$(echo $RESTAURANTS | jq -r '.data[0].id')
echo "First Restaurant ID: $FIRST_RESTAURANT_ID"

if [ "$FIRST_RESTAURANT_ID" != "null" ]; then
  echo -e "\nFetching restaurant details..."
  curl -s $BASE_URL/restaurants/$FIRST_RESTAURANT_ID | jq
  
  echo -e "\nFetching restaurant images..."
  curl -s $BASE_URL/restaurants/$FIRST_RESTAURANT_ID/images | jq
  
  echo -e "\nFetching restaurant menus..."
  curl -s $BASE_URL/restaurants/$FIRST_RESTAURANT_ID/menus | jq
fi

echo -e "\n=== Test Complete ==="
```

Make it executable:
```bash
chmod +x test-all-endpoints.sh
./test-all-endpoints.sh
```

---

## 8. PowerShell Version (Windows)

For Windows PowerShell users:

```powershell
# Test Cities Endpoint
Invoke-RestMethod -Uri "http://localhost:3000/cities" -Method Get | ConvertTo-Json

# Test Login
$loginBody = @{
    email = "test@example.com"
    password = "password123"
    role = "customer"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" `
    -Method Post `
    -ContentType "application/json" `
    -Body $loginBody

$token = $response.access_token

# Test Authenticated Endpoint
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:3000/customers/me" `
    -Method Get `
    -Headers $headers | ConvertTo-Json
```

---

## Notes

- Replace placeholder UUIDs (`RESTAURANT_ID`, `CUSTOMER_ID`, etc.) with actual values from your database
- The `jq` tool is used for pretty-printing JSON. If not installed, remove `| jq` from commands
- For Windows PowerShell, use the PowerShell examples provided
- Always set the `$TOKEN` variable after login for authenticated requests
