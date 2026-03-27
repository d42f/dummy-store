# Plan 04 — Products Table with Pagination

Build the main authenticated screen at `src/pages/ProductsPage/`. It displays a paginated table of products fetched from the DummyJSON API.

## File structure

```
src/pages/ProductsPage/
  ProductsPage.tsx       — page root, holds all state via useReducer
  model.ts               — State type, Action union, reducer, initialState
  api.ts                 — useProductsQuery hook
  index.ts               — re-export ProductsPage
  components/
    ProductsTable/
      ProductsTable.tsx  — table shell, thead + tbody
      ProductRow.tsx     — single <tr> for one product
      SortableHeader.tsx — <th> with sort indicator
      index.ts           — re-exports
```

## State model (`model.ts`)

```ts
type State = {
  search: string; // live input value
  debouncedSearch: string; // committed after debounce
  page: number;
  sortBy: SortField; // 'title' | 'price' | 'rating'
  sortOrder: SortOrder; // 'asc' | 'desc'
};
```

Actions: `SET_SEARCH`, `COMMIT_SEARCH` (copies `search` → `debouncedSearch`, resets page to 1), `SET_PAGE`, `SORT` (toggles order if same field, resets to asc + page 1 on new field).

## Data fetching (`api.ts`)

Single `useProductsQuery` hook using TanStack Query. Query key includes all params so each unique combination is cached independently. Uses `placeholderData: prev => prev` to keep the previous page visible while the next loads (no content flash).

URL logic: if `search` is non-empty use `/products/search?q=...`, otherwise use `/products`. Both endpoints accept `limit`, `skip`, `sortBy`, `order` query params.

```
GET /products?limit=10&skip=0&sortBy=title&order=asc
GET /products/search?q=phone&limit=10&skip=0&sortBy=price&order=desc
```

Response shape: `{ products: Product[], total: number, skip: number, limit: number }`.

## Product entity (`src/entities/product/model.ts`)

```ts
interface Product {
  id: number;
  title: string;
  category: string;
  brand: string;
  sku: string;
  rating: number;
  price: number;
  thumbnail: string;
}
```

## Table columns

`thumbnail` (image), `title`, `brand`, `category`, `sku`, `price`, `rating`. Thumbnail renders a small `<img>` with rounded corners. Price formatted as `$X.XX`. Rating to one decimal place.

## Pagination component (`src/components/Pagination.tsx`)

Accepts `page`, `total`, `limit`, `onPageChange`. Renders prev/next buttons with chevron SVG icons and a "Page X of Y" label in between. Buttons are disabled at boundaries.

## Page layout

Header row with the page title "Products" on the left and an "Add Product" button (+ icon) on the right. Below: a toolbar with a search input. Below that: the table. Below that: the pagination bar aligned to the right.

Page size is fixed at **10** items per page.
