# Admin Authentication (Admin Dashboard)

## Overview
High-security authentication for platform administrators.

## Endpoints (`/auth/admin`)

### 1. Login & Management
| Method | Endpoint | Description | Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/login` | Admin Sign In | `{ email, password }` |
| `POST` | `/refresh` | Extend Session | *(Cookie: admin_refresh_token)* |
| `POST` | `/logout` | Secure Logout | *(Cookie: admin_refresh_token)* |
| `GET` | `/me` | Check Credentials | *(Bearer Token)* |

> **Note**: Admins **cannot register** publicly. They must be seeded in the DB or created by another Super Admin.

### 2. Recovery
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/password/forgot` | Send OTP to registered email |
| `POST` | `/password/reset` | Secure Password Change |

## Security Strategy
*   **Tokens**:
    *   **Access Token**: `role: 'admin'`.
    *   **Refresh Token**: Stored in `admin_refresh_token` HttpOnly cookie.
*   **Risk Mitigation**: Admin sessions should ideally use stricter TTLs (Time-To-Live).
*   **Tables Used**: `admins`, `admin_refresh_tokens`, `admin_otps`.

## Frontend Integration
*   **Location**: `apps/admin` (or separate route in existing app).
*   **Setup**: Ensure `apiClient` sends/receives credentials to handle the `admin_refresh_token` cookie.
