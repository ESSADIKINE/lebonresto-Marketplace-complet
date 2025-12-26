# Customer Authentication (Web App)

## Overview
Secure authentication for end-users (diners) accessing functionality like rewriting reviews, booking tables, and saving favorites.

## Endpoints (`/auth/customer`)

### 1. Registration & Login
| Method | Endpoint | Description | Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Create a new account | `{ email, password, name, phone }` |
| `POST` | `/login` | Sign in (Get Tokens) | `{ email, password }` |
| `POST` | `/refresh` | Rotation (New Access Token) | *(Cookie: refresh_token)* |
| `POST` | `/logout` | Revoke session | *(Cookie: refresh_token)* |
| `GET` | `/me` | Get Profile (Protected) | *(Bearer Token)* |

### 2. OTP & Recovery
| Method | Endpoint | Description | Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/otp/send` | Send Verification/Reset code | `{ email, purpose: 'verify'|'reset' }` |
| `POST` | `/otp/verify` | Verify Account | `{ email, otp, purpose: 'verify' }` |
| `POST` | `/password/forgot` | Request Reset OTP | `{ email }` |
| `POST` | `/password/reset` | Set New Password | `{ email, otp, newPassword }` |

## Security Strategy
*   **Tokens**:
    *   **Access Token (JWT)**: Short-lived (15m), sent in `Authorization: Bearer` header.
    *   **Refresh Token**: Long-lived (7d), sent in `HttpOnly` cookie. Hashed in DB.
*   **Tables Used**: `customers`, `customer_refresh_tokens`, `customer_otps`.
*   **Environment**: Uses `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`.

## Frontend Integration
*   **Location**: `apps/web`
*   **Provider**: `AuthProvider` handles state (`isAuthenticated`, `user`, `needsVerification`).
*   **Interceptor**: `apiClient.js` automates token refreshing on 401 errors.
