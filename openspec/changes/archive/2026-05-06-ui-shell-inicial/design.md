# Design: UI Shell Inicial

## Technical Approach

**Modular client-driven shell** — four standalone layout components in `components/layout/`, orchestrated by a Client Component `Navbar` that owns the role simulation state. This mirrors the clean separation needed for real Supabase auth later: a single state-holder component that passes `role` down to navigation and user-menu children. `app/layout.tsx` stays a Server Component — it renders `Navbar` + a styled `<main>` container for `{children}`, nothing more.

## Architecture Decisions

### AD-1: Component file structure

| Choice | Alternative | Rationale |
|--------|-------------|-----------|
| `components/layout/` with 4 files (Navbar, Logo, NavLinks, UserMenu) | All in `app/layout.tsx` (monolithic) | Monolithic mixes concerns and blocks testing. 4 files give clear boundaries: Logo is pure presentational, NavLinks owns routing logic, UserMenu owns interaction, Navbar owns state. |

### AD-2: Server vs Client boundary

| Component | Type | Why |
|-----------|------|-----|
| `layout.tsx` | Server | Static shell, no interactivity |
| `Navbar.tsx` | **Client** | Owns `useState<Role>` for simulator state |
| `Logo.tsx` | Server | Pure presentational — `'use client'` unnecessary |
| `NavLinks.tsx` | Client | Needs `usePathname()` for active-tab detection |
| `UserMenu.tsx` | Client | `<select>` onChange handler requires client JS |

**Decision**: Navbar IS a Client Component. The alternative (Server Navbar with role state lifted to layout) is impossible — `layout.tsx` can't hold React state. Making Navbar the state owner keeps the boundary clean: layout is pure shell, Navbar is the interactive root.

### AD-3: Role simulation mechanism

| Choice | Alternative | Rationale |
|--------|-------------|-----------|
| `useState<Role>('public')` in Navbar, passed as props | URL search params or cookies (Server-side) | useState avoids page reloads and keeps all simulator logic in one file. URL-based would require full re-render and leak dev concerns into the URL. |

All simulator code is marked with `// TODO: Replace with Supabase auth` — grep-able and self-documenting.

### AD-4: Tailwind v4 conventions

| Choice | Alternative | Rationale |
|--------|-------------|-----------|
| Direct utility classes (`bg-indigo-900`, `text-gray-500`) | `@theme` semantic aliases (`--color-primary`) | Tailwind v4 ships every standard color as a CSS variable. Aliases add indirection without benefit — the color tokens are already self-documenting class names. Only `--font-sans` and `--font-mono` need `@theme inline` registration for Next.js font variables. |

## Data Flow

```
UserMenu (Client)                   Logo (Server)
  │ onChange → setRole(newRole)       │ static display
  ▼                                   │
Navbar (Client) ◄─────────────────────┘
  │ useState<Role>('public')
  │ prop: role
  ▼
NavLinks (Client)
  │ reads NAV_ITEMS[role]
  │ usePathname() → active tab detection
  ▼
<Link> elements with conditional border-b-4 border-indigo-900
```

Role state is entirely local to `Navbar`. No context, no prop drilling beyond one level.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `app/globals.css` | Modify | Remove dark mode `@media` block, remove `--color-background`/`--color-foreground` vars, set `body` bg to `var(--color-gray-50)` with `var(--color-gray-900)` text |
| `app/layout.tsx` | Modify | Set `lang="es"`, metadata in Spanish, add `<Navbar />` and `<main>` container, import Navbar |
| `app/page.tsx` | Replace | Institutional landing: title, description, CTA buttons, following design system conventions |
| `components/layout/Navbar.tsx` | Create | Client, `useState<Role>`, renders Logo + NavLinks + UserMenu in flex row |
| `components/layout/NavLinks.tsx` | Create | Client, role-based tab array via `NAV_ITEMS` record, `usePathname()` for active detection |
| `components/layout/Logo.tsx` | Create | Server, app name in indigo-900, links to `/` |
| `components/layout/UserMenu.tsx` | Create | Client, `<select>` with 4 role options, passes `onRoleChange` callback |
| `types/roles.ts` | Create | `export type Role = 'public' \| 'alumno' \| 'institucion' \| 'admin'` |
| `docs/ui_componentes.md` | Create | Design tokens, component conventions, layout rules |

## Interfaces

```typescript
// types/roles.ts
export type Role = 'public' | 'alumno' | 'institucion' | 'admin';

// NavLinks props (inferred, no separate interface needed)
interface NavLinksProps {
  role: Role;
}

// UserMenu props
interface UserMenuProps {
  role: Role;
  onRoleChange: (role: Role) => void;
}
```

`NAV_ITEMS` record lives in `NavLinks.tsx` — no separate navigation config file needed at this stage.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual | Navbar renders all 4 role variants, active tab highlight, mobile layout | Manual verification: `npm run dev`, cycle through roles |
| Build | `npm run build` succeeds with zero errors | CI gate |

No test framework installed yet (`npm ls` confirms no vitest/jest). Testing scaffolding is deferred to a future change. Manual verification against the 7 success criteria in the proposal is the validation method for this phase.

## Migration / Rollout

No migration required. All changes are additive (new `components/layout/`, new `types/`) or confined to `app/` files that have no downstream consumers. Rollback: `git revert`.

## Open Questions

- **Responsive hamburger menu**: The spec requires mobile NavLinks to "collapse into a hamburger menu or horizontally scrollable tabs." Which pattern? Tentative answer: horizontal scroll with `overflow-x-auto` for MVP simplicity — full hamburger with animation is a future enhancement.
- **Landing page content source**: Should the institutional welcome text be hardcoded (current plan) or come from a CMS/stub API? Hardcoded for this initial shell — content management is out of scope.
