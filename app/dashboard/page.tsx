import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import { ChartIcon, ClockIcon, CheckIcon, BriefcaseIcon } from "@/components/ui/Icons";

const RECENT_ACTIVITY = [
  { fecha: "05 May 2026", accion: "Reporte mensual enviado", estado: "Pendiente" },
  { fecha: "02 May 2026", accion: "Postulación aceptada — SEP", estado: "Aprobado" },
  { fecha: "28 Abr 2026", accion: "Carta compromiso firmada", estado: "Completado" },
  { fecha: "20 Abr 2026", accion: "Registro validado por Admin", estado: "Completado" },
];

const estadoBadge: Record<string, string> = {
  Pendiente: "bg-amber-500/10 text-amber-600",
  Aprobado: "bg-emerald-600/10 text-emerald-700",
  Completado: "bg-blue-900/10 text-blue-900",
};

export default function DashboardAlumnoPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Resumen de tu proceso de prácticas profesionales."
        icon={<ChartIcon className="w-5 h-5" />}
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Horas acumuladas"
          value="124"
          description="de 480 requeridas"
          accent="indigo"
          icon={<ClockIcon className="w-5 h-5" />}
        />
        <StatCard
          title="Reportes entregados"
          value="3"
          description="de 6 programados"
          accent="blue"
          icon={<BriefcaseIcon className="w-5 h-5" />}
        />
        <StatCard
          title="Estado del proceso"
          value="Activo"
          description="En ejecución"
          accent="green"
          icon={<CheckIcon className="w-5 h-5" />}
        />
        <StatCard
          title="Progreso"
          value="25.8%"
          description="Camino a la meta"
          accent="amber"
          icon={<ChartIcon className="w-5 h-5" />}
        />
      </div>

      {/* Progress bar */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">Progreso de horas</span>
          <span className="text-sm text-gray-500">124 / 480 hrs</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-indigo-900 h-3 rounded-full transition-all"
            style={{ width: "25.8%" }}
          />
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Actividad Reciente
        </h2>
        <div className="divide-y divide-gray-100">
          {RECENT_ACTIVITY.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.accion}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.fecha}</p>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${estadoBadge[item.estado]}`}
              >
                {item.estado}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
