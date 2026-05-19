import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { renderText } from '../utils/text';
import siteContent from '../data/content.json';

const content: Record<string, string> = siteContent as any;

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
                {renderText(content.sobremi_title, "Soy *Isabel Martínez de Campos*")}
              </h2>
              <div className="space-y-6 text-lg text-ink-light font-light leading-relaxed">
                {renderText(
                  content.sobremi_intro,
                  "Periodista • Emprendedora • Midlife Coach\n\nY, sobre todo, una mujer que también atravesó esta etapa.",
                  "text-terracotta font-medium tracking-widest uppercase text-sm"
                )}
                {renderText(content.sobremi_historia, "Durante años trabajé sin parar...\n\n*Pero dentro mío empezó a crecer otra pregunta...*")}
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
              href="https://reinventadas5-0.tiendup.com/page/disenar-tu-proxima-etapa"
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
