# RTK Query Data Layer - LeBonResto Customer APIs

This directory contains the complete RTK Query setup for all customer-facing API endpoints in the LeBonResto marketplace.

## 📁 Structure

```
store/api/
├── apiSlice.ts              # Base API slice with fetchBaseQuery
├── authApi.ts               # Customer authentication endpoints
├── lookupsApi.ts            # Reference data (cities, categories, tags)
├── restaurantsApi.ts        # Restaurant listings and details
├── reservationsApi.ts       # Customer reservations
├── feedbackApi.ts           # Customer reviews/ratings
├── notificationsApi.ts      # Customer notifications
├── contactApi.ts            # Contact form submissions
├── types.ts                 # TypeScript type definitions
├── index.ts                 # Central export file
├── USAGE_EXAMPLES.md        # Practical usage examples
└── README.md                # This file
```

## 🎯 Features

### Automatic Token Management
- Tokens are automatically attached to requests from `localStorage.getItem('lb_customer_token')`
- Login and register automatically store tokens
- No manual header management needed

### Smart Caching
- Aggressive caching with tag-based invalidation
- Data is cached and reused across components
- Automatic cache invalidation when data changes

### Optimistic Updates
- Notifications are updated instantly before API confirmation
- Better user experience with instant feedback

### TypeScript Support
- Full TypeScript types for all endpoints
- Type-safe hooks and responses
- Import types from `./types.ts`

### Built-in Features
- Loading states
- Error handling
- Polling (auto-refresh)
- Conditional fetching
- Refetch on focus
- Request cancellation

## 🚀 Quick Start

### 1. Import Hooks

```tsx
import {
  useLoginCustomerMutation,
  useGetRestaurantsQuery,
  useCreateReservationMutation,
} from '@/store/api';
```

### 2. Use in Components

```tsx
export default function RestaurantList() {
  const { data, isLoading, error } = useGetRestaurantsQuery({
    city_id: 'some-uuid',
    page: 1,
    limit: 12,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      {data?.data.map((restaurant) => (
        <div key={restaurant.id}>{restaurant.name}</div>
      ))}
    </div>
  );
}
```

## 📚 Available Endpoints

### Authentication
- `useLoginCustomerMutation()` - Login
- `useRegisterCustomerMutation()` - Register
- `useGetCurrentCustomerQuery()` - Get profile
- `useUpdateCustomerProfileMutation()` - Update profile

### Reference Data
- `useGetCitiesQuery()` - All cities
- `useGetCategoriesQuery()` - All categories
- `useGetTagsQuery()` - All tags

### Restaurants
- `useGetRestaurantsQuery(filters)` - List with filters
- `useGetRestaurantByIdQuery(id)` - Single restaurant
- `useGetRestaurantImagesQuery(id)` - Restaurant photos
- `useGetRestaurantMenusQuery(id)` - Restaurant menus
- `useGetRestaurantPlatsQuery(id)` - Restaurant dishes
- `useGetRestaurantEventsQuery(id)` - Restaurant events
- `useGetRestaurantFeedbackQuery(id)` - Restaurant reviews

### Reservations
- `useGetMyReservationsQuery()` - My reservations
- `useCreateReservationMutation()` - Create reservation
- `useGetReservationByIdQuery(id)` - Single reservation
- `useUpdateReservationMutation()` - Update/cancel reservation

### Feedback
- `useCreateFeedbackMutation()` - Submit review
- `useGetMyFeedbackQuery()` - My reviews
- `useUpdateFeedbackMutation()` - Edit review
- `useDeleteFeedbackMutation()` - Delete review

### Notifications
- `useGetMyNotificationsQuery()` - My notifications
- `useMarkNotificationAsSeenMutation()` - Mark as read
- `useMarkAllNotificationsAsSeenMutation()` - Mark all as read
- `useDeleteNotificationMutation()` - Delete notification

### Contact
- `useSubmitContactMessageMutation()` - Submit contact form

## 🔐 Authentication Flow

### Login Example

