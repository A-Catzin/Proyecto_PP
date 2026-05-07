# 🎨 Sistema de Diseño — Plataforma PP

## Paleta de Colores

| Token | Clase Tailwind | Uso |
|-------|---------------|-----|
| **Primario** | `indigo-900` | Logo, Títulos, Tabs activos, Botones principales |
| **Acento** | `blue-900` / `blue-800` | Iconos, Hover states, Bordes decorativos, Avatares |
| **Fondo principal** | `bg-gray-50` | Fondo de todas las páginas |
| **Tarjetas** | `bg-white` | Contenedores, tarjetas, paneles |
| **Sombra tarjetas** | `shadow-sm` | Elevación sutil para tarjetas |
| **Bordes tarjetas** | `rounded-lg` | Esquinas redondeadas |
| **Texto principal** | `text-gray-900` | Contenido principal, encabezados |
| **Texto secundario** | `text-gray-500` | Subtítulos, placeholders, descripciones |
| **Bordes** | `border-gray-200` | Divisores, inputs, separadores |
| **Alertas / Errores** | `red-600` | Notificaciones de error, alertas |
| **Éxito** | `emerald-600` | Estados positivos, completados |
| **Advertencia** | `amber-500` | Estados de atención, pendientes |

## Tipografía

- **Fuente principal**: Geist Sans (variable, configurada en `app/layout.tsx`)
- **Fuente mono**: Geist Mono (para datos, códigos)
- **Jerarquía**:
  - `text-3xl font-bold text-indigo-900` → Títulos de página (h1)
  - `text-xl font-semibold text-gray-900` → Subtítulos (h2)
  - `text-base text-gray-500` → Texto descriptivo

## Convenciones de Componentes

### Tarjetas (Cards)
```html
<div class="bg-white shadow-sm rounded-lg p-6">...</div>
```

### Tarjetas de Estadísticas (StatCard)
```html
<div class="bg-white shadow-sm rounded-lg border-l-4 border-l-blue-900 p-5">
  <!-- icono + valor + etiqueta -->
</div>
```

### Botones Primarios
```html
<button class="bg-indigo-900 text-white rounded-md px-6 py-3 hover:bg-indigo-800">
```

### Botones Secundarios
```html
<button class="border border-gray-200 text-gray-900 rounded-md px-6 py-3 hover:bg-gray-50">
```

### Tabs de Navegación
- Activo: `border-b-4 border-indigo-900 text-indigo-900`
- Inactivo: `border-b-4 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`

## Estructura del Layout

```
┌──────────────────────────────────────────────┐
│  Navbar (blanco, border-b, h-16)             │
│  ┌──────┐  ┌──────────────────┐  ┌────────┐ │
│  │ Logo │  │  NavLinks (tabs) │  │ User   │ │
│  └──────┘  └──────────────────┘  └────────┘ │
├──────────────────────────────────────────────┤
│  main (bg-gray-50, flex-1)                   │
│  ┌────────────────────────────────────────┐  │
│  │  max-w-7xl mx-auto px-4 sm:px-6       │  │
│  │  lg:px-8 py-8                         │  │
│  │  ┌──────────────────────────────┐     │  │
│  │  │  PageHeader                 │     │  │
│  │  ├──────────────────────────────┤     │  │
│  │  │  Contenido (cards, tablas)  │     │  │
│  │  └──────────────────────────────┘     │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

## Tema Claro Exclusivo

No se soporta modo oscuro. El tema es institucional claro:
- Fondo: `bg-gray-50`
- Texto: `text-gray-900` / `text-gray-500`
- Las variables CSS `--background` y `--foreground` están configuradas para tema claro fijo.
