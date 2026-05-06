## Exploration: ui-shell-inicial — Initial UI Shell for Plataforma Integral de Prácticas Profesionales

### Current State

**Scaffold**: Fresh `create-next-app` with Next.js 16.2.4, React 19.2.4, Tailwind CSS 4.2.4, TypeScript 5, and the `@tailwindcss/postcss` plugin.

**Files present**:
- `app/layout.tsx` — Root layout with Geist fonts, basic `<html>`/`<body>`, `flex flex-col` min-h-full. Still has `lang="en"` and default `Create Next App` metadata.
- `app/page.tsx` — Default "To get started, edit page.tsx" template. Contains `dark:` classes (not in spec).
- `app/globals.css` — Tailwind v4 `@import "tailwindcss"`, `@theme inline` block for background/foreground/font vars, dark mode `@media` block (not in spec).
- `postcss.config.mjs` — Standard v4 PostCSS plugin setup.

**Missing**:
- No `components/` directory
- No `docs/` directory (required by context.md §7)
- No route structure (only `/`)
- No auth integration
- Navbar, role-based navigation, institutional theme not applied yet

### Affected Areas

- `app/layout.tsx` — Root layout: add Navbar, update metadata, set lang to "es", remove dark mode references, apply institutional design
- `app/globals.css` — Strip dark mode `@media`, configure `@theme` for design tokens, add base styles for body
- `app/page.tsx` — Replace boilerplate with Landing Page placeholder (public role view)
- `components/layout/Navbar.tsx` — **New**: Client component, main navigation bar
- `components/layout/NavLinks.tsx` — **New**: Client component, centered nav tabs with active state via `usePathname()`
- `components/layout/UserMenu.tsx` — **New**: Client component, user profile / login button right side
- `components/layout/Logo.tsx` — **New**: Server component, logo/title left side
- `docs/ui_componentes.md` — **New**: Document layout rules, component structure, design tokens
- `postcss.config.mjs` — No changes needed (already correct)

### Tailwind v4 Configuration Analysis

**Colors are built-in** — no `@theme` declarations needed for the standard palette:
| Token | Built-in? | Class examples |
|-------|-----------|----------------|
| `indigo-900` | ✅ `--color-indigo-900: oklch(35.9% 0.144 278.697)` | `bg-indigo-900`, `text-indigo-900`, `border-indigo-900` |
| `purple-600` | ✅ `--color-purple-600: oklch(55.8% 0.288 302.321)` | `bg-purple-600`, `hover:bg-purple-600` |
| `fuchsia-700` | ✅ `--color-fuchsia-700: oklch(51.8% 0.253 323.949)` | `text-fuchsia-700` |
| `gray-50/500/900` | ✅ Full gray scale | `bg-gray-50`, `text-gray-500`, `text-gray-900` |
| `gray-200` | ✅ | `border-gray-200` |
| `red-600` | ✅ | `text-red-600` |
| `white` | ✅ | `bg-white` |

**Recommendation**: No custom `@theme` extensions needed for colors. The current `globals.css` should be simplified:
- Remove `@media (prefers-color-scheme: dark)` block
- Keep `@theme inline` for font variables (Geist)
- Optionally add semantic aliases like `--color-primary: var(--color-indigo-900)` for maintainability, but **not required** since classes like `bg-indigo-900` work directly.

### Component Architecture Plan

```
app/
├── layout.tsx          ← Server Component (root layout)
│                        imports: Navbar from @/components/layout/Navbar
│                        wraps: children in main content area with container
├── page.tsx            ← Landing Page (public, role placeholder)
├── globals.css         ← Tailwind v4 imports + institutional base styles
└── (auth)/
    └── (alumno)/       ← Route group for student panel
    └── (institucion)/  ← Route group for institution panel
    └── (admin)/        ← Route group for admin panel

components/
└── layout/
    ├── Navbar.tsx      ← 'use client' — orchestrates Logo, NavLinks, UserMenu
    ├── Logo.tsx        ← Server Component — app logo/name
    ├── NavLinks.tsx    ← 'use client' — role-based tabs, usePathname() for active
    └── UserMenu.tsx    ← 'use client' — profile icon / login button
```

**Server vs Client split**:
| Component | Type | Reason |
|-----------|------|--------|
| `layout.tsx` | **Server** | Static shell, no interactivity needed |
| `Navbar.tsx` | **Client** | May wrap interactive children, but could be Server if children handle their own interactivity |
| `Logo.tsx` | **Server** | Pure presentational |
| `NavLinks.tsx` | **Client** | Needs `usePathname()` for active tab detection |
| `UserMenu.tsx` | **Client** | Interactive dropdown (eventual auth) |

**Key insight**: NavLinks MUST be a Client Component because layouts do NOT re-render on navigation, so you can't determine the active link server-side. `usePathname()` is the canonical approach.

### Role-Based Navigation Approach

**Recommended: Static simulation** for the initial shell.