```tsx
const [loginCustomer, { isLoading, error }] = useLoginCustomerMutation();

const handleLogin = async (email: string, password: string) => {
  try {
    const result = await loginCustomer({ email, password }).unwrap();
    // Token automatically stored in localStorage
    router.push('/dashboard');
  } catch (err) {
    console.error('Login failed:', err);
  }
};
```

### Logout

```tsx
import { logout } from '@/store/api';

const handleLogout = () => {
  logout(); // Clears token from localStorage
  router.push('/login');
};
```

## 🏷️ Cache Tags

The API uses tags for intelligent cache invalidation:

- `Customer` - Current user profile
- `Restaurant` - Restaurant data
- `City`, `Category`, `Tag` - Reference data
- `Menu`, `Plat`, `Event` - Restaurant details
- `Reservation` - Customer reservations
- `Feedback` - Customer reviews
- `Notification` - Customer notifications

When you create/update/delete data, related caches are automatically invalidated.

## 🎨 TypeScript Usage

```tsx
import type {
  Restaurant,
  Customer,
  Reservation,
  RestaurantFilters,
} from '@/store/api/types';

const filters: RestaurantFilters = {
  city_id: 'uuid',
  category_id: 'uuid',
  q: 'moroccan',
  page: 1,
  limit: 12,
};

const { data } = useGetRestaurantsQuery(filters);
// data is typed as RestaurantsResponse
```

## ⚙️ Advanced Configuration

### Polling (Auto-refresh)

```tsx
const { data } = useGetMyNotificationsQuery(undefined, {
  pollingInterval: 30000, // Refresh every 30 seconds
});
```

### Skip Query

```tsx
const { data } = useGetCurrentCustomerQuery(undefined, {
  skip: !isAuthenticated, // Don't fetch if not logged in
});
```

### Refetch on Window Focus

```tsx
const { data } = useGetRestaurantsQuery(filters, {
  refetchOnFocus: true, // Refresh when user returns to tab
});
```

### Manual Refetch

```tsx
const { data, refetch } = useGetRestaurantsQuery(filters);

<button onClick={() => refetch()}>Refresh</button>
```

## 🐛 Error Handling

```tsx
const { data, error, isError } = useGetRestaurantsQuery(filters);

if (isError) {
  return (
    <div className="alert alert-danger">
      {error?.data?.message || 'Something went wrong'}
    </div>
  );
}
```

## 📝 Notes

### Customer-Only Endpoints
This API layer contains ONLY customer-facing endpoints. There are no owner or admin endpoints here.

### Token Storage
- Tokens are stored in `localStorage` with key `lb_customer_token`
- Token is automatically attached to all requests via the `prepareHeaders` function
- Token is automatically set on login/register

### Backend Requirements
The backend must:
- Return `{ access_token, user }` on login/register
- Accept `Authorization: Bearer <token>` header
- Return appropriate error codes (401 for unauthorized, etc.)

### Environment Variables
Set `NEXT_PUBLIC_API_BASE_URL` in your `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

## 🔍 Debugging

### Redux DevTools
RTK Query integrates with Redux DevTools. You can see:
- All API calls
- Cache state
- Loading states
- Errors

### Console Logging
You can add middleware to log all API calls:

```tsx
middlewareBuilder.concat(
  apiSlice.middleware,
  customLoggingMiddleware
);
```

## 📖 Further Reading

- See `USAGE_EXAMPLES.md` for detailed component examples
- See `types.ts` for all TypeScript definitions
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)

## 🎯 Best Practices

1. ✅ Always handle loading and error states
2. ✅ Use TypeScript types for better type safety
3. ✅ Use `skip` option to avoid unnecessary API calls
4. ✅ Use optimistic updates for better UX
5. ✅ Leverage caching - don't refetch unnecessarily
6. ✅ Use polling for real-time-ish updates (notifications)
7. ❌ Don't manually manage tokens - it's automatic
8. ❌ Don't fetch data in multiple places - use the same hook
9. ❌ Don't forget to handle error states

---

**Questions?** Check `USAGE_EXAMPLES.md` or the RTK Query docs.
