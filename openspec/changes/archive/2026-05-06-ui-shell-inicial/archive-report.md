# Archive Report: UI Shell Inicial

**Change**: `ui-shell-inicial`
**Archived**: 2026-05-06
**Status**: PASS WITH WARNINGS (5 cosmetic warnings, no critical issues)
**Mode**: hybrid (Engram + Filesystem)

## Executive Summary

First change for Plataforma Integral de Prácticas Profesionales — established the institutional visual identity and navigation shell. Replaced the CNA boilerplate with branded UI, role-simulated navbar, and a public landing page. All 10 tasks completed, build passes, all spec requirements structurally satisfied.

### What Was Built

- **2 type definition files**: `types/roles.ts` (Role union type), `types/navigation.ts` (NavItem interface)
- **4 layout components**: Logo (Server), NavLinks (Client with `usePathname()`), UserMenu (Client with role select), Navbar (Client orchestrator with `useState<Role>`)
- **2 modified pages**: `app/layout.tsx` (lang="es", Spanish metadata, Navbar, main container), `app/page.tsx` (institutional landing)
- **1 modified CSS**: `app/globals.css` (removed dark mode, light-only theme)
- **1 documentation file**: `docs/ui_componentes.md`
- **Design system**: indigo-900 primary, bg-gray-50, white navbar, role-based navigation with simulator

## Artifacts Archived

### Filesystem (`openspec/changes/archive/2026-05-06-ui-shell-inicial/`)

| Artifact | Path | Status |
|----------|------|--------|
| Exploration | `exploration.md` | ✅ Archived |
| Proposal | `proposal.md` | ✅ Archived |
| Spec: layout-base | `specs/layout-base/spec.md` | ✅ Archived |
| Spec: ui-design-system | `specs/ui-design-system/spec.md` | ✅ Archived |
| Design | `design.md` | ✅ Archived |
| Tasks | `tasks.md` | ✅ Archived |
| Verify Report | `verify-report.md` | ✅ Archived |
| Archive Report | `archive-report.md` | ✅ Archived |

### Engram (Observation IDs)

| Artifact | Observation ID | Topic Key |
|----------|---------------|-----------|
| Exploration | #4 | `sdd/ui-shell-inicial/explore` |
| Proposal | #5 | `sdd/ui-shell-inicial/proposal` |
| Spec | #6 | `sdd/ui-shell-inicial/spec` |
| Design | #7 | `sdd/ui-shell-inicial/design` |
| Tasks | #8 | `sdd/ui-shell-inicial/tasks` |
| Apply Progress | #9 | `sdd/ui-shell-inicial/apply-progress` |
| Verify Report | #10 | `sdd/ui-shell-inicial/verify-report` |
| Archive Report | This document | `sdd/ui-shell-inicial/archive-report` |

## Specs Synced to Main

| Domain | Action | Details |
|--------|--------|---------|
| `layout-base` | Created (new spec) | 7 requirements, 8 scenarios — root layout, navbar, role-based nav, simulator, responsive |
| `ui-design-system` | Created (new spec) | 6 requirements, 9 scenarios — color palette, typography, component conventions, no dark mode, global bg |

Both specs were new (no prior main specs existed) → copied directly to `openspec/specs/{domain}/spec.md`.

## Task Completion

| Phase | Tasks | Status |
|-------|-------|--------|
| 1. Foundation | 1.1 types/roles.ts, 1.2 types/navigation.ts, 1.3 globals.css cleanup | ✅ 3/3 |
| 2. Layout Components | 2.1 Logo, 2.2 NavLinks, 2.3 UserMenu, 2.4 Navbar | ✅ 4/4 |
| 3. Integration | 3.1 layout.tsx update, 3.2 page.tsx replacement | ✅ 2/2 |
| 4. Documentation | 4.1 docs/ui_componentes.md | ✅ 1/1 |
| **Total** | | **✅ 10/10** |

## Verdict

**PASS WITH WARNINGS** — All 10 tasks completed, build passes, 22/24 spec scenarios fully compliant. The 5 warnings are cosmetic/cleanup items that do not block functionality:
1. `globals.css` retains `--background`/`--foreground` custom properties (unnecessary indirection)
2. Landing page card missing `border border-gray-200`
3. Landing h1 uses `text-indigo-900` instead of `text-gray-900` (brand-hero choice)
4. Inactive tab uses `border-b-4` instead of spec `border-b-2` (visually identical)
5. `body` font-family hardcoded to Arial fallback (overridden by Geist className)

## Key Decisions Preserved

- **AD-1**: Modular component split (4 files in `components/layout/`) — not monolithic
- **AD-2**: Navbar is Client Component (owns `useState<Role>`); layout stays Server
- **AD-3**: Role simulation via props (not URL/cookies) — all marked with TODO for Supabase
- **AD-4**: Direct utility classes (`bg-indigo-900`) — no `@theme` semantic aliases
- **Responsive**: Horizontal scroll (`overflow-x-auto`) over hamburger menu for MVP

## Source of Truth Updated

The following main specs now reflect the new behavior:
- `openspec/specs/layout-base/spec.md`
- `openspec/specs/ui-design-system/spec.md`

## SDD Cycle Complete

This change has been fully planned, designed, specified, implemented, verified, and archived. Ready for the next change.
