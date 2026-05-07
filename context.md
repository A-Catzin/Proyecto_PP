# 🤖 INSTRUCCIÓN PRINCIPAL PARA EL AGENTE (V3 — ACTUALIZADO)

Actúa como un Desarrollador Full Stack Senior y Arquitecto de Software experto en Next.js (App Router), React, Tailwind CSS y Supabase. Tu objetivo es construir desde cero la "Plataforma Integral de Prácticas Profesionales y Servicio Social" para el Tecnológico Universitario Playacar.

---

## 🎨 1. SISTEMA DE DISEÑO Y UI/UX (TAILWIND CSS)

Diseño institucional, limpio, minimalista y profesional.

- **Color Primario:** Familia `indigo-900` (Logo, Títulos, Tabs activos, Botones principales).
- **Color Secundario:** `blue-900` o `blue-800` (Avatares, Hover en botones, Acentos visuales).
- **Fondos:** `bg-gray-50` principal. Tarjetas: `bg-white`, `shadow-sm`, `rounded-lg`.
- **Textos:** `text-gray-900` principal, `text-gray-500` secundarios. Bordes: `border-gray-200`.
- **Alertas:** `red-600` errores. `emerald-600` éxito. `amber-500` advertencias.
- **Layout:** Navbar blanco `border-b`, logo institucional izquierda, tabs centro (`border-b-4 border-indigo-900` activo), perfil derecha. Contenedor: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`.
- **Logo:** `public/logo-institucion.webp` — Tecnológico Universitario Playacar (WebP, 361×233, alpha).
- **Sin modo oscuro.** Solo tema claro institucional.

---

## 🧠 2. ARQUITECTURA Y REQUERIMIENTOS TÉCNICOS

- **Stack:** Next.js 16 (App Router) + Supabase (PostgreSQL, Auth RLS, Storage, Edge Functions).
- **Roles del sistema:** Solo 3 — `public` (visitante), `alumno`, `admin`.
  - ⚠️ **NO existe rol `institucion`.** Las empresas/Instituciones NO entran a la plataforma. El admin gestiona todo.
- **Seguridad:** Supabase Auth, Row Level Security, sesiones.
- **Responsividad:** Mobile-First con Tailwind.
- **Requerimientos Clave:**
  - Carga/validación de PDFs (peso máximo controlado).
  - Documentos dinámicos (autocompletado con datos de DB).
  - Contador automático de horas (meta: 480 horas).
  - Bloqueo de registro si no cumple % créditos.
  - Notificaciones automatizadas (Supabase Edge Functions).

---

## 🔄 3. MÁQUINA DE ESTADOS (FLUJO DEL PROCESO)

1. **Registro y Validación:** Alumno se registra → Validación automática de créditos → Admin autoriza inicio.
2. **Selección de Plazas:** Alumno elige hasta 3 plazas disponibles → Estado: pendiente → Admin asigna una (aceptado) o rechaza → Si es rechazada, se libera el cupo y el alumno puede elegir otra.
3. **Ejecución:** Alumno sube reportes mensuales/bitácoras → Admin valida. Contador de horas suma con reportes aprobados.
4. **Liberación:** 480 horas + documentos en regla → Admin emite "Constancia de Terminación".

---

## 📂 4. ESTRUCTURA DE PANELES (MÓDULOS)

### A. Landing Page (Público)
- Info general, marco normativo, catálogo de programas.
- Guía de pasos, avisos y FAQ.

### B. Panel del Estudiante (Rol: 'alumno')
- **Dashboard:** Estado del trámite, barra de progreso, horas, notificaciones.
- **Perfil:** Datos personales y académicos.
- **Plazas:** Tabla con opciones disponibles. El alumno selecciona máximo 3. Estados: pendiente → aceptado/rechazado. Si se rechaza, se libera cupo.
- **Reportes:** Subida de bitácoras y formatos mensuales.
- **Documentos:** Subida de documentos del expediente (CV, kárdex, carta presentación, etc.).
- **Descargas:** Documentos autogenerados (Carta Compromiso, Plan de Trabajo, Constancia).

### C. Panel Administrador (Rol: 'admin')
- Gestión global de usuarios (alumnos).
- Validación de plazas seleccionadas (aceptar/rechazar).
- Validación final de documentos y reportes.
- Reportes estadísticos y emisión de Cartas de Liberación.
- Configuración del sistema.

---

## 🗄️ 5. ESQUEMA DE BASE DE DATOS (POSTGRESQL)

*Uso de snake_case, UUID como PK.*

**1. profiles (Extensión de auth.users)**
`id` (PK), `nombre` (text), `rol` (enum: 'alumno', 'admin'), `telefono` (text), `created_at`.

**2. estudiantes**
`id` (PK), `usuario_id` (FK profiles), `matricula` (unique), `curp` (unique), `carrera` (text), `semestre` (int), `porcentaje_creditos` (numeric), `correo_institucional` (text).

**3. plazas_disponibles**
`id` (PK), `nombre_proyecto` (text), `descripcion` (text), `modalidad` (enum: presencial/remoto/hibrido), `ubicacion` (text), `plazas_totales` (int), `plazas_ocupadas` (int), `activa` (boolean).

**4. seleccion_plazas**
`id` (PK), `estudiante_id` (FK), `plaza_id` (FK), `estado` (enum: pendiente, aceptado, rechazado), `fecha_seleccion` (timestamp), `orden_preferencia` (int 1-3).

**5. expedientes**
`id` (PK), `estudiante_id` (FK), `plaza_id` (FK, nullable hasta asignación), `fecha_inicio` (date), `fecha_termino` (date), `estado_proceso` (enum: pendiente, activo, finalizado, rechazado), `horas_acumuladas` (int default 0).

**6. documentos_subidos**
`id` (PK), `estudiante_id` (FK), `tipo_doc` (text), `nombre_archivo` (text), `file_path` (Storage), `tamanio_bytes` (int), `estatus_validacion` (enum: pendiente, aprobado, rechazado), `fecha_subida` (timestamp).

**7. reportes**
`id` (PK), `expediente_id` (FK), `tipo_reporte` (enum: mensual, bitacora), `horas_reportadas` (int), `file_path` (Storage), `estatus_validacion` (enum: pendiente, aprobado, rechazado), `observaciones` (text), `fecha_subida` (timestamp).

---

## 📝 8. REGLAS DE NEGOCIO ACTUALIZADAS (⚠️ VIGENTE)

### Plazas
- El alumno puede seleccionar **máximo 3 plazas**.
- Al seleccionar, el estado inicial es **pendiente**.
- El admin puede cambiar el estado a **aceptado** o **rechazado**.
- Si una plaza es **rechazada**, el cupo se libera automáticamente y el alumno puede elegir otra.
- Solo **una plaza** puede quedar como **aceptado** (las demás pasan a rechazado automáticamente).
- Los datos de plazas disponibles vendrán de la tabla `plazas_disponibles` en Supabase.

### Documentos
- El alumno debe poder subir documentos de su expediente (CV, kárdex, carta presentación, etc.).
- Formatos aceptados: PDF, JPG, PNG. Máximo 5 MB por archivo.
- Cada documento subido queda en estado **pendiente** hasta que el admin lo revise.
- Estados posibles: pendiente → aprobado / rechazado.

### Roles
- **NO existe rol institución.** Las empresas NO acceden a la plataforma.
- Solo 3 roles: `public`, `alumno`, `admin`.
- El admin gestiona todo: plazas, validaciones, usuarios.

---

## 📝 9. REGLAS DE DOCUMENTACIÓN

- Carpeta `/docs` con archivos `.md` por módulo.
- Cada archivo incluye: qué se hizo, decisiones técnicas, archivos afectados, pasos futuros.
- Actualizar docs antes de dar por terminado un módulo.
