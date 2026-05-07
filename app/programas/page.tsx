import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { BuildingIcon, BriefcaseIcon, SearchIcon } from "@/components/ui/Icons";

const PROGRAMS = [
  {
    id: 1,
    nombre: "Desarrollo de Software Educativo",
    institucion: "Instituto Tecnológico Superior",
    modalidad: "Presencial",
    plazas: 5,
    ubicacion: "Ciudad Universitaria",
  },
  {
    id: 2,
    nombre: "Gestión de Base de Datos",
    institucion: "Secretaría de Educación",
    modalidad: "Remoto",
    plazas: 3,
    ubicacion: "Remoto",
  },
  {
    id: 3,
    nombre: "Soporte Técnico a Comunidades",
    institucion: "Fundación Conecta",
    modalidad: "Presencial",
    plazas: 8,
    ubicacion: "Zona Sur",
  },
  {
    id: 4,
    nombre: "Análisis de Datos Estadísticos",
    institucion: "INEGI Regional",
    modalidad: "Híbrido",
    plazas: 4,
    ubicacion: "Centro",
  },
  {
    id: 5,
    nombre: "Redes y Telecomunicaciones",
    institucion: "Telcomm Nacional",
    modalidad: "Presencial",
    plazas: 6,
    ubicacion: "Parque Industrial",
  },
  {
    id: 6,
    nombre: "Administración de Proyectos TI",
    institucion: "Consultoría Global S.A.",
    modalidad: "Remoto",
    plazas: 2,
    ubicacion: "Remoto",
  },
];

const modalidadBadge: Record<string, string> = {
  Presencial: "bg-blue-900/10 text-blue-900",
  Remoto: "bg-emerald-600/10 text-emerald-700",
  Híbrido: "bg-amber-500/10 text-amber-600",
};

export default function ProgramasPage() {
  return (
    <>
      <PageHeader
        title="Catálogo de Programas"
        description="Explorá las vacantes disponibles para prácticas profesionales y servicio social."
        icon={<BriefcaseIcon className="w-5 h-5" />}
      />

      {/* Filtros */}
      <div className="bg-white shadow-sm rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <SearchIcon className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar programa..."
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 border-0 focus:outline-none"
            disabled
          />
        </div>
        <select
          className="border border-gray-200 rounded-md text-sm px-3 py-1.5 text-gray-500 bg-white"
          disabled
        >
          <option>Todas las modalidades</option>
        </select>
        <select
          className="border border-gray-200 rounded-md text-sm px-3 py-1.5 text-gray-500 bg-white"
          disabled
        >
          <option>Todas las ubicaciones</option>
        </select>
      </div>

      {/* Grid de programas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROGRAMS.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-sm rounded-lg border-l-4 border-l-blue-900 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-900/10 flex items-center justify-center text-blue-900">
                <BuildingIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  {p.nombre}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{p.institucion}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${modalidadBadge[p.modalidad]}`}
              >
                {p.modalidad}
              </span>
              <span className="text-xs text-gray-400">{p.ubicacion}</span>
              <span className="text-xs text-gray-400 ml-auto">
                {p.plazas} plazas
              </span>
            </div>
            <Link
              href="#"
              className="mt-3 inline-block text-sm font-medium text-blue-900 hover:text-blue-800"
            >
              Ver detalles →
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
