# 🏗️ Arquitectura General

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.4 |
| UI | React | 19.2.4 |
| Lenguaje | TypeScript | 5.x |
| Estilos | Tailwind CSS | 4.2.4 |
| Backend | Supabase (pendiente) | — |
| BD | PostgreSQL (pendiente) | — |

## Roles del Sistema

Solo 3 roles. **NO existe rol institución** — las empresas NO entran a la plataforma.

| Rol | Descripción | Acceso |
|-----|-------------|--------|
| `public` | Visitante sin autenticar | Landing, programas, FAQ |
| `alumno` | Estudiante registrado | Dashboard, perfil, plazas, reportes, documentos, descargas |
| `admin` | Administrador del sistema | Usuarios, documentos, reportes, configuración |

> ⚠️ Actualmente los roles se simulan con un dropdown en la navbar (`useState<Role>` en `Navbar.tsx`). Se reemplazará por Supabase Auth.

## Estructura de Componentes

```
app/layout.tsx (Server Component)
├── Navbar (Client Component — useState<Role>)
│   ├── Logo (Server Component — next/image)
│   ├── NavLinks (Client Component — usePathname())
│   └── UserMenu (Client Component — select dropdown)
└── {children} (páginas)
```

### Componentes Reusables (`components/ui/`)

| Componente | Tipo | Props |
|-----------|------|-------|
| `PageHeader` | Server | `title`, `description`, `icon?` |
| `StatCard` | Server | `title`, `value`, `description?`, `icon?`, `accent?` |
| `EmptyState` | Server | `title`, `description`, `icon?` |
| `Icons` | Server | 14 iconos SVG inline (Briefcase, Users, Building, Document, Chart, etc.) |

### Componentes de Layout (`components/layout/`)

| Componente | Tipo | Responsabilidad |
|-----------|------|-----------------|
| `Logo` | Server | Renderiza logo institucional + texto "Plataforma PP" |
| `NavLinks` | Client | Tabs de navegación por rol, `usePathname()` para tab activo |
| `UserMenu` | Client | Dropdown simulador de roles (select con 3 opciones) |
| `Navbar` | Client | Orquesta Logo + NavLinks + UserMenu, dueño del estado `role` |

## Diseño del Sistema

- **Tema**: Solo claro (no dark mode)
- **Primario**: `indigo-900` — logo, títulos, tabs activos, botones principales
- **Acento**: `blue-900` / `blue-800` — iconos, hover, bordes decorativos
- **Fondo**: `bg-gray-50` principal, tarjetas `bg-white shadow-sm rounded-lg`
- **Layout**: Navbar `h-16` con `border-b`, contenido `max-w-7xl mx-auto`
- **Tipografía**: Geist Sans (variable) + Geist Mono

Ver [`ui_componentes.md`](./ui_componentes.md) para el detalle completo.

## Flujo de Datos (Simulación Actual)

```
UserMenu (select)
  └─ onChange → setRole(newRole)  [Navbar state]
       ├─ role → NavLinks (renderiza tabs del rol)
       └─ role → UserMenu (muestra opción actual)
```

Cuando se integre Supabase Auth, el `role` vendrá del session context en lugar del `useState`.

## Máquina de Estados del Proceso

```
Registro → Validación créditos → Admin autoriza
  → Selección de plazas (máx 3, pendiente/aceptado/rechazado)
  → Ejecución (reportes mensuales + horas)
  → Liberación (480 hrs + documentos → constancia)
```

Ver [`flujo_plazas.md`](./flujo_plazas.md) para el detalle de la selección de plazas.

## Estructura de Archivos

```
Proyecto_PP/
├── app/                      # App Router pages
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   ├── globals.css           # Estilos globales (Tailwind v4)
│   ├── programas/page.tsx
│   ├── faq/page.tsx
│   ├── dashboard/page.tsx
│   ├── perfil/page.tsx
│   ├── plazas/page.tsx
│   ├── reportes/page.tsx
│   ├── subir-documentos/page.tsx
│   ├── descargas/page.tsx
│   ├── usuarios/page.tsx
│   ├── documentos/page.tsx
│   ├── reportes-admin/page.tsx
│   └── configuracion/page.tsx
├── components/
│   ├── layout/               # Navbar, Logo, NavLinks, UserMenu
│   └── ui/                   # PageHeader, StatCard, EmptyState, Icons
├── types/                    # Role, NavItem
├── public/                   # logo-institucion.webp
├── docs/                     # Documentación del proyecto
├── openspec/                 # SDD artifacts (specs, archive)
└── context.md                # Especificación principal del proyecto
```

## Decisiones Técnicas

1. **Tailwind v4 nativo**: Sin `tailwind.config.ts`. Colores built-in. `@import "tailwindcss"` en CSS.
2. **Sin modo oscuro**: La institución no lo requiere. Simplifica el CSS.
3. **Componentes Server por defecto**: Solo `'use client'` donde se necesita interactividad (NavLinks, UserMenu, Navbar, Plazas, SubirDocumentos).
4. **Simulación de roles**: `useState` en Navbar con prop drilling. Fácil de reemplazar por contexto de auth.
5. **Sin librería de iconos**: 14 SVGs inline en `Icons.tsx` para evitar dependencias externas.
6. **Placeholder data**: Todas las páginas tienen datos hardcodeados como ejemplo. Se conectarán a Supabase.
