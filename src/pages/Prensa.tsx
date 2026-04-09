import { motion } from 'motion/react';
import { Mic, Newspaper, ExternalLink } from 'lucide-react';

export default function Prensa() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-sand/20">
      <section className="py-32 flex-grow">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <h2 className="text-5xl md:text-6xl font-serif font-light text-ink mb-6">
              Reinventadas <span className="italic text-terracotta">en los Medios</span>
            </h2>
            <p className="text-xl text-ink-light font-light max-w-2xl mx-auto">
              Conversaciones, entrevistas y artículos sobre la segunda mitad de la vida.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* PODCAST CARD */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-sand hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-[#1DB954]/10 px-10 pt-10 pb-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center shrink-0">
                  <Mic className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink/70 font-medium">Podcast</p>
                  <p className="text-xs text-ink/60 mt-0.5">Menopausia: mitos y verdades</p>
                </div>
              </div>
              <div className="px-10 pb-4">
                <h3 className="text-2xl font-serif text-ink mb-3 leading-snug">
                  Reinventadas 5.0 y Menopausia
                </h3>
                <p className="text-ink-light font-light mb-6 leading-relaxed">
                  Isabel fue entrevistada en el podcast <span className="italic">Menopausia: mitos y verdades</span>, donde habló sobre la transición de los 50, el edadismo y cómo crear una nueva etapa de vida con propósito.
                </p>
              </div>
              {/* Spotify Embed */}
              <div className="px-6 pb-8">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src="https://open.spotify.com/embed/episode/6yBYDAdZFQBsYaO7KL0Ou4?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Podcast Reinventadas 5.0 - Menopausia mitos y verdades"
                ></iframe>
              </div>
            </motion.div>

            {/* ARTÍCULO CARD */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-sand hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="bg-terracotta/10 px-10 pt-10 pb-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center shrink-0">
                  <Newspaper className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink/70 font-medium">Artículo</p>
                  <p className="text-xs text-ink/60 mt-0.5">Sophia Online</p>
                </div>
              </div>
              <div className="px-10 py-6 flex-grow">
                <h3 className="text-2xl font-serif text-ink mb-4 leading-snug">
                  "A partir de los 50, la vida tiene sentido si escuchamos el llamado del alma"
                </h3>
                <p className="text-ink-light font-light mb-6 leading-relaxed">
                  Un artículo escrito por Isabel para la revista Sophia Online, donde reflexiona sobre cómo los 50 pueden ser el inicio de la etapa más auténtica y significativa de la vida de una mujer.
                </p>
              </div>
              <div className="px-10 pb-10">
                <a
                  href="https://www.sophiaonline.com.ar/a-partir-de-los-50-la-vida-tiene-sentido-si-escuchamos-el-llamado-del-alma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm tracking-widest uppercase font-medium rounded-full text-cream bg-terracotta hover:bg-terracotta/80 transition-colors duration-300"
                >
                  <ExternalLink className="h-4 w-4" />
                  Leer el artículo
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
