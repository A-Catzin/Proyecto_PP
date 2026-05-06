# Layout Base Specification

## Purpose

Define the root layout structure, responsive navbar, container system, and role-based navigation for the Plataforma Integral de Prácticas Profesionales. This spec covers the shell that every page renders inside.

## Requirements

### Requirement: Root Layout Structure

The application MUST render a root layout (`app/layout.tsx`) that:
- Sets `lang="es"` on the `<html>` element
- Applies institutional metadata (title, description)
- Renders the Navbar at the top of every page
- Provides a main content area with consistent container styling
- MUST NOT include dark mode support or toggle

#### Scenario: Public visitor loads any page

- GIVEN a user navigates to any route in the application
- WHEN the page renders
- THEN the HTML element has `lang="es"`
- AND the Navbar is visible at the top
- AND the main content area uses `bg-gray-50` with `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`

#### Scenario: Dark mode is not active

- GIVEN the user's OS prefers dark mode
- WHEN any page renders
- THEN the application remains in light theme
- AND no `dark:` Tailwind classes produce visible effects

### Requirement: Navbar Composition

The Navbar MUST be a server component that orchestrates three child sections:
- **Logo** (left): institutional branding
- **NavLinks** (center): role-based navigation tabs
- **UserMenu** (right): profile placeholder and role simulator dropdown

The Navbar MUST have white background (`bg-white`) with bottom border (`border-b border-gray-200`) and be contained within `max-w-7xl`.

#### Scenario: Navbar renders with correct layout

- GIVEN the application loads with any simulated role
- WHEN the Navbar renders
- THEN the Logo appears on the left
- AND NavLinks appear centered
- AND UserMenu appears on the right
- AND the Navbar has `bg-white border-b border-gray-200`

### Requirement: Role-Based Navigation Tabs

NavLinks MUST render different navigation tabs based on the current simulated role. The active tab MUST be visually indicated with `border-b-4 border-indigo-900`.

| Role | Tabs |
|------|------|
| `public` | Inicio, Programas, FAQ |
| `alumno` | Dashboard, Perfil, Plazas, Reportes, Descargas |
| `institucion` | Perfil, Vacantes, Postulantes, Reportes |
| `admin` | Usuarios, Documentos, Reportes, Configuración |

#### Scenario: Public visitor sees public tabs

- GIVEN the simulated role is `public`
- WHEN NavLinks renders
- THEN only "Inicio", "Programas", and "FAQ" tabs are visible

#### Scenario: Alumno sees student tabs

- GIVEN the simulated role is `alumno`
- WHEN NavLinks renders
- THEN "Dashboard", "Perfil", "Plazas", "Reportes", and "Descargas" tabs are visible

#### Scenario: Institucion sees institution tabs

- GIVEN the simulated role is `institucion`
- WHEN NavLinks renders
- THEN "Perfil", "Vacantes", "Postulantes", and "Reportes" tabs are visible

#### Scenario: Admin sees admin tabs

- GIVEN the simulated role is `admin`
- WHEN NavLinks renders
- THEN "Usuarios", "Documentos", "Reportes", and "Configuración" tabs are visible

#### Scenario: Active tab indicator updates on navigation

- GIVEN the user is on a page that corresponds to a nav tab
- WHEN the page renders
- THEN the corresponding tab has `border-b-4 border-indigo-900`
- AND all other tabs do not have this styling

### Requirement: Role Simulator Dropdown

The UserMenu MUST include a dropdown that allows switching the simulated role between `public`, `alumno`, `institucion`, and `admin`. This is a temporary mock for development — all instances MUST be marked with `// TODO: Replace with Supabase auth`.

#### Scenario: Role switch updates navbar tabs

- GIVEN the UserMenu role dropdown is visible
- WHEN the user selects a different role
- THEN the NavLinks immediately update to show the new role's tabs
- AND the page does NOT reload

#### Scenario: Role switch markers for future auth

- GIVEN any file that references the role simulator
- WHEN the code is reviewed
- THEN it contains a `// TODO: Replace with Supabase auth` comment

### Requirement: Responsive Behavior

The Navbar and layout MUST be responsive:
- On mobile (below `sm` breakpoint), NavLinks MUST collapse into a hamburger menu or horizontally scrollable tabs
- The main content area MUST adjust padding: `px-4` on mobile, `px-6` on tablet (`sm`), `px-8` on desktop (`lg`)

#### Scenario: Mobile navbar is usable

- GIVEN the viewport width is below the `sm` breakpoint
- WHEN the Navbar renders
- THEN NavLinks are accessible via hamburger menu or scrollable tabs
- AND all role tabs remain reachable
