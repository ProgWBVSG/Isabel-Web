import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonios = [
  {
    name: "Marta Garcés",
    age: "58",
    image: "https://i.postimg.cc/XvRM9mgw/Captura-de-pantalla-2026-04-06-130543.png",
    quote: "A los 58 años, sentía que ya había dado todo y vivía en automático. Estas sesiones me ayudaron a sacudirme el miedo al 'qué dirán' y rediseñar mi rutina con un propósito que me apasiona. Hoy me siento más viva y dueña de mi tiempo que nunca.",
  },
  {
    name: "Elena Benítez",
    age: "62",
    image: "https://i.postimg.cc/CKfXMJVb/Captura-de-pantalla-2026-04-05-165054.png",
    quote: "Llegué a los 62 con el nido vacío y mucha incertidumbre. Encontré las herramientas prácticas para reinventarme sin sentir que era 'demasiado tarde'. Pasé de la parálisis a la acción, recuperando la confianza en mis propios talentos y proyectos.",
  },
  {
    name: "Silvia Quintana",
    age: "54",
    image: "https://i.postimg.cc/0NgZnsLc/Captura-de-pantalla-2026-04-09-113124.png",
    quote: "Este espacio fue el impulso que necesitaba para dejar de postergarme. A mis 54 años, aprendí que esta etapa no es el final, sino el mejor momento para elegirme. Recibí calidez pura y claridad total para buscar un cambio real en mi vida.",
  },
];

export default function Testimonios() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-olive text-cream">
      <section className="py-24 flex-grow">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">Historias Reales</h2>
            <p className="text-lg font-light text-cream/70">Mujeres que ya están vibrando.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonios.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm"
              >
                {/* Foto */}
                <div className="w-full h-52 overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-serif text-lg leading-tight">{t.name}</h4>
                      <p className="text-cream/50 text-sm">{t.age} años</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3.5 w-3.5 text-terracotta" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="font-light text-sm leading-relaxed text-cream/80 italic">"{t.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
