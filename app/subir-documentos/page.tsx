'use client';

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { DocumentIcon, CheckIcon, ClockIcon } from "@/components/ui/Icons";

interface DocumentoSubido {
  id: number;
  nombre: string;
  tipo: string;
  tamanio: string;
  fecha: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
}

const DOCS_INICIALES: DocumentoSubido[] = [
  { id: 1, nombre: "curriculum_vitae.pdf", tipo: "CV", tamanio: "245 KB", fecha: "10 Abr 2026", estado: "aprobado" },
  { id: 2, nombre: "carta_presentacion.pdf", tipo: "Carta presentación", tamanio: "180 KB", fecha: "12 Abr 2026", estado: "aprobado" },
  { id: 3, nombre: "kardex_calificaciones.pdf", tipo: "Kárdex", tamanio: "520 KB", fecha: "02 May 2026", estado: "pendiente" },
];

const estadoBadge: Record<string, string> = {
  pendiente: "bg-amber-500/10 text-amber-600",
  aprobado: "bg-emerald-600/10 text-emerald-700",
  rechazado: "bg-red-600/10 text-red-600",
};

const estadoLabel: Record<string, string> = {
  pendiente: "Pendiente",
  aprobado: "Aprobado",
  rechazado: "Rechazado",
};

const TIPOS_DOC = [
  "Curriculum Vitae (CV)",
  "Carta de presentación",
  "Kárdex de calificaciones",
  "Credencial de estudiante",
  "Comprobante de seguro",
  "Certificado médico",
  "Carta compromiso firmada",
  "Otro",
];

export default function SubirDocumentosPage() {
  const [documentos, setDocumentos] = useState<DocumentoSubido[]>(DOCS_INICIALES);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<string>("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("");

  const handleSubir = () => {
    if (!archivoSeleccionado || !tipoSeleccionado) return;
    const nuevo: DocumentoSubido = {
      id: Date.now(),
      nombre: archivoSeleccionado,
      tipo: tipoSeleccionado,
      tamanio: "— KB",
      fecha: new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" }),
      estado: "pendiente",
    };
    setDocumentos((prev) => [nuevo, ...prev]);
    setArchivoSeleccionado("");
    setTipoSeleccionado("");
  };

  return (
    <>
      <PageHeader
        title="Subir Documentos"
        description="Adjuntá los documentos requeridos para tu expediente de prácticas profesionales."
        icon={<DocumentIcon className="w-5 h-5" />}
      />

      {/* Zona de subida */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Nuevo documento
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tipo de documento
            </label>
            <select
              value={tipoSeleccionado}
              onChange={(e) => setTipoSeleccionado(e.target.value)}
              className="w-full border border-gray-200 rounded-md text-sm px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-900"
            >
              <option value="">Seleccionar tipo...</option>
              {TIPOS_DOC.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Archivo (PDF, JPG, PNG — máx. 5 MB)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-900/50 transition-colors cursor-pointer bg-gray-50">
              <DocumentIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-1">
                Arrastrá tu archivo o hacé clic para seleccionar
              </p>
              <p className="text-xs text-gray-400">PDF, JPG, PNG — máx. 5 MB</p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="file-upload"
                disabled
              />
              <label
                htmlFor="file-upload"
                className="mt-3 inline-block text-sm font-medium text-blue-900 hover:text-blue-800 cursor-pointer"
              >
                Seleccionar archivo
              </label>
            </div>
          </div>
        </div>

        {/* Simulador de subida */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 mb-2">
            💡 Modo simulación: escribí el nombre del archivo para probar.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={archivoSeleccionado}
              onChange={(e) => setArchivoSeleccionado(e.target.value)}
              placeholder="Ej: mi_cv_actualizado.pdf"
              className="flex-1 border border-gray-200 rounded-md text-sm px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-900"
            />
            <button
              onClick={handleSubir}
              disabled={!archivoSeleccionado || !tipoSeleccionado}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                !archivoSeleccionado || !tipoSeleccionado
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-900 text-white hover:bg-indigo-800"
              }`}
            >
              Subir
            </button>
          </div>
        </div>
      </div>

      {/* Documentos subidos */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">
            Documentos subidos ({documentos.length})
          </h2>
        </div>
        {documentos.length === 0 ? (
          <EmptyState
            icon={<DocumentIcon className="w-6 h-6" />}
            title="Sin documentos"
            description="Subí tus documentos usando el formulario de arriba."
          />
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Documento</th>
                <th className="px-6 py-3 text-left font-medium">Tipo</th>
                <th className="px-6 py-3 text-left font-medium">Tamaño</th>
                <th className="px-6 py-3 text-left font-medium">Fecha</th>
                <th className="px-6 py-3 text-left font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {documentos.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <DocumentIcon className="w-4 h-4 text-gray-400" />
                      {doc.nombre}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{doc.tipo}</td>
                  <td className="px-6 py-4 text-gray-500">{doc.tamanio}</td>
                  <td className="px-6 py-4 text-gray-500">{doc.fecha}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${estadoBadge[doc.estado]}`}>
                      {estadoLabel[doc.estado]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
