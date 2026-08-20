# MadFood Backend

This backend is built around the four supplied MadFood HTML pages and keeps their existing `/api/auth/login`, `/api/auth/register`, `/api/restaurants`, and `/api/menu` contracts.

## Included
- Node.js + Express
- MongoDB Atlas / MongoDB via Mongoose
- JWT authentication
- Customer, restaurant, delivery and admin roles
- Restaurant registration/approval
- Menu CRUD
- Orders and status tracking
- Delivery assignment
- Reviews/ratings
- Payments record layer (ready for Razorpay integration)
- Notifications
- OTP request/verify
- Admin dashboard APIs
- File upload middleware
- Health endpoint
- Supplied HTML pages served from `public/`

## 1. Install
```bash
npm install
```

## 2. Configure MongoDB
Copy `.env.example` to `.env` and put your real MongoDB Atlas connection string in `MONGODB_URI`.

Example:
`mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/madfood?retryWrites=true&w=majority`

If the password contains special characters, URL-encode it.

## 3. Seed demo data
```bash
npm run seed
```

Demo accounts:
- Admin: `admin@madfood.com` / value from `ADMIN_PASSWORD` (default `Admin@12345`)
- Restaurant: `demo.restaurant@madfood.com` / `Restaurant@123`
- Customer: register from the customer page
- Delivery: register from the partner page

## 4. Start
```bash
npm run dev
```
or
```bash
npm start
```

Open:
- `http://localhost:5000/newlogin.html`
- `http://localhost:5000/newone.html`
- `http://localhost:5000/Restaurant.html`
- `http://localhost:5000/admin1%20(1).html`
- `http://localhost:5000/api/health`

## Main API
### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`
- POST `/api/otp/request`
- POST `/api/otp/verify`

### Customer / Catalog
- GET `/api/restaurants`
- GET `/api/menu`
- GET `/api/menu/restaurant/:restaurantId`
- POST `/api/orders`
- GET `/api/orders`
- GET `/api/orders/:id`
- PATCH `/api/orders/:id/status`
- PATCH `/api/orders/:id/tracking`
- POST `/api/reviews`
- GET `/api/reviews/restaurant/:restaurantId`

### Restaurant
- GET `/api/restaurants/me`
- PUT `/api/restaurants/me`
- POST/PUT/DELETE `/api/menu...`

### Delivery
- GET `/api/delivery/available`
- PATCH `/api/delivery/:id/accept`
- PATCH `/api/delivery/:id/status`

### Admin
- GET `/api/admin/dashboard`
- GET `/api/admin/users`
- GET `/api/admin/restaurants`
- PATCH `/api/admin/restaurants/:id`
- GET `/api/admin/orders`

### Payments / Notifications
- POST/GET/PATCH `/api/payments`
- GET `/api/notifications`
- PATCH `/api/notifications/:id/read`

## Important
The current HTML pages still contain a lot of browser-local demo/runtime state. This backend supplies the persistent server-side API, but to make *every* UI button use MongoDB instead of localStorage, the page JavaScript must be migrated endpoint-by-endpoint. The supplied pages are included unchanged so you can test the existing integration first.

Do not commit `.env` or real payment/database secrets to GitHub.
