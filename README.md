
# Real Estate Application API

This is the REST API for a Real Estate application that supports user registration, authentication, profile management, and CRUD operations on property listings.

---

## Swagger docs

```
http://localhost:6969/api-docs
```

---
## Base URL

```
http://localhost:6969/api
```

---

## Authentication

This API uses JWT for authentication.  
Include the JWT token in the `Authorization` header as:  
`Authorization: Bearer <your_jwt_token>`

---

## User Routes

### Register User

**POST** `/users/register`  
Register a new user.

**Headers:**
- Content-Type: application/json

**Body:**
```json
{
  "username": "bibasjaprel",
  "email": "bibashjaprel111@gmail.com",
  "password": "securePassword",
  "role": "user"
}
```

---

### Login User

**POST** `/users/login`  
Authenticate user and receive JWT token.

**Headers:**
- Content-Type: application/json

**Body:**
```json
{
  "email": "bibashjaprel111@gmail.com",
  "password": "securePassword"
}
```

---

### Get User Profile

**GET** `/users/profile`  
Get the logged-in user's profile information.

**Headers:**
- Content-Type: application/json
- Authorization: Bearer `<token>`

---

### Update User Profile

**PATCH** `/users/profile`  
Update the logged-in user's profile.

**Headers:**
- Content-Type: application/json
- Authorization: Bearer `<token>`

**Body:**
```json
{
  "username": "bibasjaprel_updateds",
  "profile_image": "https://www.bibashjaprel.com.np/images/aboutsecphoto%20(2).jpg"
}
```

---

## Listing Routes

### Get All Listings

**GET** `/listings`  
Retrieve all property listings.

---

### Get Listing by ID

**GET** `/listings/{id}`  
Retrieve a single listing by its ID.

---

### Create a New Listing

**POST** `/listings`  
Create a new property listing.

**Headers:**
- Content-Type: application/json
- Authorization: Bearer `<token>`

**Body:**
```json
{
  "title": "3 BHK Apartment in Jawalakel",
  "description": "Spacious 3 bedroom apartment in Lazimpat",
  "category": "apartment",
  "price": 15000000,
  "price_type": "monthly",
  "address": {
    "city": "Kathmandu",
    "street": "Lazimpat",
    "house_no": "45A"
  },
  "latitude": 27.7172,
  "longitude": 85.324,
  "features": {
    "parking": true,
    "balcony": true,
    "furnished": false
  },
  "expires_at": "2025-12-31T23:59:59Z"
}
```

---

### Update a Listing

**PATCH** `/listings/{id}`  
Update an existing listing by its ID.

**Headers:**
- Content-Type: application/json
- Authorization: Bearer `<token>`

**Body:**
```json
{
  "title": "Updated 4 BHK Apartment in Kathmanduaaa",
  "description": "Updated description for the spacious 8 bedroom apartment in Lazimpat",
  "category": "apartment",
  "price": 16000000,
  "price_type": "monthly",
  "address": {
    "city": "Kathmandu",
    "street": "Lazimpat",
    "house_no": "45A"
  },
  "latitude": 27.7172,
  "longitude": 85.324,
  "features": {
    "parking": true,
    "balcony": true,
    "furnished": true
  },
  "expires_at": "2025-12-31T23:59:59Z"
}
```

---

### Delete a Listing

**DELETE** `/listings/{id}`  
Delete a listing by its ID.

**Headers:**
- Content-Type: application/json
- Authorization: Bearer `<token>`

---

## Notes

- All endpoints that require authentication expect a valid JWT token in the `Authorization` header.
- The `expires_at` field should be a valid ISO 8601 date string.
- `price_type` can be values like `"monthly"`, `"yearly"`, or `"one-time"` depending on your application logic.

---

## Contact

For questions or support, contact the developer at:  
**bibashjaprel111@gmail.com**
