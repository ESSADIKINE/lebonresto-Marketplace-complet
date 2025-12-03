# Migration Guide: Redux Slices → RTK Query

This guide helps you migrate from the traditional Redux slices to RTK Query hooks.

## Overview

**Before**: Manual Redux slices with async thunks  
**After**: RTK Query with automatic caching, loading states, and data management

## Benefits of Migration

✅ **Less Code**: No need to write reducers, actions, or thunks  
✅ **Better Caching**: Automatic cache management with tag-based invalidation  
✅ **Loading States**: Built-in `isLoading`, `isFetching`, `isSuccess`, `isError`  
✅ **No Manual Fetching**: Data fetches automatically when component mounts  
✅ **Optimistic Updates**: Easy to implement for better UX  
✅ **Polling**: Built-in support for auto-refreshing data  

---

## Auth Migration

### ❌ Before (authSlice.js)

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { loginCustomer } from '@/store/slices/authSlice';

function LoginPage() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (credentials) => {
    try {
      await dispatch(loginCustomer(credentials)).unwrap();
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  // ...
}
```

### ✅ After (RTK Query)

```tsx
import { useLoginCustomerMutation } from '@/store/api';

function LoginPage() {
  const [loginCustomer, { isLoading, error }] = useLoginCustomerMutation();

  const handleLogin = async (credentials) => {
    try {
      await loginCustomer(credentials).unwrap();
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  // ...
}
```

**Changes:**
- ❌ Remove `useDispatch` and `useSelector`
- ✅ Use `useLoginCustomerMutation` hook directly
- ✅ Destructure `{ isLoading, error }` from mutation result
- ✅ Token storage is automatic (no manual localStorage needed)

---

## Restaurants Migration

### ❌ Before (restaurantsSlice.js)

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '@/store/slices/restaurantsSlice';
import { useEffect } from 'react';

function RestaurantList() {
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector((state) => state.restaurants);
  const [filters, setFilters] = useState({ city_id: '', category_id: '' });

  useEffect(() => {
    dispatch(fetchRestaurants(filters));
  }, [dispatch, filters]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
```

### ✅ After (RTK Query)

```tsx
import { useGetRestaurantsQuery } from '@/store/api';

function RestaurantList() {
  const [filters, setFilters] = useState({ city_id: '', category_id: '' });
  
  const { data, isLoading, error } = useGetRestaurantsQuery(filters);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      {data?.data.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
```

**Changes:**
- ❌ Remove `useDispatch`, `useSelector`, and `useEffect`
- ✅ Use `useGetRestaurantsQuery(filters)` hook
- ✅ Data fetches automatically when filters change
- ✅ No manual refetching logic needed

---

## Lookups Migration

### ❌ Before (lookupsSlice.js)

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, fetchCategories, fetchTags } from '@/store/slices/lookupsSlice';
import { useEffect } from 'react';

function FilterBar() {
  const dispatch = useDispatch();
  const { cities, categories, tags, loading } = useSelector((state) => state.lookups);

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchCategories());
    dispatch(fetchTags());
  }, [dispatch]);

  // ...
}
```

### ✅ After (RTK Query)

```tsx
import { useGetCitiesQuery, useGetCategoriesQuery, useGetTagsQuery } from '@/store/api';

function FilterBar() {
  const { data: cities } = useGetCitiesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: tags } = useGetTagsQuery();

  // Data fetches automatically, no useEffect needed
}
```

**Changes:**
- ❌ Remove all dispatch and useEffect logic
- ✅ Use individual query hooks
- ✅ Data fetches automatically and is cached globally
- ✅ If another component uses the same query, it gets cached data

---

## Single Restaurant Migration

### ❌ Before

```jsx
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRestaurantById,
  fetchRestaurantImages,
  fetchRestaurantMenus,
} from '@/store/slices/restaurantsSlice';
import { useEffect } from 'react';

function RestaurantDetail({ id }) {
  const dispatch = useDispatch();
  const {
    selectedRestaurant,
    restaurantImages,
    restaurantMenus,
    loading,
  } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(fetchRestaurantById(id));
    dispatch(fetchRestaurantImages(id));
    dispatch(fetchRestaurantMenus(id));
  }, [dispatch, id]);

  // ...
}
```

### ✅ After

```tsx
import {
  useGetRestaurantByIdQuery,
  useGetRestaurantImagesQuery,
  useGetRestaurantMenusQuery,
} from '@/store/api';

function RestaurantDetail({ id }) {
  const { data: restaurant, isLoading } = useGetRestaurantByIdQuery(id);
  const { data: images } = useGetRestaurantImagesQuery(id);
  const { data: menus } = useGetRestaurantMenusQuery(id);

  // All queries fetch in parallel automatically!
}
```

**Changes:**
- ❌ Remove all manual fetching logic
- ✅ Use separate hooks for each data type
- ✅ Parallel fetching is automatic
- ✅ Each query has independent loading/error states

---

## Conditional Fetching

Sometimes you only want to fetch if certain conditions are met.

### ❌ Before

```jsx
useEffect(() => {
  if (isAuthenticated) {
    dispatch(fetchCurrentCustomer());
  }
}, [dispatch, isAuthenticated]);
```

### ✅ After

```tsx
const { data: customer } = useGetCurrentCustomerQuery(undefined, {
  skip: !isAuthenticated, // Don't fetch if not authenticated
});
```

**Changes:**
- ✅ Use `skip` option for conditional fetching
- ✅ No need for conditional useEffect

---

## Refetching Data

### ❌ Before

```jsx
const handleRefresh = () => {
  dispatch(fetchRestaurants(filters));
};
```

### ✅ After

```tsx
const { data, refetch } = useGetRestaurantsQuery(filters);

