import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export default function Testimonios() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-olive text-cream">
      <section className="py-32 flex-grow">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-serif font-light mb-6">Historias Reales</h2>
            <p className="text-xl font-light text-cream/70">Mujeres que ya están vibrando.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: "Marta Garcés",
                age: "58",
                image: "/images/marta.jpg",
                quote: "A los 58 años, sentía que ya había dado todo y vivía en automático. Estas sesiones me ayudaron a sacudirme el miedo al 'qué dirán' y rediseñar mi rutina con un propósito que me apasiona. Hoy me siento más viva y dueña de mi tiempo que nunca.",
              },
              {
                name: "Elena Benítez",
                age: "62",
                image: "/images/elena.jpg",
                quote: "Llegué a los 62 con el nido vacío y mucha incertidumbre. Encontré las herramientas prácticas para reinventarme sin sentir que era 'demasiado tarde'. Pasé de la parálisis a la acción, recuperando la confianza en mis propios talentos y proyectos.",
              },
              {
                name: "Silvia Quintana",
                age: "54",
                image: "/images/silvia.jpg",
                quote: "Este espacio fue el impulso que necesitaba para dejar de postergarme. A mis 54 años, aprendí que esta etapa no es el final, sino el mejor momento para elegirme. Recibí calidez pura y claridad total para buscar un cambio real en mi vida.",
              },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className="bg-white/5 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm relative">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-terracotta shadow-lg shrink-0">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl mb-1">{t.name}, {t.age}</h4>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-terracotta" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-light text-lg leading-relaxed text-cream/90 italic">"{t.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
