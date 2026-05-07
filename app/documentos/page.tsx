import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import { DocumentIcon, CheckIcon, ClockIcon } from "@/components/ui/Icons";

const DOCUMENTOS = [
  { id: 1, alumno: "María F. López", tipo: "Carta Compromiso", fecha: "15 Abr 2026", estado: "aprobado" },
  { id: 2, alumno: "Carlos Mendoza", tipo: "Carta de Aceptación", fecha: "20 Abr 2026", estado: "pendiente" },
  { id: 3, alumno: "Ana Díaz", tipo: "Reporte Mensual", fecha: "02 May 2026", estado: "pendiente" },
  { id: 4, alumno: "Luis Ángel Gómez", tipo: "Plan de Trabajo", fecha: "30 Abr 2026", estado: "rechazado" },
  { id: 5, alumno: "María F. López", tipo: "Reporte Mensual", fecha: "30 Abr 2026", estado: "aprobado" },
];

const estadoBadge: Record<string, string> = {
  aprobado: "bg-emerald-600/10 text-emerald-700",
  pendiente: "bg-amber-500/10 text-amber-600",
  rechazado: "bg-red-600/10 text-red-600",
};

const estadoLabel: Record<string, string> = {
  aprobado: "Aprobado",
  pendiente: "Pendiente",
  rechazado: "Rechazado",
};

export default function DocumentosAdminPage() {
  return (
    <>
      <PageHeader
        title="Validación de Documentos"
        description="Revisá y aprobá los documentos enviados por alumnos e instituciones."
        icon={<DocumentIcon className="w-5 h-5" />}
      />

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <StatCard title="Pendientes" value={12} accent="amber" icon={<ClockIcon className="w-5 h-5" />} />
        <StatCard title="Aprobados" value={87} accent="green" icon={<CheckIcon className="w-5 h-5" />} />
        <StatCard title="Rechazados" value={4} accent="indigo" icon={<DocumentIcon className="w-5 h-5" />} />
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Alumno</th>
              <th className="px-6 py-3 text-left font-medium">Documento</th>
              <th className="px-6 py-3 text-left font-medium">Fecha</th>
              <th className="px-6 py-3 text-left font-medium">Estado</th>
              <th className="px-6 py-3 text-left font-medium">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {DOCUMENTOS.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{d.alumno}</td>
                <td className="px-6 py-4 text-gray-500">{d.tipo}</td>
                <td className="px-6 py-4 text-gray-500">{d.fecha}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${estadoBadge[d.estado]}`}>
                    {estadoLabel[d.estado]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {d.estado === "pendiente" && (
                    <div className="flex gap-2">
                      <button className="text-emerald-600 hover:text-emerald-700 text-xs font-medium" disabled>Aprobar</button>
                      <button className="text-red-600 hover:text-red-700 text-xs font-medium" disabled>Rechazar</button>
                    </div>
                  )}
                  {d.estado !== "pendiente" && (
                    <button className="text-blue-900 hover:text-blue-800 text-xs font-medium" disabled>Ver</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
