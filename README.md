# Quick Mart Angular Application

**[Live Website Link](https://quick-mart-2.netlify.app/home)**

## Overview

This application is a shopping platform built using Angular. It includes a robust authentication system, route guards for protected pages, and a dynamic navigation experience. Below is a detailed overview of the features implemented.

## Features

### 1. **Authentication System**

- **Login and Logout**:

  - Users can log in using their credentials (email or username with a password).
  - Logged-in users are redirected to the page they attempted to access before logging in or to the default `/home` page.
  - On logout, users are redirected to the login page if they were on a protected page, otherwise they remain on unprotected pages.

- **Register**:

  - Users can register a new account by navigating to the `/auth/register` page.

- **LocalStorage Integration**:

  - Login credentials are stored in `localStorage` to persist the session across browser refreshes.

- **Reactive Observables**:
  - `BehaviorSubject` is used to keep track of the user's authentication state in real-time.
  - `isAuthenticated$` observable streams are used to dynamically update the UI or handle authentication-related logic.

### 2. **Route Guards**

- **`AuthGuard`**:

  - Protects routes from unauthorized access.
  - Redirects unauthenticated users to the `/auth/login` page, with the attempted route stored as a `returnUrl` query parameter.

- **`ReverseAuthGuard`**:
  - Prevents logged-in users from accessing login and registration pages (e.g., `/auth/login`, `/auth/register`).
  - Redirects authenticated users to the `/home` page if they attempt to access these routes.

### 3. **Dynamic Routing and Redirection**

- **Return to Last Attempted Page**:

  - Users are redirected to the page they attempted to access after successfully logging in.
  - Implemented using the `queryParams` property to capture and handle `returnUrl`.

- **Logout Handling**:
  - If the user logs out while on a protected route, they are redirected to the login page.
  - If the user logs out on an unprotected route, they stay on the same page.

### 4. **Error Handling and Notifications**

- **Toast Notifications**:
  - Success and error messages are displayed using a toast service.
  - Notifications include messages for successful login, logout, and invalid login attempts.

### 5. **Page Protection**

- **Protected Pages**:

  - Routes such as `/cart/checkout` and `/cart/payment-success` are only accessible to authenticated users.

- **Unprotected Pages**:
  - Routes like `/products` are accessible without logging in.
  - Refreshing these pages will not redirect to the login page unless explicitly required.

### 6. **State Management**

- **Centralized State for Authentication**:
  - The `AuthService` manages the application's authentication state.
  - Reactive state updates ensure the application reflects the correct authentication state dynamically.

### 7. **Routing and Navigation**

- **Navigation Behavior**:
  - Pages like `/auth/register` and `/auth/login` are freely accessible to unauthenticated users.
  - Attempting to access protected pages without authentication redirects to the login page.

### 8. **Miscellaneous Improvements**

- **Code Reusability**:

  - Shared logic for route protection and redirection.

- **URL Parsing**:
  - Dynamic checks for `protectedRoutes` in the `AuthService` to handle navigation decisions based on the current route.

### 9. **UI Integration**

- **Dynamic Toast Component**:
  - A reusable `ToastComponent` is integrated with the `ToastService` for consistent UI notifications.

## Installation and Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
