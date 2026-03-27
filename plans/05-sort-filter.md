# Plan 05 — Sorting & Search Filtering

Extend the products table from Plan 04 with interactive column sorting and debounced search filtering. No new files needed — wire up the existing state model and UI components.

## Column sorting

Sortable columns: **Title**, **Price**, **Rating**. Non-sortable: Thumbnail, Brand, Category, SKU.

**`SortableHeader`** component receives:

- `field: SortField`
- `currentSortBy: SortField`
- `currentOrder: SortOrder`
- `onSort: (field: SortField) => void`

Clicking the header dispatches `{ type: 'SORT', field }` to the reducer. The reducer toggles order if the same field is active, or resets to `asc` on a new field and resets `page` to 1.

Sort indicator: show an up-arrow SVG icon (`sort-asc.svg`). When the column is active and order is `desc`, flip the icon with `rotate-180` Tailwind class. When the column is inactive, show the icon at reduced opacity. The icon is always visible (not hidden when inactive) so the column header width stays stable.

## Search filtering

The search input in the toolbar is a controlled `<input>` bound to `state.search`. On every keystroke dispatch `SET_SEARCH`. Use `useEffect` with a 500 ms `setTimeout` to dispatch `COMMIT_SEARCH` after the user stops typing — clear the timeout on each new keystroke. `COMMIT_SEARCH` copies `state.search` into `state.debouncedSearch` and resets `page` to 1.

The query uses `debouncedSearch` (not the live `search`) so the API is only called after the user pauses.

When `search` is non-empty, the API switches from `/products` to `/products/search?q=<debouncedSearch>`. The same `sortBy`, `order`, `limit`, `skip` params apply to both endpoints.

## Loading state

While a new page or search result is loading, `useProductsQuery` returns the previous data via `placeholderData`. Apply `opacity-50 pointer-events-none` to the table body during this transition so the user gets visual feedback without a layout shift. Check `isFetching && !isLoading` to detect this state.

## Empty state

If `data.products` is empty (no results), show a centered message inside the table body: "No products found." spanning all columns.
