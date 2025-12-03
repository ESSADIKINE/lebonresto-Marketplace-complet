# Frontend Restructuring Plan

## 1. Proposed Architecture: Monorepo

We will restructure the current `Lebonresto-Frontend` into a monorepo using **npm workspaces**. This ensures clean separation of concerns while allowing easy code sharing.

### Folder Structure

```
/ (root)
├── package.json          # Root scripts (dev:all, dev:admin, etc.)
├── apps/
│   ├── admin/            # Admin Frontend (admin.domainname.com)
│   │   ├── pages/
│   │   ├── components/   # Admin-specific components
│   │   ├── public/
│   │   ├── styles/
│   │   ├── next.config.js
│   │   └── package.json
│   │
│   ├── owner/            # Owner Frontend (owner.domainname.com)
│   │   ├── pages/
│   │   ├── components/   # Owner-specific components
│   │   ├── public/
│   │   ├── styles/
│   │   ├── next.config.js
│   │   └── package.json
│   │
│   └── web/              # Global/Customer Frontend (domainname.com)
│       ├── pages/
│       ├── components/   # Customer-specific components
│       ├── public/
│       ├── styles/
│       ├── next.config.js
│       └── package.json
│
└── packages/
    └── shared/           # Shared UI components & logic
        ├── components/   # Generic components (Button, Card, Inputs)
        ├── layouts/      # Shared layouts (if any)
        ├── hooks/
        └── package.json
```

---

## 2. Page Distribution

### 🌍 Global Frontend (`apps/web`)
**Audience**: Visitors / Customers
**Pages**:
- `pages/index.js` (Home)
- `pages/single-listing/[slug].js` (Restaurant Details)
- `pages/listing-*.js` (Search/Grid views)
- `pages/about-us.js`, `contact-us.js` (Static pages)
- `pages/login.js`, `register.js` (Customer Auth)
- **REMOVED**: All `dashboard-*` pages.

### 🛡️ Admin Frontend (`apps/admin`)
**Audience**: Admins (Manager/Superadmin)
**Pages**:
- `pages/login.js` (Admin Login)
- `pages/dashboard/index.js` (Overview)
- `pages/dashboard/owners.js` (Owners Management)
- `pages/dashboard/customers.js` (Customers Management)
- `pages/dashboard/restaurants.js` (Restaurants Management)
- `pages/dashboard/reservations.js` (Reservations Management)
- **REMOVED**: Customer-facing pages, Owner-specific pages.

### 👨‍🍳 Owner Frontend (`apps/owner`)
**Audience**: Restaurant Owners
**Pages**:
- `pages/login.js`, `register.js` (Owner Auth)
- `pages/dashboard/index.js` (Overview)
- `pages/dashboard/my-restaurants.js` (Restaurant Management)
- `pages/dashboard/reservations.js` (Reservation Management)
- `pages/dashboard/menus.js` (Menu Management)
- `pages/dashboard/images.js` (Image Management)
- **REMOVED**: Admin pages, Customer pages.

---

## 3. Implementation Steps

1.  **Initialize Monorepo**:
    -   Create root `package.json` with workspaces configuration.
    -   Create `apps/` and `packages/` directories.

2.  **Migrate Global App**:
    -   Move current root contents to `apps/web`.
    -   Clean up `apps/web/pages` (remove dashboards).

3.  **Create Admin App**:
    -   Duplicate `apps/web` to `apps/admin`.
    -   Clean up `apps/admin/pages` (keep only admin dashboard & auth).
    -   Refactor Dashboard Layout for Admin context.

4.  **Create Owner App**:
    -   Duplicate `apps/web` to `apps/owner`.
    -   Clean up `apps/owner/pages` (keep only owner dashboard & auth).
    -   Refactor Dashboard Layout for Owner context.

5.  **Extract Shared Components**:
    -   Move generic UI components to `packages/shared`.
    -   Update imports in all apps to use `@lebonresto/shared`.

6.  **Scripting**:
    -   Update `package.json` in each app.
    -   Add convenience scripts in root `package.json`.

---

## 4. Example: Cleaned Pages

### Global Home (`apps/web/pages/index.js`)
```javascript
import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import PopularCategories from "../components/home/PopularCategories";
import FeaturedRestaurants from "../components/home/FeaturedRestaurants";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <PopularCategories />
      <FeaturedRestaurants />
    </Layout>
  );
}
```

### Admin Dashboard (`apps/admin/pages/dashboard/index.js`)
```javascript
import AdminLayout from "../../components/dashboard/AdminLayout";
import StatsCards from "../../components/dashboard/StatsCards";

export default function AdminDashboard() {
  return (
    <AdminLayout title="Admin Overview">
      <StatsCards />
      {/* Admin specific widgets */}
    </AdminLayout>
  );
}
```
