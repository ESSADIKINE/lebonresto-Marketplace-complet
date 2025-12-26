# 🧪 Authentication Test Procedures & Flow Checklist

Use this guide to validate the implementation of the Secure "Double-Token" Authentication Flow.

## 🛠️ 1. Setup & Pre-requisites
*   [ ] **Backend Running**: `npm run start` (Port 3000)
*   [ ] **Frontend Running**: `npm run dev` (Port 3001)
*   [ ] **Browser**: Chrome/Edge/Firefox with DevTools Open (F12)

## 🕵️ 2. Step-by-Step Validation

### Phase A: Login & Token Storage
1.  **Action**: Navigate to `http://localhost:3001/auth/login`. Enter valid credentials.
2.  **Verify UI**: 
    *   [ ] Redirection to Home Page.
    *   [ ] Header shows User Avatar (not "Connexion").
3.  **Verify Network (DevTools -> Network)**:
    *   [ ] `POST /login` -> Status `201`.
    *   [ ] Response Body contains `access_token` and `user` object.
    *   [ ] **Cookie**: Look at Response Headers. specific `Set-Cookie: refresh_token=...; Path=/; HttpOnly`.
4.  **Verify Storage (DevTools -> Application)**:
    *   [ ] **Local Storage**: Key `accessToken` should exist and have a long JWT string.

### Phase B: Session Persistence (The Fix)
1.  **Action**: While logged in, press **F5 (Refresh)**.
2.  **Verify Console**:
    *   [ ] `[AuthProvider] Mount. Running checkAuth...`
    *   [ ] `[apiClient] Attaching Access Token to request: /auth/customer/me` (Should use token from localStorage!)
    *   [ ] `[AuthProvider] checkAuth: User verified`
3.  **Verify UI**:
    *   [ ] User **stays logged in**. Avatar is visible immediately.
    *   [ ] NO flicker (Login -> Logout -> Login).

### Phase C: Token Expiry & Rollover (Auto-Refresh)
*Simulation: Manually delete `accessToken` from localStorage but KEEP the cookie.*
1.  **Action**: `localStorage.removeItem('accessToken')` -> Refresh Page.
2.  **Flow Observation (Console)**:
    *   [ ] `[apiClient] No Access Token found for: /auth/customer/me`
    *   [ ] `POST /auth/customer/me` -> **401 Unauthorized** (Red in Network Tab).
    *   [ ] `[apiClient] 401 detected. Attempting Refresh...`
    *   [ ] `POST /auth/customer/refresh` -> **201 Created**.
    *   [ ] `[apiClient] Refresh Successful. New Token received.`
    *   [ ] `[apiClient] Attaching Access Token...` (Retry original request).
    *   [ ] User is logged in.

### Phase D: Logout
1.  **Action**: Click Avatar -> "Déconnexion".
2.  **Verify Network**:
    *   [ ] `POST /logout` -> Status `201`.
    *   [ ] `Set-Cookie: refresh_token=; Max-Age=0` (Cookie cleared).
3.  **Verify Storage**:
    *   [ ] `accessToken` removed from Local Storage.
4.  **Action**: Refresh Page.
    *   [ ] User sees "Connexion" button.

---

## 🛑 Troubleshooting Guide

| Symptom | Check This |
| :--- | :--- |
| **Login works, but Refresh Logs out** | Check `apiClient.js` logic. Did you enable `localStorage`? Check backend logs: "Refresh token missing" = Cookie not sent. |
| **"Refresh token missing" Error** | Browser is blocking Third-Party cookies? Use `localhost` for both FE and BE. |
| **"Invalid refresh token" Error** | Database hash mismatch. Did you wipe the DB recently? Log out and Log in again. |
| **CORS Error** | Check `main.ts`. Is `http://localhost:3001` in origin list? |
