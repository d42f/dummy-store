# Dummy Store

A demo product catalog app with authentication.

Uses the [DummyJSON Products API](https://dummyjson.com/docs/products) as a data source.

## Stack

- **React 19** + **TypeScript** — UI and type safety
- **Vite** — build tool
- **Tailwind CSS** — styling
- **React Router 7** — routing
- **TanStack React Query** — server state and caching
- **React Hook Form** — forms and validation
- **Radix UI** — modal dialogs
- **Sonner** — toast notifications

## Features

- Authentication with token persistence in `localStorage` / `sessionStorage` (remember me option)
- Product table: name, brand, SKU, rating, price
- Debounced search
- Column sorting (name, price, rating)
- Pagination
- Add product via modal form with toast notification
- Search and sort state persisted in URL

## Getting started

```bash
npm install
npm run dev
```
