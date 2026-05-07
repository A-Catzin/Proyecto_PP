import PageHeader from "@/components/ui/PageHeader";
import { CogIcon, ShieldIcon } from "@/components/ui/Icons";

const CONFIGS = [
  {
    seccion: "General",
    items: [
      { label: "Nombre de la plataforma", valor: "Plataforma de Prácticas Profesionales" },
      { label: "Horas requeridas", valor: "480" },
      { label: "Porcentaje mínimo de créditos", valor: "70%" },
      { label: "Periodo mínimo (meses)", valor: "6" },
      { label: "Periodo máximo (meses)", valor: "24" },
    ],
  },
  {
    seccion: "Notificaciones",
    items: [
      { label: "Email de notificaciones", valor: "no-reply@universidad.edu.mx", estado: "activo" },
      { label: "Notificar nuevo registro", valor: "Activado", estado: "activo" },
      { label: "Notificar cambio de estado", valor: "Activado", estado: "activo" },
      { label: "Recordatorio de reportes", valor: "Desactivado", estado: "inactivo" },
    ],
  },
];

export default function ConfiguracionAdminPage() {
  return (
    <>
      <PageHeader
        title="Configuración del Sistema"
        description="Administrá los parámetros globales de la plataforma."
        icon={<CogIcon className="w-5 h-5" />}
      />

      <div className="space-y-6">
        {CONFIGS.map((seccion) => (
          <div key={seccion.seccion} className="bg-white shadow-sm rounded-lg">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-900/10 flex items-center justify-center text-blue-900">
                <ShieldIcon className="w-4 h-4" />
              </div>
              <h2 className="font-semibold text-gray-900">{seccion.seccion}</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {seccion.items.map((item) => (
                <div
                  key={item.label}
                  className="px-6 py-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.valor}</p>
                  </div>
                  {"estado" in item ? (
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        item.estado === "activo"
                          ? "bg-emerald-600/10 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.estado === "activo" ? "Activo" : "Inactivo"}
                    </span>
                  ) : (
                    <button
                      className="text-blue-900 hover:text-blue-800 text-sm font-medium"
                      disabled
                    >
                      Editar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
