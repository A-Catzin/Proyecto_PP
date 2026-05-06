# UI Design System Specification

## Purpose

Define the visual design tokens, color palette, typography, and component conventions for the Plataforma Integral de Prácticas Profesionales. All UI components MUST adhere to these tokens.

## Requirements

### Requirement: Color Palette

The application MUST use the following institutional color palette via Tailwind v4 built-in colors — no custom `@theme` declarations for colors are needed:

| Token | Tailwind Class | Usage |
|-------|---------------|-------|
| Primary | `indigo-900` | Links, buttons, active states, branding |
| Secondary accent | `purple-600` | Secondary interactive elements |
| Tertiary accent | `fuchsia-700` | Tertiary highlights, badges |
| Surface default | `gray-50` | Page background |
| Surface card | `white` | Cards, panels, modals |
| Border | `gray-200` | Dividers, card borders, input borders |
| Text primary | `gray-900` | Headings, body text |
| Text secondary | `gray-500` | Placeholders, captions, muted text |
| Alert/Error | `red-600` | Error messages, destructive actions |
| Success | `green-600` | Success messages, confirmations |

#### Scenario: Primary interactive elements use indigo-900

- GIVEN any button, link, or interactive element
- WHEN it is in its default/active state
- THEN it uses `indigo-900` as its primary color

#### Scenario: Cards use white surface

- GIVEN any card component renders
- THEN it has `bg-white` as its background

#### Scenario: Error states use red-600

- GIVEN an error or alert state is displayed
- THEN the text or icon uses `red-600`

#### Scenario: Borders use gray-200

- GIVEN any element with a border (card, input, divider)
- THEN it uses `border-gray-200`

### Requirement: Typography

The application MUST use Geist Sans as the body font. Font sizes MUST follow Tailwind v4 defaults.

| Element | Size | Weight |
|---------|------|--------|
| Page title (h1) | `text-3xl` or larger | `font-bold` |
| Section title (h2) | `text-2xl` | `font-semibold` |
| Card title (h3) | `text-xl` | `font-semibold` |
| Body text | `text-base` | `font-normal` |
| Small/caption | `text-sm` | `font-normal` |
| Button text | `text-sm` | `font-medium` |

Text color hierarchy:
- Primary content: `text-gray-900`
- Secondary/muted content: `text-gray-500`
- Placeholders: `text-gray-500`

#### Scenario: Body text uses Geist Sans

- GIVEN any page renders with body text
- WHEN the computed font is inspected
- THEN it resolves to Geist Sans

#### Scenario: Text hierarchy is consistent

- GIVEN a page with headings and body text
- THEN headings use `gray-900` with appropriate weight
- AND body text uses `gray-900` at `text-base`
- AND captions/placeholders use `gray-500`

### Requirement: Component Conventions

All components MUST follow these baseline conventions:

| Component | Convention |
|-----------|------------|
| Card | `bg-white shadow-sm rounded-lg` with `border border-gray-200` |
| Button (primary) | `bg-indigo-900 text-white rounded-md` with hover state |
| Button (secondary) | `border border-gray-200 text-gray-900 rounded-md` with hover state |
| Tab (active) | `border-b-4 border-indigo-900` |
| Tab (inactive) | `border-b-2 border-transparent` with `text-gray-500` |
| Input | `border border-gray-200 rounded-md` with focus ring |
| Alert/Error | `text-red-600` with optional `bg-red-50` background |

#### Scenario: Card component matches convention

- GIVEN a card component renders
- THEN it has `bg-white shadow-sm rounded-lg border border-gray-200`

#### Scenario: Primary button uses indigo-900

- GIVEN a primary action button renders
- THEN it has `bg-indigo-900 text-white rounded-md`

### Requirement: No Dark Mode

The application MUST NOT support dark mode. All `dark:` Tailwind variants MUST be removed or have no effect. The `@media (prefers-color-scheme: dark)` query MUST NOT be present in `globals.css`.

#### Scenario: Dark mode preference is ignored

- GIVEN the user's OS is set to dark mode
- WHEN any page renders
- THEN the visual appearance remains identical to light mode
- AND no `prefers-color-scheme` media query is active

#### Scenario: No dark mode remnants in globals.css

- GIVEN `app/globals.css` is inspected
- THEN it contains no `dark:` class definitions
- AND it contains no `prefers-color-scheme` media queries

### Requirement: Global Background

The page background MUST be `bg-gray-50` by default. All pages render on this surface unless a component explicitly overrides it (e.g., white card surfaces).

#### Scenario: Default page background is gray-50

- GIVEN any page in the application
- WHEN the background color is inspected
- THEN it is `gray-50`
