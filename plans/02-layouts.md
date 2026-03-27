# Plan 02 — Layouts & Routing Shell

Build the routing skeleton with two layouts — public and private — and wire up route guards so the app always lands in the right place.

## Route structure

All routes are wrapped in a single `<AuthGuard>` that suspends rendering until auth state is resolved (prevents flash of wrong screen). Inside it:

```
/login       → PublicRoute  → PublicLayout  → (LoginPage placeholder)
/products    → PrivateRoute → MainLayout    → (ProductsPage placeholder)
*            → redirect to /login
```

## AuthGuard (`src/router/AuthGuard.tsx`)

Reads `isPending` from `useAuth`. Returns `null` while pending, otherwise renders `<Outlet />`. This is the only place where the loading gate lives — no spinners elsewhere in routing.

## PublicRoute (`src/router/PublicRoute.tsx`)

If `isAuthenticated` is true, redirect to `/products`. Otherwise render `<Outlet />`.

## PrivateRoute (`src/router/PrivateRoute.tsx`)

If `isAuthenticated` is false, redirect to `/login`. Otherwise render `<Outlet />`.

## PublicLayout (`src/layouts/PublicLayout.tsx`)

Centered single-column layout for unauthenticated screens. Renders `<Outlet />` in the middle of the viewport. No header or nav.

## MainLayout (`src/layouts/MainLayout.tsx`)

Authenticated shell. Has a top header bar with the app logo on the left and a logout button on the right. Calls `logout()` from `useAuth` on click. Renders `<Outlet />` in a `<main>` below the header. The header uses `bg-white` with a bottom border and `sticky top-0 z-10` to stay visible on scroll.

## Auth context (`src/context/Auth/`)

`AuthContext.ts` — defines `AuthUser` shape and `AuthContextValue` interface:

- `user: AuthUser | null`
- `accessToken: string | null`
- `isAuthenticated: boolean`
- `isPending: boolean`
- `error: string | null`
- `login(args): Promise<void>`
- `logout(): void`
- `clearError(): void`

`AuthProvider.tsx` — on mount, reads a stored token from `localStorage` or `sessionStorage` using `VITE_AUTH_STORAGE_KEY`. If a token exists, it immediately fires a TanStack Query to `GET /auth/me` to rehydrate the user. While that query is in-flight, `isPending` is `true`. If the query fails, the token is removed. Token persistence: `rememberMe: true` → `localStorage`, `false` → `sessionStorage`.

`useAuth` hook at `src/hooks/useAuth.ts` — reads `AuthContext`, throws if used outside provider.

At this stage both page slots can render simple placeholder text. The deliverable is a working routing shell where navigating to `/` redirects appropriately and the layouts render.
