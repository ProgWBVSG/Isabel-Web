import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { renderText } from '../utils/text';
import siteContent from '../data/content.json';

const content: Record<string, string> = siteContent as any;

export default function Talleres() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-sand/30">
      <section className="py-32 flex-grow">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-serif font-light text-ink mb-6">
              {renderText(content.talleres_title, "Talleres para *mujeres 50+*")}
            </h2>
            <div className="text-xl text-ink-light font-light max-w-2xl">
              {renderText(content.talleres_desc, "Espacios grupales donde trabajamos los grandes temas de esta etapa de la vida.")}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Reinventarte después de los 50",
                desc: "Un espacio para repensar tu identidad, tus deseos y tu próxima etapa. Exploramos juntas qué dejás atrás y qué nuevo proyecto de vida querés construir.",
              },
              {
                num: "02",
                title: "Encontrar propósito en la segunda mitad de la vida",
                desc: "¿Qué significa vivir con más sentido después de los 50? En este taller exploramos herramientas concretas para reconectar con lo que realmente importa.",
              },
              {
                num: "03",
                title: "Volver a empezar",
                desc: "Para mujeres que sienten que una etapa cerró y quieren abrirse a una nueva con más conciencia, valentía y herramientas.",
              },
            ].map((taller, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group bg-white rounded-[2rem] p-10 shadow-sm border border-sand hover:shadow-lg hover:border-terracotta/30 transition-all duration-300"
              >
                <span className="font-serif text-5xl font-light text-terracotta/30 group-hover:text-terracotta transition-colors block mb-6">
                  {taller.num}
                </span>
                <h3 className="text-xl font-serif text-ink mb-4 leading-snug">{taller.title}</h3>
                <p className="text-ink-light font-light leading-relaxed">{taller.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 text-center"
          >
            <p className="text-ink-light font-light mb-6 text-lg">
              Los talleres son también una oportunidad para conectar con otras mujeres que están viviendo procesos similares.
            </p>
            <a
              href="https://reinventadas5-0.tiendup.com/page/disenar-tu-proxima-etapa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 text-sm tracking-widest uppercase font-medium rounded-full text-cream bg-ink hover:bg-terracotta transition-colors duration-300"
            >
              <ArrowRight className="h-4 w-4" />
              Quiero empezar
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
