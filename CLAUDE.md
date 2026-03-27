# Dummy Store — Project Guide

Demo SPA: an authenticated product catalog backed by the [DummyJSON API](https://dummyjson.com).

## Stack

| Layer        | Library                                                                            |
| ------------ | ---------------------------------------------------------------------------------- |
| UI           | React 19, TypeScript strict                                                        |
| Build        | Vite + `@vitejs/plugin-react`, `vite-plugin-svgr`                                  |
| Styling      | Tailwind CSS v4 (imported via `@tailwindcss/vite`, no config file)                 |
| Routing      | React Router v7                                                                    |
| Server state | TanStack Query v5                                                                  |
| Forms        | react-hook-form                                                                    |
| Modals       | @radix-ui/react-dialog                                                             |
| Toasts       | sonner                                                                             |
| Utilities    | clsx + tailwind-merge → `src/lib/cn.ts`                                            |
| Lint/format  | ESLint, Prettier + `prettier-plugin-tailwindcss`, Husky, commitlint (conventional) |

Path alias: `@` → `src/`

## Environment variables

```
VITE_API_BASE_URL=https://dummyjson.com
VITE_AUTH_STORAGE_KEY=auth_token
```

## Key architecture decisions

- All fetch logic goes through `src/lib/apiFetch.ts` (thin wrapper: JSON headers, Bearer token, throws on non-2xx).
- URL construction via `src/lib/apiUrl.ts` (prefixes `VITE_API_BASE_URL`, serialises params, skips `undefined`).
- Auth state lives in `AuthProvider` + `AuthContext`. Token stored in `localStorage` (remember me) or `sessionStorage`. On mount, the provider rehydrates from the stored token via `GET /auth/me`.
- Route guards: `AuthGuard` (blocks render until auth resolves) → `PublicRoute` (redirects authenticated users) / `PrivateRoute` (redirects unauthenticated users).
- Products page state managed with `useReducer` (search, debouncedSearch, page, sortBy, sortOrder). Search is debounced 500 ms before hitting the API.
- SVG icons in `src/assets/icons/` imported as React components via svgr (`?react`).

## Source layout

```
src/
  assets/icons/       SVG icons
  components/         Shared UI (Button, FormInput, Checkbox, Modal, Pagination, ImageUpload, Logo, CloseButton)
  context/Auth/       AuthContext, AuthProvider, index
  entities/product/   Product + ProductsResponse types
  hooks/              useAuth, useApiClient
  layouts/            MainLayout (authed), PublicLayout (unauthed)
  lib/                apiFetch, apiUrl, cn
  pages/
    LoginPage.tsx
    ProductsPage/     ProductsPage, model, api, components/
  router/             AuthGuard, PrivateRoute, PublicRoute
  App.tsx
  main.tsx
```

## Implementation plans

The project was built in six stages. Each plan is a self-contained prompt that describes one stage in enough detail to rebuild it from scratch.

- [01-setup.md](plans/01-setup.md) — Vite scaffold, dependencies, aliases, env vars, API utilities ✓
- [02-layouts.md](plans/02-layouts.md) — Routing shell, AuthGuard, layouts, AuthProvider ✓
- [03-login.md](plans/03-login.md) — Login page, shared form components, auth flow ✓
- [04-products-table.md](plans/04-products-table.md) — Products page, state model, data fetching, table, pagination ✓
- [05-sort-filter.md](plans/05-sort-filter.md) — Column sorting, debounced search, loading/empty states ✓
- [06-add-product-modal.md](plans/06-add-product-modal.md) — Add product modal, image upload, mutation + cache invalidation ✓
