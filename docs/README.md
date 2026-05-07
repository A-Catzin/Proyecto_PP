# 📚 Documentación del Proyecto

**Plataforma Integral de Prácticas Profesionales y Servicio Social**
Tecnológico Universitario Playacar

---

## Índice de Documentos

| Documento | Contenido |
|-----------|-----------|
| [`arquitectura.md`](./arquitectura.md) | Arquitectura general, stack tecnológico, roles, estructura de componentes |
| [`paginas.md`](./paginas.md) | Catálogo completo de las 15 páginas implementadas con rutas y descripciones |
| [`flujo_plazas.md`](./flujo_plazas.md) | Flujo de selección de plazas, máquina de estados y reglas de negocio |
| [`ui_componentes.md`](./ui_componentes.md) | Sistema de diseño: paleta de colores, tipografía, convenciones de componentes |

---

## Estado del Proyecto (7 Mayo 2026)

| Área | Estado | Rama |
|------|--------|------|
| Shell institucional (layout + navbar) | ✅ Completo | `main` |
| 15 páginas con contenido placeholder | ✅ Completo | `main` |
| Logo institucional integrado | ✅ Completo | `main` |
| Simulador de roles (dropdown) | ✅ Completo | `main` |
| Documentación del proyecto | ✅ Completo | `main` |
| Supabase (auth + DB) | 🔲 Pendiente | — |
| Backend / API routes | 🔲 Pendiente | — |
| Subida real de archivos | 🔲 Pendiente | — |
| Notificaciones | 🔲 Pendiente | — |

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16.2.4 (App Router), React 19, TypeScript 5 |
| Estilos | Tailwind CSS v4 (sin modo oscuro, tema institucional) |
| Diseño | Componentes reusables (PageHeader, StatCard, EmptyState) |
| Iconos | 14 iconos SVG inline (`components/ui/Icons.tsx`) |
| Logo | WebP institucional (361×233, alpha) |
| Base de datos | Supabase PostgreSQL (pendiente de implementar) |
| Auth | Supabase Auth (pendiente de implementar) |

## Cómo Ejecutar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Build de producción
```

Usá el dropdown de roles en la navbar para navegar como Público, Alumno o Admin.
