# Lebonresto API – Endpoints Reference

**Base URL**: http://localhost:4000

Lebonresto Marketplace API documentation.

## Global Info

### Authentication
*   **Method**: Bearer Token
*   **Header**: `Authorization: Bearer <token>`

### Response Conventions
Standard HTTP status codes are used:
*   `200 OK`: Success
*   `201 Created`: Resource successfully created
*   `400 Bad Request`: Validation failed
*   `401 Unauthorized`: Missing or invalid token
*   `404 Not Found`: Resource not found

## Endpoints Listing

### Auth

#### POST /auth/login

**Summary**: Login user

**Auth required**: No

**Request Body**: [LoginDto](#logindto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/auth/login" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### POST /auth/register/customer

**Summary**: Register new customer

**Auth required**: No

**Request Body**: [CreateCustomerDto](#createcustomerdto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/auth/register/customer" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

### customers

#### POST /customers

**Summary**: Create a new customer

**Auth required**: No

**Request Body**: [CreateCustomerDto](#createcustomerdto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/customers" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /customers

**Summary**: Get all customers

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/customers"
```

---

#### GET /customers/{id}

**Summary**: Get a customer by ID

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/customers/1"
```

---

#### PATCH /customers/{id}

**Summary**: Update a customer

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Request Body**: [UpdateCustomerDto](#updatecustomerdto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/customers/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### DELETE /customers/{id}

**Summary**: Delete a customer

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/customers/1"
```

---

#### GET /customers/{id}/reservations

**Summary**: Get reservations for a customer

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/customers/1/reservations"
```

---

#### GET /customers/{id}/notifications

**Summary**: Get notifications for a customer

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/customers/1/notifications"
```

---

#### GET /customers/{id}/feedback

**Summary**: Get feedback for a customer

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/customers/1/feedback"
```

---

### owners

#### POST /owners

**Summary**: Create a new owner

**Auth required**: No

**Request Body**: [CreateOwnerDto](#createownerdto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/owners" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /owners

**Summary**: Get all owners

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/owners"
```

---

#### GET /owners/{id}

**Summary**: Get an owner by ID

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/owners/1"
```

---

#### PATCH /owners/{id}

**Summary**: Update an owner

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Request Body**: [UpdateOwnerDto](#updateownerdto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/owners/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### DELETE /owners/{id}

**Summary**: Delete an owner

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/owners/1"
```

---

### admins

#### POST /admins

**Summary**: Create a new admin

**Auth required**: No

**Request Body**: [CreateAdminDto](#createadmindto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/admins" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /admins

**Summary**: Get all admins

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/admins"
```

---

#### GET /admins/{id}

**Summary**: Get an admin by ID

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/admins/1"
```

---

#### PATCH /admins/{id}

**Summary**: Update an admin

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Request Body**: [UpdateAdminDto](#updateadmindto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/admins/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### DELETE /admins/{id}

**Summary**: Delete an admin

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/admins/1"
```

---

### restaurants

#### POST /restaurants

**Summary**: Create a new restaurant

**Auth required**: No

**Request Body**: [CreateRestaurantDto](#createrestaurantdto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/restaurants" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /restaurants

**Summary**: Get all restaurants

**Auth required**: No

**Query Params**:
*   `status` (string): Filter by status (comma separated)
*   `sort` (string): Sort by field (e.g. createdAtDesc)
*   `cityId` (string): 
*   `categoryId` (string): 
*   `minPrice` (number): 
*   `maxPrice` (number): 
*   `minRating` (number): 
*   `q` (string): 
*   `latitude` (number): 
*   `longitude` (number): 
*   `radius` (number): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants"
```

---

#### GET /restaurants/promos

**Summary**: Get restaurants with active promos

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/promos"
```

---

#### GET /restaurants/most-reserved

**Summary**: Get most reserved restaurants

**Auth required**: No

**Query Params**:
*   `month` (string): 
*   `limit` (number): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/most-reserved"
```

---

#### GET /restaurants/search

**Summary**: Search restaurants

**Auth required**: No

**Query Params**:
*   `cityId` (string): 
*   `categoryId` (string): 
*   `tagId` (string): 
*   `q` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/search"
```

---

#### GET /restaurants/{id}

**Summary**: Get a restaurant by ID

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/1"
```

---

#### PATCH /restaurants/{id}

**Summary**: Update a restaurant

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Request Body**: [UpdateRestaurantDto](#updaterestaurantdto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/restaurants/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### DELETE /restaurants/{id}

**Summary**: Delete a restaurant

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/restaurants/1"
```

---

#### GET /restaurants/{id}/details

**Summary**: Get Unified Restaurant Details (Core + Relations + Aggregations)

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/1/details"
```

---

#### GET /restaurants/{id}/full

**Summary**: Get Restaurant Full View (Optimized)

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/1/full"
```

---

#### GET /restaurants/{id}/menus

**Summary**: Get menus for a restaurant

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/1/menus"
```

---

#### GET /restaurants/{id}/plats

**Summary**: Get plats for a restaurant

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/1/plats"
```

---

#### GET /restaurants/{id}/images

**Summary**: Get images for a restaurant

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/1/images"
```

---

#### POST /restaurants/{id}/images

**Summary**: Add an image to a restaurant (URL)

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/restaurants/1/images"
```

---

#### GET /restaurants/{id}/tags

**Summary**: Get tags for a restaurant

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/1/tags"
```

---

#### POST /restaurants/{id}/tags

**Summary**: Link multiple tags to a restaurant

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/restaurants/1/tags"
```

---

#### GET /restaurants/{id}/events

**Summary**: Get events for a restaurant

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/1/events"
```

---

#### GET /restaurants/{id}/reservations

**Summary**: Get reservations for a restaurant

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/1/reservations"
```

---

#### GET /restaurants/{id}/feedback

**Summary**: Get feedback for a restaurant

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/1/feedback"
```

---

#### GET /restaurants/{id}/summary

**Summary**: Get summary for a restaurant

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/1/summary"
```

---

#### POST /restaurants/{id}/upload-image

**Summary**: Upload one or multiple image files to a restaurant

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/restaurants/1/upload-image" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### POST /restaurants/{id}/tags/{tagId}

**Summary**: Link a tag to a restaurant

**Auth required**: No

**Path Params**:
*   `id` (string): 
*   `tagId` (string): 

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/restaurants/1/tags/1"
```

---

### cities

#### POST /cities

**Summary**: Create a new city

**Auth required**: No

**Request Body**: [CreateCityDto](#createcitydto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/cities" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /cities

**Summary**: Get all cities

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/cities"
```

---

#### GET /cities/{id}

**Summary**: Get a city by ID

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/cities/1"
```

---

#### PATCH /cities/{id}

**Summary**: Update a city

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Request Body**: [UpdateCityDto](#updatecitydto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/cities/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### DELETE /cities/{id}

**Summary**: Delete a city

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/cities/1"
```

---

### categories

#### POST /categories

**Summary**: Create a new category

**Auth required**: No

**Request Body**: [CreateCategoryDto](#createcategorydto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/categories" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /categories

**Summary**: Get all categories

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/categories"
```

---

#### GET /categories/{id}

**Summary**: Get a category by ID

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/categories/1"
```

---

#### PATCH /categories/{id}

**Summary**: Update a category

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Request Body**: [UpdateCategoryDto](#updatecategorydto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/categories/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### DELETE /categories/{id}

**Summary**: Delete a category

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/categories/1"
```

---

### menus

#### POST /menus

**Summary**: Create a new menu

**Auth required**: No

**Request Body**: [CreateMenuDto](#createmenudto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/menus" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /menus

**Summary**: Get all menus

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/menus"
```

---

#### GET /menus/{id}

**Summary**: Get a menu by ID

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/menus/1"
```

---

#### PATCH /menus/{id}

**Summary**: Update a menu

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Request Body**: [UpdateMenuDto](#updatemenudto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/menus/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### DELETE /menus/{id}

**Summary**: Delete a menu

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/menus/1"
```

---

#### POST /menus/upload

**Summary**: Upload a menu PDF file

**Auth required**: No

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/menus/upload" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

### plats

#### POST /plats

**Summary**: Create a new plat

**Auth required**: No

**Request Body**: [CreatePlatDto](#createplatdto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/plats" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /plats

**Summary**: Get all plats

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/plats"
```

---

#### GET /plats/{id}

**Summary**: Get a plat by ID

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/plats/1"
```

---

#### PATCH /plats/{id}

**Summary**: Update a plat

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Request Body**: [UpdatePlatDto](#updateplatdto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/plats/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### DELETE /plats/{id}

**Summary**: Delete a plat

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/plats/1"
```

---

### reservations

#### POST /reservations

**Summary**: Create a new reservation

**Auth required**: No

**Request Body**: [CreateReservationDto](#createreservationdto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/reservations" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /reservations

**Summary**: Get all reservations

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/reservations"
```

---

#### GET /reservations/{id}

**Summary**: Get a reservation by ID

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/reservations/1"
```

---

#### PATCH /reservations/{id}

**Summary**: Update a reservation

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Request Body**: [UpdateReservationDto](#updatereservationdto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/reservations/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### DELETE /reservations/{id}

**Summary**: Delete a reservation

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/reservations/1"
```

---

### feedback

#### POST /feedback

**Summary**: Create new feedback (requires rating_cuisine, rating_service, rating_ambiance)

**Auth required**: No

**Request Body**: [CreateFeedbackDto](#createfeedbackdto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/feedback" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /feedback

**Summary**: Get all feedback

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/feedback"
```

---

#### GET /feedback/{id}

**Summary**: Get feedback by ID

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/feedback/1"
```

---

#### PATCH /feedback/{id}

**Summary**: Update feedback (recalculates global rating if sub-ratings change)

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Request Body**: [UpdateFeedbackDto](#updatefeedbackdto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/feedback/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### DELETE /feedback/{id}

**Summary**: Delete feedback

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/feedback/1"
```

---

### Events

#### POST /events

**Summary**: No summary

**Auth required**: No

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/events" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /events/upcoming

**Summary**: Get all upcoming events

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/events/upcoming"
```

---

#### GET /events/promotions

**Summary**: Get active promotions

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/events/promotions"
```

---

#### GET /events/restaurant/{restaurantId}

**Summary**: No summary

**Auth required**: No

**Path Params**:
*   `restaurantId` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/events/restaurant/1"
```

---

### Notifications

#### GET /notifications

**Summary**: No summary

**Auth required**: Yes

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/notifications" \
     -H "Authorization: Bearer <token>"
```

---

#### PATCH /notifications/{id}/seen

**Summary**: No summary

**Auth required**: Yes

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/notifications/1/seen" \
     -H "Authorization: Bearer <token>"
```

---

### tags

#### POST /tags

**Summary**: Create a new tag

**Auth required**: No

**Request Body**: [CreateTagDto](#createtagdto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/tags" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /tags

**Summary**: Get all tags

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/tags"
```

---

#### GET /tags/{id}

**Summary**: Get a tag by ID

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/tags/1"
```

---

#### PATCH /tags/{id}

**Summary**: Update a tag

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Request Body**: [UpdateTagDto](#updatetagdto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/tags/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### DELETE /tags/{id}

**Summary**: Delete a tag

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/tags/1"
```

---

### saved-restaurants

#### POST /restaurants/{id}/save

**Summary**: Save a restaurant to favorites

**Auth required**: Yes

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/restaurants/1/save" \
     -H "Authorization: Bearer <token>"
```

---

#### DELETE /restaurants/{id}/save

**Summary**: Unsave a restaurant from favorites

**Auth required**: Yes

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/restaurants/1/save" \
     -H "Authorization: Bearer <token>"
```

---

#### GET /me/saved-restaurants

**Summary**: Get my saved restaurants

**Auth required**: Yes

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/me/saved-restaurants" \
     -H "Authorization: Bearer <token>"
```

---

### restaurant-leads

#### POST /restaurant-leads

**Summary**: Create a new restaurant lead

**Auth required**: No

**Request Body**: [CreateRestaurantLeadDto](#createrestaurantleaddto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/restaurant-leads" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /restaurant-leads

**Summary**: Get all restaurant leads

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurant-leads"
```

---

#### GET /restaurant-leads/{id}

**Summary**: Get a restaurant lead by ID

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurant-leads/1"
```

---

#### PATCH /restaurant-leads/{id}

**Summary**: Update a restaurant lead

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Request Body**: [UpdateRestaurantLeadDto](#updaterestaurantleaddto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/restaurant-leads/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### DELETE /restaurant-leads/{id}

**Summary**: Delete a restaurant lead

**Auth required**: No

**Path Params**:
*   `id` (string): 

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/restaurant-leads/1"
```

---

### horaires

#### POST /restaurants/{restaurantId}/horaires

**Summary**: Create a new opening hour (horaire) for a restaurant

**Auth required**: No

**Path Params**:
*   `restaurantId` (string): Restaurant UUID

**Request Body**: [CreateHoraireDto](#createhorairedto)

**Response Codes**:
*   `201`

**Example cURL**:
```bash
curl -X POST "http://localhost:4000/restaurants/1/horaires" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### GET /restaurants/{restaurantId}/horaires

**Summary**: Get all opening hours for a restaurant

**Auth required**: No

**Path Params**:
*   `restaurantId` (string): Restaurant UUID

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/1/horaires"
```

---

#### GET /restaurants/{restaurantId}/horaires/{id}

**Summary**: Get a specific opening hour by ID

**Auth required**: No

**Path Params**:
*   `restaurantId` (string): Restaurant UUID
*   `id` (string): Horaire UUID

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/restaurants/1/horaires/1"
```

---

#### PUT /restaurants/{restaurantId}/horaires/{id}

**Summary**: Update an opening hour (full update)

**Auth required**: No

**Path Params**:
*   `restaurantId` (string): Restaurant UUID
*   `id` (string): Horaire UUID

**Request Body**: [UpdateHoraireDto](#updatehorairedto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PUT "http://localhost:4000/restaurants/1/horaires/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### PATCH /restaurants/{restaurantId}/horaires/{id}

**Summary**: Partially update an opening hour

**Auth required**: No

**Path Params**:
*   `restaurantId` (string): Restaurant UUID
*   `id` (string): Horaire UUID

**Request Body**: [UpdateHoraireDto](#updatehorairedto)

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X PATCH "http://localhost:4000/restaurants/1/horaires/1" \
     -H "Content-Type: application/json" \
     -d '{...}'
```

---

#### DELETE /restaurants/{restaurantId}/horaires/{id}

**Summary**: Delete an opening hour

**Auth required**: No

**Path Params**:
*   `restaurantId` (string): Restaurant UUID
*   `id` (string): Horaire UUID

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X DELETE "http://localhost:4000/restaurants/1/horaires/1"
```

---

### App

#### GET /

**Summary**: No summary

**Auth required**: No

**Response Codes**:
*   `200`

**Example cURL**:
```bash
curl -X GET "http://localhost:4000/"
```

---

## DTO Schemas

### LoginDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **email** | `string` | Yes | - |
| **password** | `string` | Yes | - |
| **type** | `string` | Yes | - |

### CreateCustomerDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **email** | `string` | Yes | - |
| **password** | `string` | Yes | - |
| **first_name** | `string` | No | - |
| **last_name** | `string` | No | - |
| **phone** | `string` | No | - |

### UpdateCustomerDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **email** | `string` | No | - |
| **password** | `string` | No | - |
| **first_name** | `string` | No | - |
| **last_name** | `string` | No | - |
| **phone** | `string` | No | - |

### CreateOwnerDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **email** | `string` | Yes | - |
| **password** | `string` | Yes | - |
| **name** | `string` | No | - |
| **phone** | `string` | No | - |
| **avatar_url** | `string` | No | - |
| **company_name** | `string` | No | - |
| **vat_number** | `string` | No | - |

### UpdateOwnerDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **email** | `string` | No | - |
| **password** | `string` | No | - |
| **name** | `string` | No | - |
| **phone** | `string` | No | - |
| **avatar_url** | `string` | No | - |
| **company_name** | `string` | No | - |
| **vat_number** | `string` | No | - |

### CreateAdminDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **email** | `string` | Yes | - |
| **password** | `string` | Yes | - |
| **first_name** | `string` | No | - |
| **last_name** | `string` | No | - |

### UpdateAdminDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **email** | `string` | No | - |
| **password** | `string` | No | - |
| **first_name** | `string` | No | - |
| **last_name** | `string` | No | - |

### CreateRestaurantDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **owner_id** | `string` | Yes | - |
| **name** | `string` | Yes | - |
| **description** | `string` | No | - |
| **logo_url** | `string` | No | - |
| **address** | `string` | No | - |
| **latitude** | `number` | No | - |
| **longitude** | `number` | No | - |
| **phone** | `string` | No | - |
| **email** | `string` | No | - |
| **status** | `string` | No | - |
| **city_id** | `string` | No | - |
| **category_id** | `string` | No | - |
| **visit360_url** | `string` | No | - |
| **video_url** | `string` | No | - |
| **is_active** | `boolean` | No | - |
| **restaurant_image** | `string` | Yes | - |
| **resturant_status** | `string` | No | - |

### UpdateRestaurantDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **owner_id** | `string` | No | - |
| **name** | `string` | No | - |
| **description** | `string` | No | - |
| **logo_url** | `string` | No | - |
| **address** | `string` | No | - |
| **latitude** | `number` | No | - |
| **longitude** | `number` | No | - |
| **phone** | `string` | No | - |
| **email** | `string` | No | - |
| **status** | `string` | No | - |
| **city_id** | `string` | No | - |
| **category_id** | `string` | No | - |
| **visit360_url** | `string` | No | - |
| **video_url** | `string` | No | - |
| **is_active** | `boolean` | No | - |
| **restaurant_image** | `string` | No | - |
| **resturant_status** | `string` | No | - |

### CreateCityDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **name** | `string` | Yes | - |
| **region** | `string` | No | - |
| **country** | `string` | No | - |
| **count_restaurants** | `number` | No | - |
| **city_image** | `string` | No | - |

### UpdateCityDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **name** | `string` | No | - |
| **region** | `string` | No | - |
| **country** | `string` | No | - |
| **count_restaurants** | `number` | No | - |
| **city_image** | `string` | No | - |

### CreateCategoryDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **name** | `string` | Yes | - |
| **slug** | `string` | No | - |
| **count_restaurants** | `number` | No | - |
| **category_image** | `string` | No | - |

### UpdateCategoryDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **name** | `string` | No | - |
| **slug** | `string` | No | - |
| **count_restaurants** | `number` | No | - |
| **category_image** | `string` | No | - |

### CreateMenuDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **restaurant_id** | `string` | Yes | - |
| **title** | `string` | Yes | - |
| **description** | `string` | No | - |
| **pdf_url** | `string` | No | - |

### UpdateMenuDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **restaurant_id** | `string` | No | - |
| **title** | `string` | No | - |
| **description** | `string` | No | - |
| **pdf_url** | `string` | No | - |

### CreatePlatDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **restaurant_id** | `string` | Yes | - |
| **name** | `string` | Yes | - |
| **description** | `string` | No | - |
| **price** | `number` | No | - |
| **image_url** | `string` | No | - |
| **is_published** | `boolean` | No | - |
| **is_premium** | `boolean` | No | - |

### UpdatePlatDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **restaurant_id** | `string` | No | - |
| **name** | `string` | No | - |
| **description** | `string` | No | - |
| **price** | `number` | No | - |
| **image_url** | `string` | No | - |
| **is_published** | `boolean` | No | - |
| **is_premium** | `boolean` | No | - |

### CreateReservationDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **restaurant_id** | `string` | Yes | - |
| **customer_id** | `string` | Yes | - |
| **reservation_time** | `string` | Yes | - |
| **guest_count** | `number` | Yes | - |
| **notes** | `string` | No | - |
| **automation_method** | `string` | No | - |

### UpdateReservationDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **restaurant_id** | `string` | No | - |
| **customer_id** | `string` | No | - |
| **reservation_time** | `string` | No | - |
| **guest_count** | `number` | No | - |
| **notes** | `string` | No | - |
| **automation_method** | `string` | No | - |
| **status** | `string` | No | - |

### CreateFeedbackDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **customer_id** | `string` | Yes | - |
| **restaurant_id** | `string` | Yes | - |
| **reservation_id** | `string` | No | - |
| **rating_cuisine** | `number` | Yes | - |
| **rating_service** | `number` | Yes | - |
| **rating_ambiance** | `number` | Yes | - |
| **comment** | `string` | No | - |
| **sentiment_score** | `number` | No | - |

### UpdateFeedbackDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **customer_id** | `string` | No | - |
| **restaurant_id** | `string` | No | - |
| **reservation_id** | `string` | No | - |
| **rating_cuisine** | `number` | No | - |
| **rating_service** | `number` | No | - |
| **rating_ambiance** | `number` | No | - |
| **comment** | `string` | No | - |
| **sentiment_score** | `number` | No | - |

### CreateTagDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **name** | `string` | Yes | - |

### UpdateTagDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **name** | `string` | No | - |

### CreateRestaurantLeadDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **restaurant_name** | `string` | Yes | - |
| **city_id** | `string` | No | UUID of the selected city |
| **city_name** | `string` | No | Name of the city if not in list |
| **category_id** | `string` | No | UUID of the selected category |
| **category_name** | `string` | No | Name of category if not in list |
| **seats_count** | `number` | No | - |
| **has_terrace** | `boolean` | No | - |
| **has_delivery** | `boolean` | No | - |
| **has_takeaway** | `boolean` | No | - |
| **contact_name** | `string` | Yes | - |
| **contact_role** | `string` | No | - |
| **contact_email** | `string` | Yes | - |
| **contact_phone** | `string` | No | - |
| **average_price_level** | `string` | No | - |
| **current_tools** | `string` | No | - |
| **message** | `string` | No | - |
| **preferred_contact_at** | `string` | No | - |

### UpdateRestaurantLeadDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **restaurant_name** | `string` | No | - |
| **city_id** | `string` | No | UUID of the selected city |
| **city_name** | `string` | No | Name of the city if not in list |
| **category_id** | `string` | No | UUID of the selected category |
| **category_name** | `string` | No | Name of category if not in list |
| **seats_count** | `number` | No | - |
| **has_terrace** | `boolean` | No | - |
| **has_delivery** | `boolean` | No | - |
| **has_takeaway** | `boolean` | No | - |
| **contact_name** | `string` | No | - |
| **contact_role** | `string` | No | - |
| **contact_email** | `string` | No | - |
| **contact_phone** | `string` | No | - |
| **average_price_level** | `string` | No | - |
| **current_tools** | `string` | No | - |
| **message** | `string` | No | - |
| **preferred_contact_at** | `string` | No | - |

### CreateHoraireDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **day_of_week** | `number` | Yes | Day of week (1 = Monday, 7 = Sunday) |
| **is_closed** | `boolean` | Yes | Is the restaurant closed on this day? |
| **open_time** | `string` | No | Opening time (HH:MM) |
| **close_time** | `string` | No | Closing time (HH:MM) |
| **break_start** | `object` | No | Break start time (HH:MM) |
| **break_end** | `object` | No | Break end time (HH:MM) |
| **notes** | `object` | No | Additional notes |

### UpdateHoraireDto

DTO Object

| Field | Type | Required | Description |
|---|---|---|---|
| **day_of_week** | `number` | No | Day of week (1 = Monday, 7 = Sunday) |
| **is_closed** | `boolean` | No | Is the restaurant closed on this day? |
| **open_time** | `string` | No | Opening time (HH:MM) |
| **close_time** | `string` | No | Closing time (HH:MM) |
| **break_start** | `object` | No | Break start time (HH:MM) |
| **break_end** | `object` | No | Break end time (HH:MM) |
| **notes** | `object` | No | Additional notes |

