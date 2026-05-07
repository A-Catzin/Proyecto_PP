# 🔄 Flujo de Selección de Plazas

## Reglas de Negocio

1. El alumno puede seleccionar **máximo 3 plazas**.
2. Al seleccionar, el estado inicial es **pendiente**.
3. El admin puede cambiar el estado de cada plaza a **aceptado** o **rechazado**.
4. Si una plaza es **rechazada**, el cupo se libera automáticamente y el alumno puede elegir otra.
5. Solo **una plaza** puede quedar como **aceptado**. Las demás deben rechazarse.
6. Los datos de plazas disponibles vendrán de Supabase (tabla `plazas_disponibles`). Actualmente se usan datos placeholder.

## Máquina de Estados

```
                 ┌─────────────┐
                 │  Disponible  │  ←── Plaza en el catálogo, sin seleccionar
                 └──────┬──────┘
                        │ Alumno hace clic en "Seleccionar"
                        ▼
                 ┌─────────────┐
           ┌─────│  Pendiente   │─────┐
           │     └─────────────┘     │
           │ Admin rechaza           │ Admin acepta
           ▼                         ▼
    ┌─────────────┐          ┌─────────────┐
    │  Rechazado   │          │  Aceptado    │  ←── Solo UNA puede estar aquí
    └──────┬──────┘          └─────────────┘
           │
           │ Alumno hace clic en "Liberar cupo"
           ▼
    ┌─────────────┐
    │  Disponible  │  ←── Vuelve al catálogo, alumno puede elegir otra
    └─────────────┘
```

## Implementación Actual

El componente `app/plazas/page.tsx` es un **Client Component** que maneja el estado localmente:

```typescript
const [selecciones, setSelecciones] = useState<Seleccion[]>([]);
const MAX_SELECCIONES = 3;
```

### Estructura de datos

```typescript
interface Seleccion {
  plazaId: number;
  estado: 'pendiente' | 'aceptado' | 'rechazado';
}
```

### Funciones clave

| Función | Descripción |
|---------|-------------|
| `seleccionar(plazaId)` | Agrega una plaza al array con estado `pendiente`. Bloquea si ya hay 3. |
| `cambiarEstado(plazaId, nuevoEstado)` | Cambia el estado de una selección existente. |
| `contarPendientesYAceptadas()` | Cuenta cuántas selecciones NO están rechazadas (límite de 3). |
| `getEstado(plazaId)` | Devuelve el estado actual de una plaza. |

### Interfaz de Usuario

La página se divide en dos secciones:

1. **Mis selecciones** (arriba): Grid de tarjetas con las plazas seleccionadas.
   - Pendiente: "⏳ Pendiente — Esperando confirmación"
   - Aceptado: "✅ Aceptado"
   - Rechazado: "❌ Rechazado" + botón "Liberar cupo"

2. **Plazas disponibles** (abajo): Tabla con lista de plazas no seleccionadas.
   - Cada fila: nombre, institución, descripción, modalidad (badge), botón "Seleccionar".
   - Si ya hay 3 selecciones activas: mensaje amarillo + botones deshabilitados.

## Datos Placeholder

8 plazas hardcodeadas en `PLAZAS_DISPONIBLES`. Cada una tiene:
- `id`, `nombre`, `institucion`, `modalidad` (Presencial/Remoto/Híbrido), `ubicacion`, `descripcion`

## Conexión Futura con Supabase

Cuando se implemente el backend:

```sql
-- Tabla de plazas (gestionada por admin)
CREATE TABLE plazas_disponibles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_proyecto TEXT NOT NULL,
  descripcion TEXT,
  modalidad TEXT CHECK (modalidad IN ('presencial', 'remoto', 'hibrido')),
  ubicacion TEXT,
  plazas_totales INT,
  plazas_ocupadas INT DEFAULT 0,
  activa BOOLEAN DEFAULT true
);

-- Selecciones de alumnos
CREATE TABLE seleccion_plazas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estudiante_id UUID REFERENCES estudiantes(id),
  plaza_id UUID REFERENCES plazas_disponibles(id),
  estado TEXT CHECK (estado IN ('pendiente', 'aceptado', 'rechazado')),
  fecha_seleccion TIMESTAMPTZ DEFAULT now(),
  orden_preferencia INT CHECK (orden_preferencia BETWEEN 1 AND 3),
  UNIQUE(estudiante_id, plaza_id)
);
```

La lógica actual de `useState` se migrará a llamadas a la API de Supabase (`supabase.from('seleccion_plazas').select()`, `.insert()`, `.update()`).
