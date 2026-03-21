import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, X, ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    q: "¿Para quién es este programa?",
    a: "Para mujeres de más de 50 años que sienten que están en una etapa de transición y buscan reinventarse con propósito, claridad y entusiasmo."
  },
  {
    q: "¿Cómo son las sesiones?",
    a: "Son encuentros individuales y personalizados de 60 minutos. Se realizan de forma online, lo que nos permite conectar sin importar dónde estés."
  },
  {
    q: "¿Qué pasa si no sé por dónde empezar?",
    a: "¡Es totalmente normal! El programa está diseñado justamente para acompañarte a descubrir esos deseos y talentos que quizás quedaron postergados."
  },
  {
    q: "¿Hay horarios flexibles?",
    a: "Sí, coordinamos los días y horarios de las sesiones según tu agenda y disponibilidad."
  },
  {
    q: "¿Cuál es la inversión?",
    a: "Puedes encontrar los detalles de la inversión en la sección correspondiente de la web o consultarme directamente por WhatsApp."
  }
];

export default function FAQAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom left' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[320px] md:w-[380px] bg-white rounded-[2rem] shadow-2xl border border-sand overflow-hidden"
          >
            {/* Header */}
            <div className="bg-ink p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-serif text-cream">Preguntas Frecuentes</h3>
                <p className="text-cream/60 text-xs uppercase tracking-widest mt-1">Asistente de Ayuda</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-cream/50 hover:text-cream transition-colors"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            {/* FAQ List */}
            <div className="max-h-[400px] overflow-y-auto p-4 space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="border-b border-sand last:border-0">
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                    className="w-full py-4 px-2 flex justify-between items-center text-left hover:bg-sand/20 transition-colors group"
                  >
                    <span className="text-sm font-medium text-ink pr-4 group-hover:text-terracotta transition-colors">{faq.q}</span>
                    {expandedIndex === i ? <ChevronUp size={16} className="text-terracotta" /> : <ChevronDown size={16} className="text-sand-dark" />}
                  </button>
                  <AnimatePresence>
                    {expandedIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-2 pb-4 text-sm text-ink-light font-light leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-cream/50 border-t border-sand text-center">
              <p className="text-xs text-ink-light mb-3 italic">¿Todavía tienes dudas?</p>
              <a
                href="https://wa.me/5491154581170"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-terracotta font-medium hover:underline"
              >
                Pregúntame por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen ? 'bg-terracotta text-cream' : 'bg-ink text-cream'
        }`}
        aria-label="Asistente de FAQ"
      >
        {isOpen ? <X size={28} /> : <HelpCircle size={28} />}
      </motion.button>
    </div>
  );
}
