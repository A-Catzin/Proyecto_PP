# 📄 Catálogo de Páginas

15 páginas implementadas con diseño institucional (indigo-900 + blue-900, bg-gray-50).

---

## 🌐 Público (Rol: `public`)

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Landing Page | Hero con logo, stats (128 alumnos, 15 instituciones, 45 programas), 4 pasos del proceso, marco normativo, avisos recientes. Botones CTA: Ver Programas, Guía de Pasos. |
| `/programas` | Catálogo de Programas | Grid de 6 programas con filtros (búsqueda, modalidad, ubicación). Cada tarjeta: nombre, institución, modalidad (badge), ubicación, plazas disponibles. |
| `/faq` | Preguntas Frecuentes | 6 preguntas en acordeón (`<details>` nativo). Cubre: qué es servicio social, horas requeridas, requisitos, cómo elegir plaza, documentos, cambio de institución. |

---

## 🎓 Alumno (Rol: `alumno`)

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/dashboard` | Dashboard | 4 StatCards (horas acumuladas 124/480, reportes 3/6, estado Activo, progreso 25.8%). Barra de progreso visual. Tabla de actividad reciente con badges de estado. |
| `/perfil` | Perfil del Estudiante | Avatar con iniciales (blue-900), datos del alumno en grid 2-columnas: nombre, matrícula, CURP, carrera, semestre, créditos, correo, teléfono. Badge de estado Activo. |
| `/plazas` | Selección de Plazas | **Componente interactivo (Client)**. Tabla con 8 plazas disponibles. Selección máx 3 con estados: pendiente → aceptado/rechazado. Tarjetas de selecciones activas arriba, lista de disponibles abajo. Al rechazar se libera cupo. Ver [`flujo_plazas.md`](./flujo_plazas.md). |
| `/reportes` | Reportes y Bitácoras | Tabla con 3 reportes (tipo, periodo, horas, estatus, fecha). Badges: Aprobado (emerald), Pendiente (amber). Botón "+ Nuevo reporte". EmptyState para reportes futuros. |
| `/subir-documentos` | Subir Documentos | **Componente interactivo (Client)**. Formulario con selector de tipo (8 opciones: CV, carta, kárdex, etc.) + zona drag-and-drop simulada. Modo simulación: input de texto para probar. Tabla de documentos subidos con estados (pendiente/aprobado/rechazado). |
| `/descargas` | Descargas | 4 documentos en grid 2-columnas. 2 disponibles (Carta Compromiso, Plan de Trabajo) con botón "Descargar PDF". 2 bloqueados (Carta de Aceptación, Constancia de Terminación) con botón gris "No disponible". |

---

## 🔧 Admin (Rol: `admin`)

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/usuarios` | Gestión de Usuarios | 4 StatCards (146 total, 128 alumnos, 15 instituciones, 3 admins). Tabla con 6 usuarios: nombre, rol (badge coloreado), institución, estado (activo/inactivo), fecha registro, botón Editar. |
| `/documentos` | Validación de Documentos | 3 StatCards (12 pendientes, 87 aprobados, 4 rechazados). Tabla con 5 documentos: alumno, tipo, fecha, estado (badge). Acciones Aprobar/Rechazar para pendientes. |
| `/reportes-admin` | Reportes Estadísticos | 4 métricas grandes (128 activos, 15 instituciones, 342 completados, 45,820 horas). Gráfica de barras: distribución por carrera (5 carreras con %). Gráfica de procesos por estado (4 cuadrantes coloreados). |
| `/configuracion` | Configuración | 2 secciones expandibles: General (nombre plataforma, horas requeridas 480, % créditos 70%, periodos) y Notificaciones (email, toggles activo/inactivo con badges emerald/gray). |

---

## Componentes Compartidos

Todas las páginas usan estos componentes reusables de `components/ui/`:

- **`PageHeader`**: Título h1 + descripción + icono en caja blue-900
- **`StatCard`**: Tarjeta con `border-l-4`, icono, valor grande, etiqueta. Acentos: indigo, blue, green, amber.
- **`EmptyState`**: Círculo con icono, título, descripción para secciones vacías.
- **`Icons`**: 14 iconos SVG inline (Briefcase, Users, Building, Document, Chart, Clock, Check, Search, Download, Cog, Shield, Graduation, Megaphone, etc.)

Para detalle de estilos y convenciones, ver [`ui_componentes.md`](./ui_componentes.md).
