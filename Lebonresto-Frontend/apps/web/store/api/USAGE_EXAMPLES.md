# RTK Query Usage Examples for LeBonResto

This document provides practical examples of using the RTK Query API hooks in your React components.

## Table of Contents
- [Authentication](#authentication)
- [Reference Data (Lookups)](#reference-data-lookups)
- [Restaurants](#restaurants)
- [Reservations](#reservations)
- [Feedback](#feedback)
- [Notifications](#notifications)
- [Contact Form](#contact-form)

---

## Authentication

### Login Page Example

```tsx
import { useLoginCustomerMutation } from '@/store/api';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [loginCustomer, { isLoading, error }] = useLoginCustomerMutation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await loginCustomer({ email, password }).unwrap();
      // Token is automatically stored in localStorage
      router.push('/grid-layout');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error.data?.message}</div>}
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Current User Profile

```tsx
import { useGetCurrentCustomerQuery, useUpdateCustomerProfileMutation } from '@/store/api';

export default function ProfilePage() {
  const { data: customer, isLoading, error } = useGetCurrentCustomerQuery();
  const [updateProfile] = useUpdateCustomerProfileMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  const handleUpdatePhone = async (newPhone: string) => {
    try {
      await updateProfile({ phone: newPhone }).unwrap();
      // Profile automatically refreshes
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div>
      <h1>Welcome, {customer?.first_name}!</h1>
      <p>Email: {customer?.email}</p>
      <p>Phone: {customer?.phone}</p>
    </div>
  );
}
```

---

## Reference Data (Lookups)

### City, Category, Tag Filters

```tsx
import { useGetCitiesQuery, useGetCategoriesQuery, useGetTagsQuery } from '@/store/api';

export default function FilterBar() {
  const { data: cities } = useGetCitiesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: tags } = useGetTagsQuery();

  return (
    <div>
      <select>
        <option value="">All Cities</option>
        {cities?.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <select>
        <option value="">All Categories</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <div>
        {tags?.map((tag) => (
          <label key={tag.id}>
            <input type="checkbox" value={tag.id} />
            {tag.name}
          </label>
        ))}
      </div>
    </div>
  );
}
```

---

## Restaurants

### Restaurant Listing with Filters

```tsx
import { useGetRestaurantsQuery } from '@/store/api';
import { useState } from 'react';

export default function RestaurantGrid() {
  const [filters, setFilters] = useState({
    city_id: '',
    category_id: '',
    tags: '',
    q: '',
    page: 1,
    limit: 12,
  });

  const { data, isLoading, error } = useGetRestaurantsQuery(filters);

  if (isLoading) return <div>Loading restaurants...</div>;
  if (error) return <div>Error loading restaurants</div>;

  return (
    <div>
      {/* Filter inputs that update the filters state */}
      
      <div className="row">
        {data?.data.map((restaurant) => (
          <div key={restaurant.id} className="col-md-4">
            <div className="card">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.description}</p>
              <p>📍 {restaurant.city?.name}</p>
              <p>🍽️ {restaurant.category?.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        Total: {data?.total} restaurants
      </div>
    </div>
  );
}
```

### Single Restaurant Detail Page

```tsx
import {
  useGetRestaurantByIdQuery,
  useGetRestaurantImagesQuery,
  useGetRestaurantMenusQuery,
  useGetRestaurantPlatsQuery,
  useGetRestaurantEventsQuery,
  useGetRestaurantFeedbackQuery,
} from '@/store/api';
import { useRouter } from 'next/router';

export default function RestaurantDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // Fetch all restaurant data in parallel
  const { data: restaurant, isLoading } = useGetRestaurantByIdQuery(id as string, {
    skip: !id,
  });
  const { data: images } = useGetRestaurantImagesQuery(id as string, { skip: !id });
  const { data: menus } = useGetRestaurantMenusQuery(id as string, { skip: !id });
  const { data: plats } = useGetRestaurantPlatsQuery(id as string, { skip: !id });
  const { data: events } = useGetRestaurantEventsQuery(id as string, { skip: !id });
  const { data: feedback } = useGetRestaurantFeedbackQuery(id as string, { skip: !id });

  if (isLoading) return <div>Loading...</div>;
  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <p>📍 {restaurant.address}</p>
      <p>📞 {restaurant.phone}</p>

      {/* Photo Gallery */}
      <section>
        <h2>Photos</h2>
        <div className="row">
          {images?.map((img) => (
            <img key={img.id} src={img.url} alt={restaurant.name} />
          ))}
        </div>
      </section>

      {/* Menus */}
      <section>
        <h2>Menus</h2>
        {menus?.map((menu) => (
          <div key={menu.id}>
            <h3>{menu.name}</h3>
            {menu.pdf_url && <a href={menu.pdf_url}>View PDF</a>}
          </div>
        ))}
      </section>

      {/* Dishes */}
      <section>
        <h2>Our Dishes</h2>
        {plats?.map((plat) => (
          <div key={plat.id}>
            <h4>{plat.name}</h4>
            <p>{plat.description}</p>
            <p>{plat.price} MAD</p>
          </div>
        ))}
      </section>

      {/* Events */}
      <section>
        <h2>Upcoming Events</h2>
        {events?.map((event) => (
          <div key={event.id}>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
            <p>{new Date(event.event_date).toLocaleDateString()}</p>
          </div>
        ))}
      </section>

      {/* Reviews */}
      <section>
        <h2>Customer Reviews</h2>
        {feedback?.map((review) => (
          <div key={review.id}>
            <p>⭐ {review.rating}/5</p>
            <p>{review.comment}</p>
            <p>
              - {review.customer?.first_name} {review.customer?.last_name}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
```

---

## Reservations

### View My Reservations

```tsx
import { useGetMyReservationsQuery } from '@/store/api';

export default function MyReservations() {
  const { data: reservations, isLoading } = useGetMyReservationsQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>My Reservations</h1>
      {reservations?.map((reservation) => (
        <div key={reservation.id}>
          <h3>{reservation.restaurant?.name}</h3>
          <p>Date: {new Date(reservation.reservation_date).toLocaleString()}</p>
          <p>Party Size: {reservation.party_size}</p>
          <p>Status: {reservation.status}</p>
          {reservation.special_requests && (
            <p>Special Requests: {reservation.special_requests}</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Create Reservation

```tsx
import { useCreateReservationMutation } from '@/store/api';
import { useState } from 'react';

export default function ReservationForm({ restaurantId }: { restaurantId: string }) {
  const [createReservation, { isLoading }] = useCreateReservationMutation();
  
  const [formData, setFormData] = useState({
    reservation_date: '',
    party_size: 2,
    special_requests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createReservation({
        restaurant_id: restaurantId,
        ...formData,
      }).unwrap();
      
      alert('Reservation created successfully!');
    } catch (err) {
      console.error('Failed to create reservation:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="datetime-local"
        value={formData.reservation_date}
        onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
        required
      />
      
      <input
        type="number"
        min="1"
        value={formData.party_size}
        onChange={(e) => setFormData({ ...formData, party_size: parseInt(e.target.value) })}
        required
      />
      
      <textarea
        value={formData.special_requests}
        onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
        placeholder="Any special requests?"
      />
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Booking...' : 'Book Now'}
      </button>
    </form>
  );
}
```

---

## Feedback

### Leave a Review

```tsx
import { useCreateFeedbackMutation } from '@/store/api';
import { useState } from 'react';

export default function ReviewForm({ restaurantId }: { restaurantId: string }) {
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createFeedback({
        restaurant_id: restaurantId,
        rating,
        comment,
      }).unwrap();
      
      alert('Review submitted!');
      setComment('');
      setRating(5);
    } catch (err) {
      console.error('Failed to submit review:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
      </div>
      
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        required
      />
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
```

---

## Notifications

### Notification Bell with Unread Count

```tsx
import { useGetMyNotificationsQuery, useMarkNotificationAsSeenMutation } from '@/store/api';

export default function NotificationBell() {
  const { data: notifications } = useGetMyNotificationsQuery();
  const [markAsSeen] = useMarkNotificationAsSeenMutation();

  const unreadCount = notifications?.filter((n) => !n.is_seen).length || 0;

  const handleMarkAsSeen = async (id: string) => {
    try {
      await markAsSeen(id).unwrap();
      // UI automatically updates via optimistic update
    } catch (err) {
      console.error('Failed to mark as seen:', err);
    }
  };

  return (
    <div className="dropdown">
      <button className="btn">
        🔔 {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>

      <div className="dropdown-menu">
        {notifications?.map((notification) => (
          <div
            key={notification.id}
            className={notification.is_seen ? 'read' : 'unread'}
            onClick={() => !notification.is_seen && handleMarkAsSeen(notification.id)}
          >
            <p>{notification.message}</p>
            <small>{new Date(notification.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Contact Form

### Contact Us Page

```tsx
import { useSubmitContactMessageMutation } from '@/store/api';
import { useState } from 'react';

export default function ContactPage() {
  const [submitMessage, { isLoading, isSuccess }] = useSubmitContactMessageMutation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitMessage(formData).unwrap();
      // Reset form on success
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isSuccess && <div className="alert alert-success">Message sent successfully!</div>}

      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
      />

      <textarea
        placeholder="Your Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

---

## Advanced Features

### Polling (Auto-refresh data)

```tsx
// Poll notifications every 30 seconds
const { data: notifications } = useGetMyNotificationsQuery(undefined, {
  pollingInterval: 30000, // 30 seconds
});
```

### Conditional Fetching

```tsx
// Only fetch if user is authenticated
const { data: customer } = useGetCurrentCustomerQuery(undefined, {
  skip: !isAuthenticated,
});
```

### Refetch on Focus

```tsx
// Automatically refetch when window regains focus
const { data: restaurants } = useGetRestaurantsQuery(filters, {
  refetchOnFocus: true,
});
```

### Cache Time Configuration

```tsx
// Keep data in cache for 5 minutes
const { data } = useGetRestaurantsQuery(filters, {
  // Data stays fresh for 60 seconds, then becomes stale
  // Stale data can be used but will refetch in background
  refetchOnMountOrArgChange: 60,
});
```

---

## Best Practices

1. **Use Skip Option**: Don't fetch data if you don't need it yet
2. **Handle Loading States**: Always show loading indicators
3. **Handle Errors**: Display user-friendly error messages
4. **Optimistic Updates**: For better UX (already implemented in notifications)
5. **Cache Invalidation**: The API automatically handles cache invalidation via tags
6. **TypeScript**: Import types from `@/store/api/types` for better type safety

```tsx
import type { Restaurant, Customer } from '@/store/api/types';
```
