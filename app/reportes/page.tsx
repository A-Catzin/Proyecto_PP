import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { DocumentIcon, ClockIcon } from "@/components/ui/Icons";

const REPORTES = [
  { id: 1, tipo: "Reporte Mensual", mes: "Abril 2026", horas: 42, estatus: "aprobado", fecha: "30 Abr 2026" },
  { id: 2, tipo: "Bitácora", mes: "Marzo 2026", horas: 38, estatus: "aprobado", fecha: "31 Mar 2026" },
  { id: 3, tipo: "Reporte Mensual", mes: "Febrero 2026", horas: 44, estatus: "pendiente", fecha: "28 Feb 2026" },
];

const statusBadge: Record<string, string> = {
  aprobado: "bg-emerald-600/10 text-emerald-700",
  pendiente: "bg-amber-500/10 text-amber-600",
  rechazado: "bg-red-600/10 text-red-600",
};

const statusLabel: Record<string, string> = {
  aprobado: "Aprobado",
  pendiente: "Pendiente",
  rechazado: "Rechazado",
};

export default function ReportesAlumnoPage() {
  return (
    <>
      <PageHeader
        title="Reportes y Bitácoras"
        description="Subí y gestioná tus reportes mensuales y bitácoras de actividades."
        icon={<DocumentIcon className="w-5 h-5" />}
      />

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Historial de Reportes</h2>
          <button className="bg-indigo-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-indigo-800 transition-colors" disabled>
            + Nuevo reporte
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Tipo</th>
              <th className="px-6 py-3 text-left font-medium">Periodo</th>
              <th className="px-6 py-3 text-left font-medium">Horas</th>
              <th className="px-6 py-3 text-left font-medium">Estatus</th>
              <th className="px-6 py-3 text-left font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {REPORTES.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{r.tipo}</td>
                <td className="px-6 py-4 text-gray-500">{r.mes}</td>
                <td className="px-6 py-4 text-gray-500">{r.horas} hrs</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusBadge[r.estatus]}`}>
                    {statusLabel[r.estatus]}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{r.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EmptyState
        icon={<ClockIcon className="w-6 h-6" />}
        title="Reportes futuros"
        description="Los reportes de los próximos meses aparecerán aquí conforme avances en tu proceso."
      />
    </>
  );
}
