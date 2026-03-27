# Plan 06 — Add Product Modal

Add a modal dialog for creating a new product. The "Add Product" button in the page header opens it. On successful submission the products list refreshes automatically via TanStack Query cache invalidation.

## Modal infrastructure (`src/components/Modal.tsx`)

Thin wrapper around **@radix-ui/react-dialog**. Exports `Modal` (root), `ModalTrigger`, `ModalContent`. `ModalContent` renders the Radix `Dialog.Content` inside a `Dialog.Portal` over a `Dialog.Overlay` backdrop. It accepts a `title` prop rendered as `Dialog.Title`. Include a close button (×) in the top-right corner using `Dialog.Close`. Animate overlay and content with Tailwind `data-[state=open]:animate-in data-[state=closed]:animate-out` utilities.

## AddProductModal (`src/pages/ProductsPage/components/AddProductModal.tsx`)

Controlled by a single `open` / `onOpenChange` prop pair owned by `ProductsPage`. The page holds `const [isAddOpen, setIsAddOpen] = useState(false)`.

### Form fields (react-hook-form)

| Field       | Type         | Validation    |
| ----------- | ------------ | ------------- |
| `title`     | text         | required      |
| `brand`     | text         | required      |
| `category`  | text         | required      |
| `price`     | number       | required, > 0 |
| `thumbnail` | image upload | optional      |

### Image upload (`src/components/ImageUpload.tsx`)

Custom file input that accepts images. Shows a placeholder with an image icon when empty; shows a preview of the selected image when filled. Internally uses a hidden `<input type="file" accept="image/*">` triggered by clicking the visible area. The selected file is stored in react-hook-form via `Controller` and converted to a base64 data URL for preview display.

### API call

```
POST /products/add
Authorization: Bearer <token>
Body: { title, brand, category, price, thumbnail? }
```

DummyJSON will return the created product with a fake `id`. The response does not actually persist — this is expected behavior for a demo API.

Use a TanStack Query `useMutation`. On success:

1. Call `queryClient.invalidateQueries({ queryKey: ['products'] })` to refetch the list.
2. Show a success toast via **sonner**: `toast.success('Product added')`.
3. Close the modal (`onOpenChange(false)`).
4. Reset the form.

On error show an error toast: `toast.error(err.message)`.

### UX details

- Submit button shows a loading spinner while the mutation is pending.
- The form resets when the modal closes (use `useEffect` watching `open`).
- The `useApiClient` hook (`src/hooks/useApiClient.ts`) returns a pre-bound `apiFetch` with the current `accessToken` injected — use it in the mutation fn instead of calling `apiFetch` directly.
