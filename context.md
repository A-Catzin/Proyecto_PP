# 🤖 INSTRUCCIÓN PRINCIPAL PARA EL AGENTE (V2 - VERSIÓN EXTENDIDA)
Actúa como un Desarrollador Full Stack Senior y Arquitecto de Software experto en Next.js (App Router), React, Tailwind CSS y Supabase. Tu objetivo es construir desde cero la "Plataforma Integral de Prácticas Profesionales y Servicio Social" para una universidad.

A continuación, tienes el contexto arquitectónico, flujos de trabajo, requerimientos y reglas estrictas de UI/UX.

---

## 🎨 1. SISTEMA DE DISEÑO Y UI/UX (TAILWIND CSS)
Diseño institucional, limpio, minimalista y profesional.
*   **Color Primario:** Familia `indigo-900` (Fondo: `bg-indigo-900`, Texto: `text-indigo-900`). Se usa en Logo, Títulos, Tabs activos y Botones principales.
*   **Color Secundario:** `purple-600` o `fuchsia-700` (Para avatares, Hover en botones).
*   **Fondos:** `bg-gray-50` para el fondo principal. Contenedores y tarjetas en `bg-white` con `shadow-sm` y `rounded-lg`.
*   **Textos:** `text-gray-900` principal, `text-gray-500` secundarios/placeholders. Bordes en `border-gray-200`.
*   **Alertas:** `red-600` para errores o notificaciones.
*   **Layout Base:** Navbar superior blanco con borde inferior, logo a la izquierda, navegación al centro (tabs con borde inferior grueso `border-b-4 border-indigo-900` para el activo), y perfil a la derecha. Contenedor principal: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`.

---

## 🧠 2. ARQUITECTURA Y REQUERIMIENTOS TÉCNICOS
*   **Stack:** Next.js (Frontend) + Supabase (PostgreSQL, Auth, Storage, API Automática).
*   **Calidad de Software (No Funcionales):**
    *   **Seguridad:** Encriptación de datos, manejo de sesiones (Supabase Auth) y protección de rutas con RLS (Row Level Security).
    *   **Disponibilidad & Responsividad:** Diseño "Mobile-First" nativo con Tailwind, operable 24/7.
*   **Requerimientos Funcionales Clave:**
    *   Carga y validación de PDFs (peso máximo controlado).
    *   Generación de documentos dinámicos (llenado automático de formatos oficiales con datos de la DB).
    *   Contador automático de horas basado en reportes aprobados (ej. meta de 480 horas).
    *   Bloqueo de registro si el alumno no cumple con el % de créditos necesarios.
    *   Sistema de notificaciones automatizadas (vía email/Supabase Edge Functions) ante cambios de estado.

---

## 🔄 3. MÁQUINA DE ESTADOS (FLUJO DEL PROCESO)
El sistema opera bajo la siguiente lógica estricta:
1.  **Registro y Validación:** Alumno se registra -> Validación automática de créditos -> Admin autoriza inicio.
2.  **Postulación:** Alumno revisa vacantes -> Aplica a un programa -> Institución lo acepta.
3.  **Ejecución:** Alumno sube reportes (mensuales/bitácoras) -> Institución (Jefe inmediato) valida asistencia/desempeño -> Admin ratifica. El contador de horas suma.
4.  **Liberación:** Horas completadas + Documentos en regla = Sistema habilita descarga de "Constancia de Terminación".

---

## 📂 4. ESTRUCTURA DE PANELES (MÓDULOS)

### A. Landing Page (Público)
*   Info general, marco normativo, catálogo de programas disponibles.
*   Guía de pasos, sección de avisos y FAQ (Preguntas Frecuentes).

### B. Panel del Estudiante (Privado - Rol: 'alumno')
*   **Dashboard:** Estado del trámite, barra de progreso, horas acumuladas, notificaciones.
*   **Perfil:** Datos personales y académicos.
*   **Buscador de Plazas:** Filtros por carrera, ubicación o tipo de actividad.
*   **Módulo de Reportes:** Subida de bitácoras y formatos.
*   **Descargas:** Generación autocompletada de Carta Compromiso y Plan de Trabajo.

### C. Panel de Institución (Privado - Rol: 'institucion')
*   Perfil de la organización y publicación de vacantes/plazas.
*   Revisión de postulantes y validación de asistencia/reportes de los alumnos a cargo.

### D. Panel Administrador (Privado - Rol: 'admin')
*   Gestión global de usuarios, validación final de documentos.
*   Reportes estadísticos y emisión de Cartas de Liberación.

---

## 🗄️ 5. ESQUEMA DE BASE DE DATOS (POSTGRESQL)
*Uso de snake_case, UUID como PK.*

**1. profiles (Extensión de auth.users)**
`id` (PK), `nombre` (text), `rol` (enum: 'alumno', 'institucion', 'admin'), `telefono` (text), `created_at`.

**2. estudiantes**
`id` (PK), `usuario_id` (FK profiles), `matricula` (unique), `curp` (unique), `carrera` (text), `semestre` (int), `porcentaje_creditos` (numeric), `correo_institucional` (text).

**3. instituciones**
`id` (PK), `usuario_id` (FK profiles), `rfc` (unique), `nombre_responsable` (text), `cargo` (text), `direccion` (text), `telefono_contacto` (text).

**4. programas_vacantes**
`id` (PK), `institucion_id` (FK), `nombre_proyecto` (text), `actividades` (text), `modalidad` (enum: presencial/remoto), `horario` (text), `plazas_disponibles` (int).

**5. expedientes (Seguimiento)**
`id` (PK), `estudiante_id` (FK), `programa_id` (FK), `fecha_inicio` (date), `fecha_termino` (date), `estado_proceso` (enum: pendiente, postulado, activo, finalizado, rechazado), `horas_acumuladas` (int default 0).

**6. documentos_y_reportes**
`id` (PK), `expediente_id` (FK), `tipo_doc` (enum: carta_aceptacion, reporte_mensual, bitacora, liberacion), `horas_reportadas` (int), `file_path` (Storage), `estatus_validacion` (enum: pendiente, aprobado, rechazado), `observaciones_jefe` (text).

---

## 🛠️ 6. PRIMERA TAREA PARA TI (AGENTE)
Entendiendo esta arquitectura masiva y las reglas de diseño UI/UX (indigo-900), quiero que generes el componente Layout principal (`app/layout.tsx` o `components/Navbar.tsx`). 
Debe tener la barra de navegación configurada para mostrar enlaces condicionales dependiendo del rol (simula los roles visualmente por ahora). Aplica estrictamente el diseño institucional solicitado usando Tailwind CSS.

## 📝 7. REGLAS ESTRICTAS DE DOCUMENTACIÓN (MEMORIA DEL PROYECTO)
Es obligatorio que documentes cada implementación, cambio arquitectónico o nueva función que desarrollemos. Para mantener el proyecto escalable y comprensible, debes seguir estas reglas:

*   **Carpeta de Documentación:** Crea y mantén una carpeta `/docs` en la raíz del proyecto.
*   **División por Categorías/Módulos:** Genera archivos `.md` separados para cada área lógica o función del sistema. Por ejemplo:
    *   `/docs/base_de_datos.md` (Para esquemas, políticas RLS y triggers)
    *   `/docs/autenticacion.md` (Flujos de login, roles y protección de rutas)
    *   `/docs/ui_componentes.md` (Reglas de Tailwind aplicadas, layouts base)
    *   `/docs/flujo_registro.md` (Lógica de la máquina de estados y validaciones)
*   **Estructura de cada archivo .md:** Cada vez que actualices o crees un documento, asegúrate de incluir:
    1.  **Qué se hizo:** Un resumen claro de la funcionalidad implementada.
    2.  **Decisiones Técnicas:** Por qué se estructuró de esa manera.
    3.  **Dependencias/Archivos afectados:** Rutas de los componentes o scripts principales involucrados.
    4.  **Pasos futuros:** Qué falta por conectar o mejorar en ese módulo.
*   **Actualización Continua:** Antes de dar por terminada cualquier tarea o de entregarme el código final de un módulo, debes actualizar el archivo `.md` correspondiente para que siempre refleje el estado actual del proyecto.