The Navbar will accept a `role` prop (or read from a simple context) to conditionally render tabs:

| Role | Tabs |
|------|------|
| `public` (no session) | Inicio, Programas, Normativa, FAQ |
| `alumno` | Dashboard, Perfil, Buscar Plazas, Reportes, Descargas |
| `institucion` | Dashboard, Perfil, Publicar Vacantes, Postulantes |
| `admin` | Dashboard, Usuarios, Validaciones, Reportes |

For the initial shell, simulate with a hard-coded `role` variable in the layout — trivially replaceable later with real Supabase auth.

**Implementation pattern**:
```tsx
// NavLinks.tsx
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NAV_ITEMS: Record<string, Array<{label: string, href: string}>> = {
  public: [
    { label: 'Inicio', href: '/' },
    { label: 'Programas', href: '/programas' },
    { label: 'Normativa', href: '/normativa' },
    { label: 'FAQ', href: '/faq' },
  ],
  alumno: [
    { label: 'Dashboard', href: '/alumno' },
    { label: 'Perfil', href: '/alumno/perfil' },
    { label: 'Buscar Plazas', href: '/alumno/plazas' },
    { label: 'Reportes', href: '/alumno/reportes' },
    { label: 'Descargas', href: '/alumno/descargas' },
  ],
  // ... institucion, admin
}

export default function NavLinks({ role }: { role: string }) {
  const pathname = usePathname()
  const items = NAV_ITEMS[role] ?? NAV_ITEMS.public
  return (
    <nav className="flex gap-8">
      {items.map(item => (
        <Link key={item.href} href={item.href}
          className={`... ${pathname === item.href ? 'border-b-4 border-indigo-900 text-indigo-900' : 'text-gray-500'}`}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
```

### Layout Design (from context.md)

```
┌─────────────────────────────────────────────────────┐
│  [Logo]     [Inicio] [Programas] [Normativa]    [👤] │  ← White bg, bottom border
│  indigo-900  ← active: border-b-4 border-indigo-900  │
├─────────────────────────────────────────────────────┤
│                     ┌───────────┐                    │
│                     │  Content  │                    │  ← max-w-7xl mx-auto px-4
│                     │  bg-white │                       sm:px-6 lg:px-8 py-8
│                     │  rounded-lg│
│                     │  shadow-sm │
│                     └───────────┘                    │
│  Background: bg-gray-50                              │
└─────────────────────────────────────────────────────┘
```

### Documentation Plan

Per context.md §7, create and maintain `/docs/`:
```
docs/
├── ui_componentes.md   ← Layout rules, Navbar, design tokens, component decisions
├── base_de_datos.md    ← (future) Schema, RLS, triggers
├── autenticacion.md    ← (future) Auth flow, roles, route protection
└── flujo_registro.md   ← (future) State machine for registration process
```

Initial focus: `docs/ui_componentes.md` documenting the shell decisions.

### Approaches

1. **Approach A: Monolithic layout component** — Navbar lives entirely inside `app/layout.tsx`
   - Pros: Simplest, fewest files
   - Cons: Mixed concerns, hard to test, hard to swap role logic
   - Effort: Low

2. **Approach B: Modular component split** (recommended) — Separate Navbar, NavLinks, Logo, UserMenu as standalone components in `components/layout/`
   - Pros: Clean separation, easy to test, easy to swap auth strategy later, follows atomic/container-presentational
   - Cons: More files upfront, imports needed
   - Effort: Medium

3. **Approach C: Modular + route groups** — Same as B but with route groups `(public)/`, `(alumno)/`, `(institucion)/`, `(admin)/` each with their own layout
   - Pros: Cleaner URL structure, each role gets its own layout scope
   - Cons: Overkill for initial shell, full-page reloads crossing root layouts, auth-gating needed
   - Effort: Medium-High

### Recommendation

**Approach B** (Modular component split) as the primary structure, with **simulated role state** passed through from `layout.tsx`. This gives us:
- The exact component architecture we'll need when real auth lands
- Clean file structure ready for route groups later
- No unnecessary complexity in the initial shell
- Easy to verify the 4 role views visually

### Risks

1. **No auth integration yet** → Role simulation is a temporary pattern that MUST be replaced. Document clearly that this is mock data.
2. **Tailwind v4 migration gotchas** — The current scaffold has a `@theme inline` block instead of plain `@theme`. Need to verify if `inline` is correct for our use case (yes, it's fine — `@theme inline` generates CSS variables inline without `var()` fallbacks).
3. **Dark mode remnants** — Need to thoroughly remove `dark:` classes from `page.tsx` and `@media (prefers-color-scheme: dark)` from `globals.css` per spec requirement.
4. **Geist fonts** — Not required by spec but present from scaffold. Low risk to keep them, but if institutional branding requires different fonts, they should be changed now.

### Ready for Proposal
Yes — clear picture of what exists, what to build, and the modular approach. Recommend proceeding to `sdd-propose`.
