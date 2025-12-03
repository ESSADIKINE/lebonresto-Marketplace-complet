# Admin Frontend Refactor Plan

## Goal
Create a clean, dedicated Admin Frontend for `admin.domain.com` using Next.js Pages Router.

## 1. Folder Structure (`apps/admin`)

```
apps/admin/
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.jsx  # Main wrapper
│   │   ├── Header.jsx           # Admin header
│   │   └── Sidebar.jsx          # Admin sidebar
│   ├── ui/                      # Reusable UI components (Cards, Tables, Buttons)
│   └── ...
├── pages/
│   ├── _app.js                  # Global styles & layout wrapper
│   ├── login.jsx
│   ├── forgot-password.jsx
│   ├── reset-password/
│   │   └── [token].jsx
│   └── dashboard/
│       ├── index.jsx            # Overview
│       ├── owners/
│       │   ├── index.jsx
│       │   └── [id].jsx
│       ├── customers/
│       │   ├── index.jsx
│       │   └── [id].jsx
│       ├── admins/
│       │   └── index.jsx
│       ├── restaurants/
│       │   ├── index.jsx
│       │   └── [id].jsx
│       ├── reservations/
│       │   ├── index.jsx
│       │   └── [id].jsx
│       ├── cities/
│       │   └── index.jsx
│       ├── categories/
│       │   └── index.jsx
│       ├── tags/
│       │   └── index.jsx
│       ├── events/
│       │   └── index.jsx
│       ├── feedback/
│       │   └── index.jsx
│       ├── reviews/
│       │   └── index.jsx
│       ├── messages/
│       │   └── index.jsx
│       ├── contact-messages/
│       │   └── index.jsx
│       ├── notifications/
│       │   └── index.jsx
│       ├── profile/
│       │   └── index.jsx
│       ├── security/
│       │   └── index.jsx
│       └── settings/
│           └── index.jsx
└── ...
```

## 2. Component Refactor

### `DashboardLayout.jsx`
- Wraps all `/dashboard/*` pages.
- Includes `Sidebar` (left) and `Header` (top).
- Handles responsive toggle for sidebar.

### `Header.jsx`
- Logo: "LeBonResto Admin"
- User Menu: Avatar + Dropdown (Profile, Settings, Logout).
- No public navigation links.

### `Sidebar.jsx`
- Sections:
    - **Dashboard**: Overview
    - **Users**: Owners, Customers, Admins
    - **Restaurants**: All Restaurants, Reservations, Events, Reviews, Messages
    - **Reference Data**: Cities, Categories, Tags
    - **Communication**: Notifications, Contact Messages
    - **Account**: Profile, Security, Settings
- Active state highlighting using `useRouter`.

## 3. Page Implementation Strategy
- **Phase 1**: Create file structure and basic layout integration.
- **Phase 2**: Add static placeholder content (tables/cards) to verify UI.
- **Phase 3**: (Future) Connect to API.

## 4. Cleanup
- Remove any remaining public pages (`about-us`, `contact-us`, etc.) if they slipped back in.
- Ensure `_app.js` correctly handles the layout.
