# Owner Authentication (Restaurant App)

## Overview
Authentication for restaurant owners to manage their businesses, menus, and reservations.

## Endpoints (`/auth/owner`)

### 1. Registration & Login
| Method | Endpoint | Description | Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register Business Owner | `{ email, password, name, phone, company_name }` |
| `POST` | `/login` | Sign in | `{ email, password }` |
| `POST` | `/refresh` | Rotate Session | *(Cookie: owner_refresh_token)* |
| `POST` | `/logout` | Revoke Session | *(Cookie: owner_refresh_token)* |
| `GET` | `/me` | Get Profile | *(Bearer Token)* |

### 2. OTP & Recovery
| Method | Endpoint | Purpose | Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/otp/verify` | Verify Email | `{ email, otp, purpose: 'verify' }` |
| `POST` | `/password/forgot` | Request Reset | `{ email }` |
| `POST` | `/password/reset` | Change Password | `{ email, otp, newPassword }` |

## Security Strategy
*   **Tokens**:
    *   **Access Token**: `role: 'owner'`.
    *   **Refresh Token**: Stored in `owner_refresh_token` HttpOnly cookie.
*   **Tables Used**: `owners`, `owner_refresh_tokens`, `owner_otps`.
*   **Validation**: Owners typically need `is_verified=true` to publish listings.

## Frontend Integration
*   **Location**: `apps/owner`
*   **Setup**: Use the same `AuthProvider` pattern as Web App but point to `/auth/owner`.
