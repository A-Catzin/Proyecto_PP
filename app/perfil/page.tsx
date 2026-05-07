import PageHeader from "@/components/ui/PageHeader";
import { GraduationIcon } from "@/components/ui/Icons";

const DATOS = [
  { label: "Nombre completo", value: "María Fernanda López García" },
  { label: "Matrícula", value: "2021008472" },
  { label: "CURP", value: "LOGM010525MDFPRRA9" },
  { label: "Carrera", value: "Ingeniería en Sistemas Computacionales" },
  { label: "Semestre", value: "8°" },
  { label: "Créditos aprobados", value: "78%" },
  { label: "Correo institucional", value: "mlopez@universidad.edu.mx" },
  { label: "Teléfono", value: "+52 55 1234 5678" },
];

export default function PerfilAlumnoPage() {
  return (
    <>
      <PageHeader
        title="Perfil del Estudiante"
        description="Tus datos personales y académicos registrados en el sistema."
        icon={<GraduationIcon className="w-5 h-5" />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Avatar card */}
        <div className="bg-white shadow-sm rounded-lg p-6 flex flex-col items-center text-center lg:col-span-1">
          <div className="w-24 h-24 rounded-full bg-blue-900 flex items-center justify-center text-white text-3xl font-bold mb-4">
            ML
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            María Fernanda López
          </h2>
          <p className="text-sm text-gray-500">Ing. en Sistemas Computacionales</p>
          <div className="mt-4 w-full pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Estado</span>
              <span className="font-medium text-emerald-600">Activo</span>
            </div>
          </div>
        </div>

        {/* Datos */}
        <div className="bg-white shadow-sm rounded-lg p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Datos del Estudiante
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {DATOS.map((d) => (
              <div key={d.label}>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  {d.label}
                </p>
                <p className="text-sm text-gray-900 mt-1">{d.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
