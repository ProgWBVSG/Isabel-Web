import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function SobreMi() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <section className="py-32 bg-cream flex-grow">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          >
            <motion.div variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.7 }} className="order-2 lg:order-1">
              <h2 className="text-5xl font-serif font-light text-ink mb-8">
                Soy <span className="italic text-terracotta">Isabel Martínez de Campos</span>
              </h2>
              <div className="space-y-6 text-lg text-ink-light font-light leading-relaxed">
                <p className="text-terracotta font-medium tracking-widest uppercase text-sm">
                  Periodista • Emprendedora • Midlife Coach
                </p>
                <p>
                  Y, sobre todo, una mujer que también atravesó esta etapa.
                </p>
                <p>
                  Durante años trabajé sin parar. Primero como periodista y luego como dueña de una agencia de contenidos.
                </p>
                <p>
                  Mi vida era trabajo. Clientes. Plazos. Noches sin dormir.
                </p>
                <p>
                  Muchas veces me preguntaba: ¿Por qué sigo haciendo esto?
                </p>
                <p>
                  La respuesta era clara: sostener a mi familia, darles a mis hijos una buena vida.
                </p>
                <p className="text-xl font-serif italic text-terracotta">
                  Pero dentro mío empezó a crecer otra pregunta: ¿Esto es todo?
                </p>
                <p>
                  Cuando cumplí 50 empecé a mirar a mi alrededor y descubrí algo que me impactó profundamente.
                </p>
                <p>
                  Muchas mujeres estaban atravesando lo mismo:
                </p>
                <ul className="space-y-2 pl-2">
                  <li className="flex gap-3"><span className="text-terracotta">—</span>depresión silenciosa,</li>
                  <li className="flex gap-3"><span className="text-terracotta">—</span>separaciones.</li>
                  <li className="flex gap-3"><span className="text-terracotta">—</span>nido vacío.</li>
                  <li className="flex gap-3"><span className="text-terracotta">—</span>miedo al paso del tiempo.</li>
                  <li className="flex gap-3"><span className="text-terracotta">—</span>dificultad para reinventarse laboralmente.</li>
                  <li className="flex gap-3"><span className="text-terracotta">—</span>sueños postergados.</li>
                </ul>
                <p>
                  Y algo aún más profundo: la sensación de volverse invisibles en una sociedad que idolatra la juventud.
                </p>
                <p>
                  Fue entonces cuando decidí estudiar coaching.
                </p>
                <p>
                  No fue una solución mágica, pero me dio herramientas para comprender algo muy importante:
                  la mitad de la vida puede ser un momento de transformación.
                </p>
                <p className="text-2xl font-serif italic text-ink my-8 border-l-2 border-terracotta pl-6">
                  Sin embargo, me llevó diez años animarme a crear este proyecto. Diez años luchando contra mis propios miedos, la procrastinación y esa voz interna que decía que ya era tarde.
                </p>
                <p>
                  Hasta que entendí algo:
                </p>
                <p className="text-xl font-serif italic text-terracotta">
                  si tantas mujeres están pasando por esto, necesitamos espacios donde hablarlo, entenderlo y transformarlo.
                </p>
                <p>
                  Así nació Reinventadas 5.0. Una comunidad para mujeres que quieren vivir esta etapa con más conciencia, libertad y propósito.
                </p>
              </div>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.7 }} className="order-1 lg:order-2 relative">
              <div className="aspect-[3/4] rounded-[2rem] overflow-hidden">
                <img
                  src="/images/FotoSobreMi.jpg"
                  alt="Isabel Martinez Campos"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA después de About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 lg:px-12 py-12 mt-20 border-t border-sand"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xl font-serif italic text-ink-light max-w-lg">
              "Si yo pude reinventarme, vos también podés. Solo necesitás dar el primer paso."
            </p>
            <a
              href="https://reinventadas5-0.tiendup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-8 py-4 text-sm tracking-widest uppercase font-medium rounded-full text-cream bg-terracotta hover:bg-terracotta/80 transition-colors duration-300 shadow-md"
            >
              <ArrowRight className="h-4 w-4" />
              Más info
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
