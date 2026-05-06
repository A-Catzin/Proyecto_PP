# Tasks: UI Shell Inicial

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~315 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Foundation (types + CSS) | PR 1 | Independent, no deps |
| 2 | Layout components | PR 1 | After types ready |
| 3 | Integration + Landing | PR 1 | After components done |
| 4 | Documentation | PR 1 | Last, non-blocking |
→ Single PR works; 315 lines under 400 budget.

## Phase 1: Foundation

- [x] 1.1 Create `types/roles.ts` — export `type Role = 'public' | 'alumno' | 'institucion' | 'admin'`
- [x] 1.2 Create `types/navigation.ts` — export `interface NavItem { label: string; href: string }`
- [x] 1.3 Clean `app/globals.css` — remove `@media (prefers-color-scheme: dark)`, remove `--background`/`--foreground` vars, set `body` bg `var(--color-gray-50)` text `var(--color-gray-900)`, keep `--font-sans`/`--font-mono` via `@theme inline`

## Phase 2: Layout Components

- [x] 2.1 Create `components/layout/Logo.tsx` — Server Component, app name in `text-indigo-900`, `<Link href="/">`
- [x] 2.2 Create `components/layout/NavLinks.tsx` — Client Component, `NAV_ITEMS` map per Role, `usePathname()` for active tab with `border-b-4 border-indigo-900`
- [x] 2.3 Create `components/layout/UserMenu.tsx` — Client Component, `<select>` with 4 roles, `onRoleChange` prop, `// TODO: Replace with Supabase auth`
- [x] 2.4 Create `components/layout/Navbar.tsx` — Client Component, `useState<Role>('public')`, renders Logo + NavLinks + UserMenu in flex row, `bg-white border-b border-gray-200`

## Phase 3: Integration

- [x] 3.1 Update `app/layout.tsx` — set `lang="es"`, Spanish metadata, import Navbar, wrap `{children}` in `<main>` with `bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`
- [x] 3.2 Replace `app/page.tsx` — institutional landing: title, description, CTA buttons following design tokens (`bg-indigo-900`, cards `bg-white shadow-sm rounded-lg`)

## Phase 4: Documentation

- [x] 4.1 Create `docs/ui_componentes.md` — document color tokens, typography, component conventions, layout rules per the design system spec
