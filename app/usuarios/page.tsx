import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import { UsersIcon, GraduationIcon, BuildingIcon, ChartIcon } from "@/components/ui/Icons";

const USUARIOS = [
  { id: 1, nombre: "María F. López", rol: "alumno", institucion: "ITS", estado: "activo", registro: "15 Mar 2026" },
  { id: 2, nombre: "Carlos Mendoza", rol: "alumno", institucion: "ITS", estado: "activo", registro: "20 Mar 2026" },
  { id: 3, nombre: "Ing. Roberto Sánchez", rol: "institucion", institucion: "ITS", estado: "activo", registro: "10 Ene 2026" },
  { id: 4, nombre: "Ana Díaz", rol: "alumno", institucion: "SEP", estado: "activo", registro: "01 Abr 2026" },
  { id: 5, nombre: "Lic. Patricia Vega", rol: "institucion", institucion: "SEP", estado: "inactivo", registro: "05 Feb 2026" },
  { id: 6, nombre: "Dr. Manuel Torres", rol: "admin", institucion: "—", estado: "activo", registro: "01 Ene 2026" },
];

const rolBadge: Record<string, string> = {
  alumno: "bg-blue-900/10 text-blue-900",
  institucion: "bg-indigo-900/10 text-indigo-900",
  admin: "bg-emerald-600/10 text-emerald-700",
};

const rolLabel: Record<string, string> = {
  alumno: "Alumno",
  institucion: "Institución",
  admin: "Admin",
};

export default function UsuariosAdminPage() {
  return (
    <>
      <PageHeader
        title="Gestión de Usuarios"
        description="Administrá todos los usuarios registrados en la plataforma."
        icon={<UsersIcon className="w-5 h-5" />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Total usuarios" value={146} accent="indigo" icon={<UsersIcon className="w-5 h-5" />} />
        <StatCard title="Alumnos" value={128} accent="blue" icon={<GraduationIcon className="w-5 h-5" />} />
        <StatCard title="Instituciones" value={15} accent="green" icon={<BuildingIcon className="w-5 h-5" />} />
        <StatCard title="Admins" value={3} accent="amber" icon={<ChartIcon className="w-5 h-5" />} />
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Lista de Usuarios</h2>
          <button className="bg-indigo-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-indigo-800 transition-colors" disabled>
            + Nuevo usuario
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Nombre</th>
              <th className="px-6 py-3 text-left font-medium">Rol</th>
              <th className="px-6 py-3 text-left font-medium">Institución</th>
              <th className="px-6 py-3 text-left font-medium">Estado</th>
              <th className="px-6 py-3 text-left font-medium">Registro</th>
              <th className="px-6 py-3 text-left font-medium">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {USUARIOS.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{u.nombre}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${rolBadge[u.rol]}`}>
                    {rolLabel[u.rol]}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{u.institucion}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    u.estado === "activo" ? "bg-emerald-600/10 text-emerald-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {u.estado === "activo" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{u.registro}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-900 hover:text-blue-800 text-sm font-medium" disabled>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
