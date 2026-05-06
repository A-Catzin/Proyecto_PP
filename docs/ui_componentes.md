# UI Design System — Plataforma PP

## Color Palette

| Token | Tailwind Class | Uso |
|-------|---------------|-----|
| Primary | `indigo-900` | Links, botones, estados activos, branding |
| Secondary accent | `purple-600` | Elementos interactivos secundarios |
| Tertiary accent | `fuchsia-700` | Destacados terciarios, badges |
| Surface default | `gray-50` | Fondo de página |
| Surface card | `white` | Tarjetas, paneles, modales |
| Border | `gray-200` | Divisores, bordes de tarjeta, bordes de input |
| Text primary | `gray-900` | Títulos, texto corporal |
| Text secondary | `gray-500` | Placeholders, captions, texto secundario |
| Alert/Error | `red-600` | Mensajes de error, acciones destructivas |
| Success | `green-600` | Mensajes de éxito, confirmaciones |

## Typography

| Elemento | Clase | Weight |
|----------|-------|--------|
| Page title (h1) | `text-3xl` o mayor | `font-bold` |
| Section title (h2) | `text-2xl` | `font-semibold` |
| Card title (h3) | `text-xl` | `font-semibold` |
| Body text | `text-base` | `font-normal` |
| Small/caption | `text-sm` | `font-normal` |
| Button text | `text-sm` | `font-medium` |

**Fuente base**: Geist Sans (configurada via `@theme inline` en `globals.css`).

## Component Conventions

| Componente | Clases |
|------------|--------|
| Card | `bg-white shadow-sm rounded-lg border border-gray-200` |
| Button (primary) | `bg-indigo-900 text-white rounded-md hover:bg-indigo-800` |
| Button (secondary) | `border border-gray-200 text-gray-900 rounded-md hover:bg-gray-50` |
| Tab (active) | `border-b-4 border-indigo-900 text-indigo-900` |
| Tab (inactive) | `border-b-4 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300` |
| Input | `border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-900` |
| Alert/Error | `text-red-600` con opcional `bg-red-50` |

## Layout Structure

```
Navbar (bg-white, border-b, max-w-7xl)
├── Logo (izquierda, text-indigo-900)
├── NavLinks (centro, tabs horizontales)
│   └── overflow-x-auto en mobile
└── UserMenu (derecha, select dropdown)

<main> (flex-1, max-w-7xl, mx-auto, px-4/6/8, py-8)
└── {children} (contenido de cada página)
```

### Responsive Breakpoints

- **Mobile** (< `sm`): `px-4`, NavLinks con scroll horizontal (`overflow-x-auto`, `whitespace-nowrap`)
- **Tablet** (`sm`-`lg`): `px-6`
- **Desktop** (`>= lg`): `px-8`

## Role Navigation Map

| Rol | Tabs |
|-----|------|
| `public` | Inicio, Programas, FAQ |
| `alumno` | Dashboard, Perfil, Plazas, Reportes, Descargas |
| `institucion` | Perfil, Vacantes, Postulantes, Reportes |
| `admin` | Usuarios, Documentos, Reportes, Configuración |

## Dark Mode

Desactivado. La aplicación es **light-only**. No usar clases `dark:` ni `@media (prefers-color-scheme: dark)`.
