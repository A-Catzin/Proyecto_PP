import PageHeader from "@/components/ui/PageHeader";
import { MegaphoneIcon } from "@/components/ui/Icons";

const FAQS = [
  {
    q: "¿Qué es el servicio social?",
    a: "Es una actividad obligatoria de carácter temporal que realizan los estudiantes en beneficio de la sociedad, aplicando los conocimientos adquiridos durante su formación académica.",
  },
  {
    q: "¿Cuántas horas debo completar?",
    a: "El mínimo requerido es de 480 horas, las cuales deben ser cumplidas en un periodo no menor a 6 meses ni mayor a 2 años.",
  },
  {
    q: "¿Cuáles son los requisitos para iniciar?",
    a: "Debés tener al menos el 70% de créditos aprobados de tu plan de estudios, estar inscrito en el semestre vigente y no tener adeudos académicos.",
  },
  {
    q: "¿Cómo elijo una plaza?",
    a: "Una vez autorizado tu registro, podés explorar el catálogo de programas disponibles, filtrar por carrera o ubicación, y postularte a la vacante que más se ajuste a tu perfil.",
  },
  {
    q: "¿Qué documentos necesito entregar?",
    a: "Carta de aceptación de la institución, reportes mensuales de actividades, bitácora de horas y, al finalizar, la carta de liberación firmada por tu jefe inmediato.",
  },
  {
    q: "¿Puedo cambiar de institución?",
    a: "Sí, siempre que exista una causa justificada y sea autorizada por el coordinador de prácticas. Deberás iniciar un nuevo proceso de postulación.",
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHeader
        title="Preguntas Frecuentes"
        description="Encontrá respuestas a las dudas más comunes sobre el proceso de prácticas profesionales."
        icon={<MegaphoneIcon className="w-5 h-5" />}
      />

      <div className="max-w-3xl space-y-4">
        {FAQS.map((faq, i) => (
          <details
            key={i}
            className="bg-white shadow-sm rounded-lg group"
          >
            <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 hover:text-indigo-900 transition-colors list-none flex items-center justify-between">
              {faq.q}
              <span className="text-gray-400 group-open:rotate-180 transition-transform ml-4 flex-shrink-0">
                ▼
              </span>
            </summary>
            <div className="px-6 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