const handleRefresh = () => {
  refetch();
};
```

**Changes:**
- ✅ Use `refetch` function from query result
- ✅ Instantly updates with fresh data

---

## Mutations (Create/Update/Delete)

### ❌ Before

```jsx
import { createReservation } from '@/store/slices/reservationsSlice';

const handleSubmit = async (data) => {
  try {
    await dispatch(createReservation(data)).unwrap();
    // Manually refetch reservations
    dispatch(fetchReservations());
  } catch (err) {
    console.error(err);
  }
};
```

### ✅ After

```tsx
import { useCreateReservationMutation } from '@/store/api';

const [createReservation, { isLoading }] = useCreateReservationMutation();

const handleSubmit = async (data) => {
  try {
    await createReservation(data).unwrap();
    // Cache automatically invalidated - no manual refetch needed!
  } catch (err) {
    console.error(err);
  }
};
```

**Changes:**
- ✅ Use mutation hook
- ✅ Cache invalidation is automatic via tags
- ❌ No need to manually refetch data

---

## Loading States

### ❌ Before

```jsx
const { loading } = useSelector((state) => state.restaurants);

if (loading) return <div>Loading...</div>;
```

### ✅ After

```tsx
const { isLoading, isFetching } = useGetRestaurantsQuery(filters);

if (isLoading) return <div>Loading...</div>; // First load
if (isFetching) return <div>Updating...</div>; // Background refetch
```

**Changes:**
- ✅ `isLoading` - True on first fetch
- ✅ `isFetching` - True on any fetch (including background refetch)
- ✅ More granular control over loading states

---

## Error Handling

### ❌ Before

```jsx
const { error } = useSelector((state) => state.restaurants);

if (error) return <div>Error: {error}</div>;
```

### ✅ After

```tsx
const { error, isError } = useGetRestaurantsQuery(filters);

if (isError) {
  return <div>Error: {error?.data?.message || 'Something went wrong'}</div>;
}
```

**Changes:**
- ✅ `isError` boolean for checking error state
- ✅ `error` object contains detailed error info
- ✅ Access error message via `error?.data?.message`

---

## Polling (Auto-refresh)

RTK Query makes polling trivial - no manual setInterval needed!

### ❌ Before

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    dispatch(fetchNotifications());
  }, 30000);

  return () => clearInterval(interval);
}, [dispatch]);
```

### ✅ After

```tsx
const { data: notifications } = useGetMyNotificationsQuery(undefined, {
  pollingInterval: 30000, // Auto-refresh every 30 seconds
});
```

**Changes:**
- ❌ No manual interval management
- ✅ Built-in polling support
- ✅ Automatically stops when component unmounts

---

## Complete Example: Before vs After

### ❌ Before: Traditional Redux Slice

```jsx
// Component
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants, setFilters } from '@/store/slices/restaurantsSlice';

function RestaurantPage() {
  const dispatch = useDispatch();
  const {
    restaurants,
    loading,
    error,
    filters,
    totalCount,
  } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(fetchRestaurants(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <FilterBar filters={filters} onChange={handleFilterChange} />
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} restaurant={r} />
      ))}
      <p>Total: {totalCount}</p>
    </div>
  );
}
```

### ✅ After: RTK Query

```tsx
// Component - Much simpler!
import { useState } from 'react';
import { useGetRestaurantsQuery } from '@/store/api';

function RestaurantPage() {
  const [filters, setFilters] = useState({ city_id: '', category_id: '' });
  
  const { data, isLoading, error } = useGetRestaurantsQuery(filters);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      <FilterBar filters={filters} onChange={setFilters} />
      {data?.data.map((r) => (
        <RestaurantCard key={r.id} restaurant={r} />
      ))}
      <p>Total: {data?.total}</p>
    </div>
  );
}
```

**Lines of Code:**
- Before: ~35 lines
- After: ~20 lines  
**Reduction: 43% less code!**

---

## Migration Checklist

For each component using Redux slices:

- [ ] Replace `useDispatch()` and `useSelector()` with RTK Query hooks
- [ ] Remove manual `useEffect` fetching logic
- [ ] Replace `loading` with `isLoading`
- [ ] Replace `error` string with `error` object
- [ ] Remove manual refetch dispatches (cache invalidation is automatic)
- [ ] Update imports from `@/store/slices/*` to `@/store/api`
- [ ] Test the component
- [ ] Remove the old slice file if no longer used

---

## Can I Keep Both?

**Yes!** The old slices and new RTK Query can coexist.

The store is configured with both:

```ts
reducer: {
  [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query
  auth: authReducer,                          // Old slice
  restaurants: restaurantsReducer,            // Old slice
  lookups: lookupsReducer,                    // Old slice
}
```

You can migrate incrementally, component by component.

---

## When to Keep Old Slices?

You might keep old slices for:
- Complex client-side state (not from API)
- UI state (modal open/closed, etc.)
- Temporary data that shouldn't be cached

But for **API data**, RTK Query is almost always better.

---

## Final Note

Once all components are migrated to RTK Query, you can safely delete:
- `store/slices/authSlice.js`
- `store/slices/restaurantsSlice.js`
- `store/slices/lookupsSlice.js`

And simplify the store to only include RTK Query!

```ts
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
```

---

**Happy migrating! 🚀**
