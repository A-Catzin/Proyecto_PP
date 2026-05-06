import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white shadow-sm rounded-lg p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-900 mb-4">
          Plataforma Integral de Prácticas Profesionales y Servicio Social
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Sistema oficial de gestión y seguimiento de prácticas profesionales
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/programas"
            className="bg-indigo-900 text-white rounded-md px-6 py-3 text-sm font-medium hover:bg-indigo-800 transition-colors"
          >
            Ver Programas
          </Link>
          <Link
            href="/guia"
            className="border border-gray-200 text-gray-900 rounded-md px-6 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Guía de Pasos
          </Link>
        </div>
      </div>
    </div>
  );
}
