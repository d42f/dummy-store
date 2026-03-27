# Plan 03 — Login Page

Build the login screen at `src/pages/LoginPage.tsx` inside `PublicLayout`. The form talks to `POST /auth/login` via the `AuthProvider` and on success the router redirects to `/products` automatically (handled by `PublicRoute`).

## Form fields

Managed by **react-hook-form**. Three fields:

| Field        | Type     | Validation |
| ------------ | -------- | ---------- |
| `username`   | text     | required   |
| `password`   | password | required   |
| `rememberMe` | checkbox | —          |

On submit call `login({ username, password, rememberMe })` from `useAuth`. While the mutation is in-flight the submit button shows a loading state and the form is disabled. On error, display `error` from `useAuth` as an inline message above the submit button; it clears on the next submit attempt via `clearError()`.

## Shared form components

Extract reusable primitives under `src/components/`:

**`FormInput`** — labeled text/password input. Accepts a `label` string, all standard input props, an optional `error` message displayed below the field, and a `rightElement` slot. The password variant uses `rightElement` to render an eye icon toggle (SVG imported via svgr) that switches `type` between `password` and `text`.

**`Checkbox`** — labeled checkbox. Accepts `label` and standard checkbox props.

**`Button`** — base button component with `variant` prop (`primary` | `ghost`) and `isLoading` boolean that shows a spinner and disables interaction.

## Visual layout

Logo at the top (`src/components/Logo.tsx` renders the SVG logo). Below it a card/panel with a heading "Sign in to your account", then the form fields, then the submit button spanning full width. Keep the design minimal and clean using Tailwind utility classes.

## Icons

SVG icons live in `src/assets/icons/`. Import them as React components via svgr (`?react` suffix or configured transform). Icons needed for this screen: `eye.svg`, `eye-off.svg`, `lock.svg`, `user.svg`.

## API contract

```
POST /auth/login
Body: { username: string, password: string }
Response: { accessToken: string, refreshToken: string, id, username, email, firstName, lastName, image }
```

Test credentials from DummyJSON: `emilys` / `emilyspass`.
