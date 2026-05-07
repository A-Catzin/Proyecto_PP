'use client';

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { SearchIcon, BuildingIcon, BriefcaseIcon } from "@/components/ui/Icons";

interface Plaza {
  id: number;
  nombre: string;
  institucion: string;
  modalidad: string;
  ubicacion: string;
  descripcion: string;
}

type EstadoSeleccion = 'disponible' | 'pendiente' | 'aceptado' | 'rechazado';

interface Seleccion {
  plazaId: number;
  estado: EstadoSeleccion;
}

const PLAZAS_DISPONIBLES: Plaza[] = [
  { id: 1, nombre: "Desarrollo Web Full Stack", institucion: "TechNova S.A.", modalidad: "Presencial", ubicacion: "Centro", descripcion: "Desarrollo de aplicaciones web con React y Node.js en equipo ágil." },
  { id: 2, nombre: "Soporte de Infraestructura TI", institucion: "GlobalNet", modalidad: "Remoto", ubicacion: "Remoto", descripcion: "Monitoreo y mantenimiento de servidores y redes corporativas." },
  { id: 3, nombre: "Programación de Microservicios", institucion: "InnovaSoft", modalidad: "Híbrido", ubicacion: "Zona Norte", descripcion: "Diseño e implementación de microservicios con Docker y Kubernetes." },
  { id: 4, nombre: "Análisis de Ciberseguridad", institucion: "SecureData", modalidad: "Presencial", ubicacion: "Parque Tecnológico", descripcion: "Auditorías de seguridad y análisis de vulnerabilidades." },
  { id: 5, nombre: "Desarrollo Móvil", institucion: "AppFactory", modalidad: "Remoto", ubicacion: "Remoto", descripcion: "Desarrollo de apps móviles multiplataforma con Flutter." },
  { id: 6, nombre: "Gestión de Proyectos Ágiles", institucion: "AgileCorp", modalidad: "Presencial", ubicacion: "Centro", descripcion: "Coordinación de sprints y ceremonias ágiles con equipos multidisciplinarios." },
  { id: 7, nombre: "Data Science Aplicada", institucion: "DataLab MX", modalidad: "Híbrido", ubicacion: "Zona Sur", descripcion: "Análisis de datos con Python, pandas y visualización en PowerBI." },
  { id: 8, nombre: "Redes y Telecomunicaciones", institucion: "TelComm", modalidad: "Presencial", ubicacion: "Parque Industrial", descripcion: "Configuración de equipos de red y soporte a infraestructura de telecom." },
];

const modalidadBadge: Record<string, string> = {
  Presencial: "bg-blue-900/10 text-blue-900",
  Remoto: "bg-emerald-600/10 text-emerald-700",
  Híbrido: "bg-amber-500/10 text-amber-600",
};

const estadoBadge: Record<EstadoSeleccion, string> = {
  disponible: "",
  pendiente: "bg-amber-500/10 text-amber-600 border border-amber-300",
  aceptado: "bg-emerald-600/10 text-emerald-700 border border-emerald-300",
  rechazado: "bg-red-600/10 text-red-600 border border-red-300",
};

export default function PlazasAlumnoPage() {
  const [selecciones, setSelecciones] = useState<Seleccion[]>([]);
  const MAX_SELECCIONES = 3;

  const getEstado = (plazaId: number): EstadoSeleccion => {
    const sel = selecciones.find((s) => s.plazaId === plazaId);
    return sel ? sel.estado : 'disponible';
  };

  const contarPendientesYAceptadas = () =>
    selecciones.filter((s) => s.estado === 'pendiente' || s.estado === 'aceptado').length;

  const seleccionar = (plazaId: number) => {
    if (contarPendientesYAceptadas() >= MAX_SELECCIONES) return;
    setSelecciones((prev) => [...prev, { plazaId, estado: 'pendiente' }]);
  };

  const cambiarEstado = (plazaId: number, nuevoEstado: EstadoSeleccion) => {
    setSelecciones((prev) =>
      prev.map((s) =>
        s.plazaId === plazaId ? { ...s, estado: nuevoEstado } : s
      )
    );
  };

  const plazasSeleccionadas = PLAZAS_DISPONIBLES.filter(
    (p) => getEstado(p.id) !== 'disponible'
  );

  const plazasNoSeleccionadas = PLAZAS_DISPONIBLES.filter(
    (p) => getEstado(p.id) === 'disponible'
  );

  return (
    <>
      <PageHeader
        title="Selección de Plazas"
        description={`Elegí hasta ${MAX_SELECCIONES} opciones de prácticas. El admin confirmará una.`}
        icon={<BriefcaseIcon className="w-5 h-5" />}
      />

      {/* Selecciones activas */}
      {plazasSeleccionadas.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Mis selecciones ({contarPendientesYAceptadas()}/{MAX_SELECCIONES})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plazasSeleccionadas.map((plaza) => {
              const estado = getEstado(plaza.id);
              return (
                <div
                  key={plaza.id}
                  className={`bg-white shadow-sm rounded-lg p-5 ${
                    estado !== 'disponible' ? estadoBadge[estado] : ''
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-900/10 flex items-center justify-center text-blue-900">
                      <BuildingIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {plaza.nombre}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {plaza.institucion}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                    <span className={modalidadBadge[plaza.modalidad] + " px-2 py-0.5 rounded-full font-medium"}>
                      {plaza.modalidad}
                    </span>
                    <span>{plaza.ubicacion}</span>
                  </div>
                  {/* Estado y acciones */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs font-semibold capitalize">
                      {estado === 'pendiente' && '⏳ Pendiente'}
                      {estado === 'aceptado' && '✅ Aceptado'}
                      {estado === 'rechazado' && '❌ Rechazado'}
                    </span>
                    {estado === 'pendiente' && (
                      <span className="text-xs text-gray-400">
                        Esperando confirmación
                      </span>
                    )}
                    {estado === 'rechazado' && (
                      <button
                        onClick={() => {
                          setSelecciones((prev) =>
                            prev.filter((s) => s.plazaId !== plaza.id)
                          );
                        }}
                        className="text-xs text-blue-900 hover:text-blue-800 font-medium"
                      >
                        Liberar cupo
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Plazas disponibles */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Plazas disponibles
        </h2>

        {contarPendientesYAceptadas() >= MAX_SELECCIONES && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 text-sm text-amber-700">
            Ya seleccionaste el máximo de {MAX_SELECCIONES} opciones. Liberá un cupo rechazado para elegir otra.
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-2">
            <SearchIcon className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar plaza..."
              className="flex-1 text-sm text-gray-900 placeholder-gray-400 border-0 focus:outline-none"
              disabled
            />
          </div>
          <div className="divide-y divide-gray-100">
            {plazasNoSeleccionadas.map((plaza) => (
              <div
                key={plaza.id}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-900/10 flex items-center justify-center text-blue-900 mt-0.5">
                    <BuildingIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {plaza.nombre}
                    </h3>
                    <p className="text-xs text-gray-500">{plaza.institucion}</p>
                    <p className="text-xs text-gray-400 mt-1">{plaza.descripcion}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${modalidadBadge[plaza.modalidad]}`}>
                        {plaza.modalidad}
                      </span>
                      <span className="text-xs text-gray-400">{plaza.ubicacion}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => seleccionar(plaza.id)}
                  disabled={contarPendientesYAceptadas() >= MAX_SELECCIONES}
                  className={`flex-shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    contarPendientesYAceptadas() >= MAX_SELECCIONES
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-900 text-white hover:bg-indigo-800"
                  }`}
                >
                  Seleccionar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
