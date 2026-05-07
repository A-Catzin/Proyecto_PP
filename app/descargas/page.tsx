import PageHeader from "@/components/ui/PageHeader";
import { DownloadIcon, DocumentIcon } from "@/components/ui/Icons";

const DOCUMENTOS = [
  { id: 1, nombre: "Carta Compromiso", descripcion: "Documento oficial de compromiso con la institución", disponible: true, fecha: "15 Abr 2026" },
  { id: 2, nombre: "Plan de Trabajo", descripcion: "Plan de actividades aprobado por tu jefe inmediato", disponible: true, fecha: "20 Abr 2026" },
  { id: 3, nombre: "Carta de Aceptación", descripcion: "Carta de aceptación emitida por la institución", disponible: false, fecha: "—" },
  { id: 4, nombre: "Constancia de Terminación", descripcion: "Se habilita al completar 480 horas y documentos en regla", disponible: false, fecha: "—" },
];

export default function DescargasAlumnoPage() {
  return (
    <>
      <PageHeader
        title="Descargas"
        description="Documentos generados automáticamente con tus datos registrados."
        icon={<DownloadIcon className="w-5 h-5" />}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {DOCUMENTOS.map((doc) => (
          <div
            key={doc.id}
            className={`bg-white shadow-sm rounded-lg p-5 border-l-4 ${
              doc.disponible ? "border-l-emerald-600" : "border-l-gray-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                doc.disponible ? "bg-emerald-600/10 text-emerald-700" : "bg-gray-100 text-gray-400"
              }`}>
                <DocumentIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">{doc.nombre}</h3>
                <p className="text-xs text-gray-500 mt-1">{doc.descripcion}</p>
                <p className="text-xs text-gray-400 mt-2">{doc.fecha}</p>
              </div>
            </div>
            <button
              className={`mt-4 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                doc.disponible
                  ? "bg-indigo-900 text-white hover:bg-indigo-800"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!doc.disponible}
            >
              {doc.disponible ? (
                <span className="flex items-center justify-center gap-2">
                  <DownloadIcon className="w-4 h-4" /> Descargar PDF
                </span>
              ) : (
                "No disponible"
              )}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
