import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function Mentoria() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-cream">
      <section className="py-32 flex-grow">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="max-w-4xl mx-auto px-6 lg:px-12 text-center"
        >
          <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.7 }} className="text-5xl font-serif font-light text-ink mb-6">
            Mentoría <span className="italic text-terracotta">individual</span>
          </motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="text-xl text-ink-light font-light mb-8 leading-relaxed max-w-2xl mx-auto">
            Las sesiones individuales están pensadas para mujeres que sienten que están atravesando una transición profunda y quieren un espacio de acompañamiento personal.
          </motion.p>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="text-lg text-ink-light font-light mb-10">
            En las sesiones trabajamos temas como:
          </motion.p>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-10 px-6">
            {[
              "Crisis de los 50", "Búsqueda de propósito.",
              "Reinventarse profesionalmente", "Nido vacío",
              "Separaciones.", "Autoestima y cambios del cuerpo.",
              "Miedo al paso del tiempo.", "Proyectos personales post 50."
            ].map((topic, i) => (
              <div key={i} className="flex items-center gap-2 text-ink-light font-light text-sm">
                <CheckCircle2 className="h-4 w-4 text-terracotta" />
                {topic}
              </div>
            ))}
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="bg-sand/30 rounded-2xl p-6 mb-10 max-w-md mx-auto text-left">
            <p className="font-medium text-ink mb-1">Formato</p>
            <p className="text-ink-light font-light">Sesiones online</p>
            <p className="font-medium text-ink mt-4 mb-1">Duración</p>
            <p className="text-ink-light font-light">60 minutos</p>
          </motion.div>

          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="text-lg text-ink-light font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Este es un espacio de conversación profunda, reflexión y claridad para ayudarte a construir la próxima etapa de tu vida.
          </motion.p>

          <motion.a
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
            href="https://wa.me/5491154581170?text=Hola%20Isabel,%20estoy%20en%20tu%20web%20y%20quiero%20reservar%20una%20sesi%C3%B3n%201:1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-12 py-5 text-sm tracking-widest uppercase font-medium rounded-full text-cream bg-ink hover:bg-terracotta transition-colors duration-300"
          >
            Reservar mi sesión
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
