# Proposal: UI Shell Inicial

## Intent

First change for Plataforma Integral de Prácticas Profesionales — establish the institutional visual identity and navigation shell before any feature work begins. Replaces the CNA boilerplate with branded UI, role-simulated navbar, and a public landing page. Foundation that every subsequent change builds on.

## Scope

### In Scope
1. Root layout with institutional design (indigo-900, bg-gray-50, Geist fonts, no dark mode, `lang="es"`)
2. Navbar with Logo, NavLinks (role-conditional, active-tab detection), UserMenu — in `components/layout/`
3. Clean `app/globals.css` (remove dark mode `@media`, strip CNA cruft)
4. Landing page redesign in `app/page.tsx` (institutional welcome)
5. Role simulator (dropdown to switch between public, alumno, institucion, admin)
6. Documentation: `docs/ui_componentes.md`

### Out of Scope
- Supabase integration / real auth
- Backend API routes
- Database setup
- Role-specific dashboards (only public landing + navbar for now)
- Dark mode support
- SEO beyond basic metadata

## Capabilities

### New Capabilities
- `layout-base`: Root layout structure, responsive navbar, container system (`max-w-7xl` + padding), role simulation foundation
- `ui-design-system`: Tailwind v4 theme contract — color palette (indigo-900 primary, purple-600/fuchsia-700 accents, gray-50/white surfaces, gray-200 borders, red-600 alerts), typography (Geist), component conventions (`shadow-sm rounded-lg` cards), no-dark-mode constraint

### Modified Capabilities
None — no existing specs to modify.

## Approach

**Modular component split** (Approach B from exploration). Four standalone layout components in `components/layout/`:

| Component | Type | Responsibility |
|-----------|------|----------------|
| `Navbar.tsx` | Server | Orchestrates Logo, NavLinks, UserMenu; white bg, `border-b border-gray-200` |
| `Logo.tsx` | Server | App name in indigo-900 |
| `NavLinks.tsx` | Client | Role-based tabs via `usePathname()` for active detection |
| `UserMenu.tsx` | Client | Profile icon placeholder, role dropdown |

Static role simulation via prop: `layout.tsx` holds a `simulatedRole` variable, passes to Navbar → NavLinks/UserMenu. Trivially swapped for real auth later. No custom `@theme` colors needed — Tailwind v4 built-in palette covers all design tokens.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/layout.tsx` | Modified | Add Navbar, update metadata, `lang="es"` |
| `app/page.tsx` | Replaced | Landing page with institutional welcome |
| `app/globals.css` | Modified | Strip dark mode, simplify `@theme` |
| `components/layout/` | New | Navbar, NavLinks, Logo, UserMenu |
| `docs/ui_componentes.md` | New | Layout rules, design tokens, component docs |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Role simulation leaks into downstream code as real auth | Low | Marked with `// TODO: Replace with Supabase auth` comments in every file |
| Tailwind v4 migration edge cases (`@theme inline` vs `@theme`) | Low | Exploration confirmed `@theme inline` is correct for Geist font vars |
| Dark mode remnants in scaffold survive cleanup | Low | Explicit grep for `dark:` and `prefers-color-scheme` during verify step |

## Rollback Plan

Revert commit. All changes are confined to `app/` (layout, page, globals.css) plus new `components/layout/` and `docs/` directories. No database, no API, no config changes. `git revert` is safe and complete.

## Dependencies

None. This is the first change — builds on existing CNA scaffold.

## Success Criteria

- [ ] Landing page renders at `/` with indigo-900 branding, no CNA boilerplate visible
- [ ] Navbar shows correct tabs for each simulated role (public, alumno, institucion, admin)
- [ ] Active tab has `border-b-4 border-indigo-900` highlight
- [ ] Role dropdown switches navbar tabs without page reload
- [ ] No dark mode active — forced light theme regardless of OS preference
- [ ] `docs/ui_componentes.md` documents layout decisions and design tokens
- [ ] `npm run build` succeeds with zero errors
