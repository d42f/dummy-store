# Plan 01 — Project Setup

Scaffold a React + TypeScript SPA with Vite. Use the following stack exactly:

- **React 19** with TypeScript strict mode
- **Vite** as the build tool with `@vitejs/plugin-react` and `vite-plugin-svgr` (for SVG imports as React components)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no config file needed, import in `src/index.css` with `@import "tailwindcss"`)
- **React Router v7** for client-side routing
- **TanStack Query v5** (`@tanstack/react-query`) for server state, with `ReactQueryDevtools` mounted in dev only
- **react-hook-form** for form state management
- **@radix-ui/react-dialog** for accessible modal primitives
- **sonner** for toast notifications
- **clsx** + **tailwind-merge** — combine into a single `cn` utility at `src/lib/cn.ts`
- **Prettier** with `prettier-plugin-tailwindcss` for class sorting, **ESLint** with `eslint-plugin-simple-import-sort`, **Husky** + **lint-staged** + **commitlint** (conventional commits) for pre-commit enforcement

## Path aliases

Configure `@` to resolve to `src/` in both `vite.config.ts` and `tsconfig.app.json`.

```ts
// vite.config.ts
resolve: { aliases: { '@': '/src' } }

// tsconfig.app.json
"paths": { "@/*": ["./src/*"] }
```

## Environment variables

Create `.env.example` with:

```
VITE_API_BASE_URL=https://dummyjson.com
VITE_AUTH_STORAGE_KEY=auth_token
```

The app talks to the public **DummyJSON** API (`https://dummyjson.com`). All API requests go through `src/lib/apiFetch.ts` — a thin `fetch` wrapper that sets `Content-Type: application/json`, attaches `Authorization: Bearer <token>` when a token is provided, and throws on non-2xx responses. URL construction lives in `src/lib/apiUrl.ts` — it prefixes `VITE_API_BASE_URL` and serialises an optional params object into a query string, skipping `undefined` values.

## Entry point

`src/main.tsx` renders `<App />` wrapped in `<QueryClientProvider>` and `<AuthProvider>` (to be created later). `<ReactQueryDevtools>` goes inside the provider, visible only in dev.

## Deliverable

Running `npm run dev` should start the dev server with no errors. `npm run build` should produce a clean production bundle.
