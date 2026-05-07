import Link from "next/link";
import { BriefcaseIcon, UsersIcon, BuildingIcon, ChartIcon, GraduationIcon, ShieldIcon } from "@/components/ui/Icons";

const PASOS = [
  { num: 1, titulo: "Registro y Validación", desc: "Creá tu cuenta y el sistema validará tus créditos automáticamente.", icon: <ShieldIcon className="w-6 h-6" /> },
  { num: 2, titulo: "Postulación", desc: "Explorá las vacantes y postulate al programa que se ajuste a tu perfil.", icon: <BriefcaseIcon className="w-6 h-6" /> },
  { num: 3, titulo: "Ejecución", desc: "Subí tus reportes mensuales y llevá el control de horas acumuladas.", icon: <ChartIcon className="w-6 h-6" /> },
  { num: 4, titulo: "Liberación", desc: "Al completar las horas, descargá tu constancia de terminación.", icon: <GraduationIcon className="w-6 h-6" /> },
];

const ESTADISTICAS = [
  { valor: "128", label: "Alumnos activos", icon: <UsersIcon className="w-6 h-6" /> },
  { valor: "15", label: "Instituciones", icon: <BuildingIcon className="w-6 h-6" /> },
  { valor: "45", label: "Programas disponibles", icon: <BriefcaseIcon className="w-6 h-6" /> },
  { valor: "342", label: "Procesos completados", icon: <ChartIcon className="w-6 h-6" /> },
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-900 flex items-center justify-center mb-6">
          <GraduationIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-indigo-900 max-w-3xl leading-tight">
          Plataforma Integral de Prácticas Profesionales y Servicio Social
        </h1>
        <p className="text-gray-500 text-lg mt-4 max-w-2xl">
          Sistema oficial de gestión y seguimiento de prácticas profesionales. 
          Conectamos estudiantes, instituciones y administradores en un solo lugar.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href="/programas"
            className="bg-indigo-900 text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-indigo-800 transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <BriefcaseIcon className="w-4 h-4" />
            Ver Programas
          </Link>
          <Link
            href="/faq"
            className="border border-gray-200 text-gray-900 rounded-lg px-6 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Guía de Pasos
          </Link>
        </div>
      </div>

      {/* Stats banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {ESTADISTICAS.map((e) => (
          <div key={e.label} className="bg-white shadow-sm rounded-lg p-5 text-center border-t-2 border-t-blue-900">
            <div className="w-10 h-10 mx-auto rounded-lg bg-blue-900/10 flex items-center justify-center text-blue-900 mb-3">
              {e.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{e.valor}</p>
            <p className="text-xs text-gray-500 mt-1">{e.label}</p>
          </div>
        ))}
      </div>

      {/* Cómo funciona */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-indigo-900">¿Cómo funciona?</h2>
          <p className="text-gray-500 mt-2">Cuatro pasos simples para completar tu servicio social</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((paso) => (
            <div key={paso.num} className="bg-white shadow-sm rounded-lg p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-indigo-900 text-white text-xs font-bold flex items-center justify-center">
                {paso.num}
              </div>
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-900/10 flex items-center justify-center text-blue-900 mt-3 mb-4">
                {paso.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{paso.titulo}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{paso.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Marco normativo + Avisos */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white shadow-sm rounded-lg border-l-4 border-l-indigo-900 p-6">
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">Marco Normativo</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-indigo-900 mt-0.5">▸</span>
              Reglamento General de Servicio Social Universitario
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-900 mt-0.5">▸</span>
              Lineamientos para Prácticas Profesionales — Artículo 24
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-900 mt-0.5">▸</span>
              Ley Reglamentaria del Ejercicio Profesional
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-900 mt-0.5">▸</span>
              Convenio Marco de Colaboración Interinstitucional
            </li>
          </ul>
        </div>

        <div className="bg-white shadow-sm rounded-lg border-l-4 border-l-blue-900 p-6">
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">Avisos Recientes</h2>
          <div className="space-y-4">
            {[
              { fecha: "05 May 2026", texto: "Nuevas vacantes disponibles en el sector de tecnología e innovación." },
              { fecha: "02 May 2026", texto: "Prórroga para entrega de reportes del mes de abril hasta el día 15." },
              { fecha: "28 Abr 2026", texto: "Capacitación virtual para jefes inmediatos — Miércoles 10 AM." },
            ].map((aviso, i) => (
              <div key={i} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <p className="text-xs text-gray-400 mb-1">{aviso.fecha}</p>
                <p className="text-sm text-gray-700">{aviso.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
