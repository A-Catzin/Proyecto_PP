import PageHeader from "@/components/ui/PageHeader";
import { ChartIcon, UsersIcon, BriefcaseIcon, BuildingIcon } from "@/components/ui/Icons";

const ESTADISTICAS = [
  { label: "Alumnos activos", valor: 128, color: "text-blue-900", bg: "bg-blue-900" },
  { label: "Instituciones registradas", valor: 15, color: "text-indigo-900", bg: "bg-indigo-900" },
  { label: "Procesos completados", valor: 342, color: "text-emerald-600", bg: "bg-emerald-600" },
  { label: "Horas totales registradas", valor: 45820, color: "text-amber-500", bg: "bg-amber-500" },
];

const CARRERAS = [
  { nombre: "Ing. en Sistemas", alumnos: 45, porcentaje: 35 },
  { nombre: "Ing. Industrial", alumnos: 32, porcentaje: 25 },
  { nombre: "Ing. Civil", alumnos: 18, porcentaje: 14 },
  { nombre: "Lic. en Administración", alumnos: 22, porcentaje: 17 },
  { nombre: "Otras", alumnos: 11, porcentaje: 9 },
];

const barColors = ["bg-indigo-900", "bg-blue-900", "bg-emerald-600", "bg-amber-500", "bg-gray-400"];

export default function ReportesAdminPage() {
  return (
    <>
      <PageHeader
        title="Reportes Estadísticos"
        description="Visualizá las métricas globales del sistema de prácticas profesionales."
        icon={<ChartIcon className="w-5 h-5" />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {ESTADISTICAS.map((e) => (
          <div key={e.label} className="bg-white shadow-sm rounded-lg p-5">
            <p className="text-sm text-gray-500">{e.label}</p>
            <p className={`text-2xl font-bold mt-1 ${e.color}`}>{e.valor.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Distribución por carrera */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Distribución por Carrera
          </h2>
          <div className="space-y-4">
            {CARRERAS.map((c, i) => (
              <div key={c.nombre}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">{c.nombre}</span>
                  <span className="font-medium text-gray-900">{c.alumnos}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${barColors[i]} h-2 rounded-full`}
                    style={{ width: `${c.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Procesos por estado */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Procesos por Estado
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Activos", valor: 86, color: "bg-emerald-600" },
              { label: "Pendientes", valor: 34, color: "bg-amber-500" },
              { label: "Finalizados", valor: 342, color: "bg-blue-900" },
              { label: "Rechazados", valor: 12, color: "bg-red-600" },
            ].map((p) => (
              <div key={p.label} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${p.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold text-gray-900">{p.valor}</p>
                <p className="text-xs text-gray-500">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
