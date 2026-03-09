import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Star, Mail } from 'lucide-react';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      setName('');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. HERO SECTION */}
      <section id="inicio" className="min-h-[95vh] flex items-center relative overflow-visible bg-cream pt-20 pb-24">
        <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-sand/40 rounded-bl-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1.5 px-4 rounded-full border border-ink/10 text-ink text-xs font-medium mb-8 tracking-widest uppercase">
              Midlife Coaching
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-light text-ink leading-[0.9] mb-8 text-balance">
              Es tu tiempo para <span className="text-terracotta italic">vibrar</span>.
            </h1>
            <p className="text-lg md:text-xl text-ink-light mb-10 leading-relaxed max-w-lg font-light">
              Reinventá tu vida a los 50 con propósito y autenticidad. Caminar hacia tu propósito es una decisión, no una edad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://tiendaup.com/tu-tienda/producto/reinventadas-5-0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm tracking-widest uppercase font-medium rounded-full text-cream bg-terracotta hover:bg-terracotta/80 transition-colors duration-300 shadow-lg"
              >
                <ArrowRight className="h-4 w-4" />
                Quiero el programa
              </a>
              <a
                href="#programa"
                className="inline-flex items-center justify-center px-8 py-4 text-sm tracking-widest uppercase font-medium rounded-full text-ink border border-ink/20 hover:border-terracotta hover:text-terracotta transition-colors duration-300"
              >
                Ver qué incluye
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              <img
                src="/images/isabel.png"
                alt="Isabel - Coach Ontológica Reinventadas 5.0"
                className="pill-image w-full shadow-2xl object-cover object-top"
              />

              {/* Badge 1 - arriba a la derecha */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 bg-terracotta text-cream px-5 py-3 rounded-2xl shadow-xl max-w-[190px]"
              >
                <p className="font-serif italic text-base md:text-lg leading-snug">
                  "Nunca es tarde para empezar."
                </p>
              </motion.div>

              {/* Badge 2 - abajo a la izquierda */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-8 -left-8 bg-cream/95 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white/60 max-w-[210px]"
              >
                <p className="font-serif italic text-base md:text-lg text-ink leading-snug">
                  "Reinventarse es un acto de amor propio."
                </p>
              </motion.div>

              {/* Badge 3 - mitad izquierda */}
              <motion.div
                animate={{ x: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/3 -left-12 bg-olive/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg max-w-[180px]"
              >
                <p className="font-serif italic text-base md:text-lg text-cream leading-snug">
                  "Tu tiempo es ahora, no después."
                </p>
              </motion.div>

              {/* Badge 4 - arriba a la izquierda */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute top-10 -left-10 bg-ink/85 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg max-w-[185px]"
              >
                <p className="font-serif italic text-base md:text-lg text-cream leading-snug">
                  "Eres más poderosa de lo que crees."
                </p>
              </motion.div>

              {/* Badge 5 - mitad derecha */}
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-1/2 -right-10 bg-sand/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-terracotta/20 max-w-[185px]"
              >
                <p className="font-serif italic text-base md:text-lg text-ink leading-snug">
                  "Cada día es una nueva oportunidad."
                </p>
              </motion.div>

              {/* Badge 6 - abajo a la derecha */}
              <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -bottom-6 -right-8 bg-terracotta/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl max-w-[190px]"
              >
                <p className="font-serif italic text-base md:text-lg text-cream leading-snug">
                  "Vibrar es tu derecho, no un lujo."
                </p>
              </motion.div>

              {/* Badge 7 - arriba centro */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -top-6 left-1/4 bg-olive text-cream px-4 py-2 rounded-xl shadow-md max-w-[175px]"
              >
                <p className="font-serif italic text-sm md:text-base leading-snug">
                  "Tu esencia es tu mayor fortaleza."
                </p>
              </motion.div>

              {/* Badge 8 - bajo centro */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-cream/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-sand max-w-[200px]"
              >
                <p className="font-serif italic text-sm md:text-base text-ink leading-snug text-center">
                  "La transformación empieza con una decisión."
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE PROBLEM (MANIFESTO) */}
      <section className="py-32 bg-ink text-cream px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight text-balance mb-12"
          >
            ¿Sentís que viviste para otros y ahora <span className="italic text-terracotta">no sabés quién sos realmente?</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mt-20">
            <div>
              <p className="text-xl font-serif italic text-cream/60 mb-4">Dejar atrás...</p>
              <ul className="space-y-6 font-light text-cream/80 text-lg">
                <li className="flex gap-4 border-t border-cream/10 pt-4">
                  <span className="text-terracotta">—</span>
                  La sensación de estar perdida o invisible.
                </li>
                <li className="flex gap-4 border-t border-cream/10 pt-4">
                  <span className="text-terracotta">—</span>
                  El miedo a que "ya es tarde" para cambiar.
                </li>
                <li className="flex gap-4 border-t border-cream/10 pt-4">
                  <span className="text-terracotta">—</span>
                  Vivir en automático, desconectada de tus deseos.
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xl font-serif italic text-cream/60 mb-4">Para empezar a...</p>
              <ul className="space-y-6 font-light text-cream/80 text-lg">
                <li className="flex gap-4 border-t border-cream/10 pt-4">
                  <span className="text-olive">—</span>
                  Despertar con claridad sobre lo que querés.
                </li>
                <li className="flex gap-4 border-t border-cream/10 pt-4">
                  <span className="text-olive">—</span>
                  Tomar decisiones alineadas con tus deseos.
                </li>
                <li className="flex gap-4 border-t border-cream/10 pt-4">
                  <span className="text-olive">—</span>
                  Sentirte vibrante, con propósito y autenticidad.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER URGENCIA */}
      <section className="py-16 bg-terracotta">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-cream/80 text-sm uppercase tracking-widest mb-2">Plazas limitadas</p>
            <h3 className="text-3xl md:text-4xl font-serif font-light text-cream">
              ¿Estás lista para <span className="italic">reinventarte</span>?
            </h3>
          </div>
          <a
            href="https://tiendaup.com/tu-tienda/producto/reinventadas-5-0"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 text-sm tracking-widest uppercase font-medium rounded-full text-terracotta bg-cream hover:bg-sand transition-colors duration-300 shadow-xl"
          >
            <ArrowRight className="h-4 w-4" />
            Reservar mi lugar
          </a>
        </div>
      </section>

      {/* 3. THE PROGRAM (Oversized Typographic) */}
      <section id="programa" className="py-32 bg-sand/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-ink mb-6">
              El Programa <span className="italic text-terracotta">Reinventadas 5.0</span>
            </h2>
            <p className="text-xl text-ink-light font-light max-w-2xl">
              Un viaje de transformación profunda estructurado en 8 sesiones personalizadas 1-a-1.
            </p>
          </div>

          <div className="space-y-0">
            {[
              { title: "Reconectar con tu esencia", desc: "Descubriremos dónde estás hoy y qué te apasiona." },
              { title: "Identificar creencias", desc: "Desarmaremos los 'debería' y los miedos." },
              { title: "Diseñar tu visión", desc: "Crearemos la imagen de la vida que deseas construir." },
              { title: "Decisiones alineadas", desc: "Aprenderás a elegir desde tu autenticidad." },
              { title: "Gestión emocional", desc: "Herramientas para transitar los cambios con serenidad." },
              { title: "Plan de acción", desc: "Trazaremos los pasos concretos hacia tu visión." },
              { title: "Superar obstáculos", desc: "Estrategias para mantenerte firme ante las dudas." },
              { title: "Celebración y cierre", desc: "Revisión de tu transformación y herramientas futuras." }
            ].map((session, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-10 border-b border-ink/10 hover:bg-white/50 transition-colors px-4 -mx-4 rounded-2xl"
              >
                <div className="font-serif text-6xl md:text-7xl font-light text-terracotta/30 group-hover:text-terracotta transition-colors">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-ink mb-2">{session.title}</h3>
                  <p className="text-ink-light font-light">{session.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA dentro del programa */}
          <div className="mt-16 text-center">
            <p className="text-ink-light font-light mb-6">Todo esto en 8 sesiones personalizadas, 100% adaptadas a vos.</p>
            <a
              href="https://tiendaup.com/tu-tienda/producto/reinventadas-5-0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 text-sm tracking-widest uppercase font-medium rounded-full text-cream bg-ink hover:bg-terracotta transition-colors duration-300"
            >
              <ArrowRight className="h-4 w-4" />
              Empezar mi transformación
            </a>
          </div>
        </div>
      </section>

      {/* 4. ABOUT ISABEL (Split Layout) */}
      <section id="sobre-mi" className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-5xl font-serif font-light text-ink mb-8">
                Hola, soy <span className="italic text-terracotta">Isabel</span>
              </h2>
              <div className="space-y-6 text-lg text-ink-light font-light leading-relaxed">
                <p>
                  Mi propia reinvención comenzó cuando me di cuenta de que había vivido gran parte de mi vida cumpliendo expectativas ajenas. Llegué a los 50 sintiéndome desconectada de mi esencia, preguntándome: "¿Esto es todo?".
                </p>
                <p>
                  Ese cuestionamiento no fue una crisis, fue el inicio de mi transformación. Descubrí que la mediana edad es una oportunidad única para rediseñar nuestra vida desde la autenticidad.
                </p>
                <p className="text-2xl font-serif italic text-ink my-8 border-l-2 border-terracotta pl-6">
                  "Caminar hacia tu propósito es una decisión, no una edad."
                </p>
                <p>
                  Como Coach Ontológica certificada, hoy acompaño a mujeres a reencontrarse consigo mismas. No te doy las respuestas, te acompaño a descubrirlas.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[3/4] rounded-[2rem] overflow-hidden">
                <img
                  src="https://picsum.photos/seed/isabel-portrait-elegant/800/1000"
                  alt="Isabel Martinez Campos"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA después de About */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 border-t border-sand">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xl font-serif italic text-ink-light max-w-lg">
              "Si yo pude reinventarme, vos también podés. Solo necesitás dar el primer paso."
            </p>
            <a
              href="https://tiendaup.com/tu-tienda/producto/reinventadas-5-0"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-8 py-4 text-sm tracking-widest uppercase font-medium rounded-full text-cream bg-terracotta hover:bg-terracotta/80 transition-colors duration-300 shadow-md"
            >
              <ArrowRight className="h-4 w-4" />
              Dar el primer paso
            </a>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS (Warm Organic) */}
      <section id="testimonios" className="py-32 bg-olive text-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif font-light mb-6">Historias Reales</h2>
            <p className="text-xl font-light text-cream/70">Mujeres que ya están vibrando.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: "Laura, 55",
                quote: "Antes me sentía estancada. La menopausia y el nido vacío me habían dejado sin rumbo. Después del programa, recuperé la ilusión. Descubrí que tengo mucho para dar.",
                img: "https://picsum.photos/seed/laura-elegant/200/200"
              },
              {
                name: "Silvia, 48",
                quote: "Vivía para cumplir expectativas ajenas. Hoy me siento más segura y vibrante que a los 30. Lo que más valoro es el enfoque práctico de cada sesión.",
                img: "https://picsum.photos/seed/silvia-elegant/200/200"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white/5 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-6 mb-8">
                  <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-serif text-2xl">{t.name}</h4>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-terracotta" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-light text-lg leading-relaxed text-cream/90 italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRICING & CTA */}
      <section id="inversion" className="py-32 bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl font-serif font-light text-ink mb-6">
            Tu inversión en vivir con <span className="italic text-terracotta">propósito</span>
          </h2>
          <p className="text-xl text-ink-light font-light mb-16">
            8 sesiones personalizadas 1-a-1 + Materiales + Acceso de por vida.
          </p>

          <div className="bg-white p-12 rounded-[3rem] border border-sand shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-12">
              <div className="text-center">
                <p className="text-sm text-ink-light uppercase tracking-widest mb-4">Argentina</p>
                <p className="text-6xl font-serif text-ink mb-2">$400k <span className="text-2xl text-ink-light">ARS</span></p>
                <p className="text-sm text-ink-light">($50.000 por sesión)</p>
              </div>
              <div className="hidden md:block w-px h-24 bg-sand"></div>
              <div className="md:hidden h-px w-24 bg-sand"></div>
              <div className="text-center">
                <p className="text-sm text-ink-light uppercase tracking-widest mb-4">Exterior</p>
                <p className="text-6xl font-serif text-ink mb-2">$384 <span className="text-2xl text-ink-light">USD</span></p>
                <p className="text-sm text-ink-light">($48 por sesión)</p>
              </div>
            </div>

            <div className="bg-sand/30 rounded-2xl p-6 mb-12 inline-block text-left max-w-md mx-auto">
              <p className="font-medium text-ink mb-2 text-center">Garantía de satisfacción 100%</p>
              <p className="text-sm text-ink-light font-light text-center">
                Si después de la primera sesión sentís que no es para vos, te devuelvo el 100% de tu inversión.
              </p>
            </div>

            <div>
              <a
                href="https://tiendaup.com/tu-tienda/producto/reinventadas-5-0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-12 py-5 text-sm tracking-widest uppercase font-medium rounded-full text-cream bg-ink hover:bg-terracotta transition-colors duration-300 w-full sm:w-auto"
              >
                Comprar programa ahora
              </a>
              <p className="text-xs text-ink-light mt-6 uppercase tracking-widest">Pago seguro procesado por TiendaUp</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LEAD MAGNET (Soft Footer) */}
      <section className="py-32 bg-sand/50">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-serif font-light text-ink mb-4">
            ¿Aún no estás lista?
          </h2>
          <p className="text-lg text-ink-light font-light mb-12">
            Descargá gratis la guía: <span className="italic font-medium">5 pasos para reconectar con tu propósito a los 50.</span>
          </p>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[2rem] border border-sand"
            >
              <CheckCircle2 className="h-12 w-12 text-olive mx-auto mb-4" />
              <h3 className="text-2xl font-serif text-ink mb-2">¡Guía enviada!</h3>
              <p className="text-ink-light font-light">
                Revisá tu bandeja de entrada. En unos minutos recibirás tu guía.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2rem] border border-sand shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-full border border-sand focus:border-terracotta outline-none transition-all bg-cream/50 font-light"
                  placeholder="Tu Nombre"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-full border border-sand focus:border-terracotta outline-none transition-all bg-cream/50 font-light"
                  placeholder="Tu Email"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-8 py-4 text-sm tracking-widest uppercase font-medium rounded-full text-white bg-olive hover:bg-olive/90 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Enviando..." : "Enviarme la guía gratis"}
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
