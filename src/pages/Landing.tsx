import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Star, Mail } from 'lucide-react';

const QUOTES = [
  { text: "Nunca es tarde para empezar.", bg: "bg-terracotta", textColor: "text-cream" },
  { text: "Eres más poderosa de lo que crees.", bg: "bg-ink/85", textColor: "text-cream" },
  { text: "Tu tiempo es ahora, no después.", bg: "bg-olive/90", textColor: "text-cream" },
  { text: "Cada día es una nueva oportunidad.", bg: "bg-sand/95", textColor: "text-ink" },
  { text: "Reinventarse es un acto de amor propio.", bg: "bg-cream/95", textColor: "text-ink" },
  { text: "Vibrar es tu derecho, no un lujo.", bg: "bg-terracotta/80", textColor: "text-cream" },
  { text: "Tu esencia es tu mayor fortaleza.", bg: "bg-olive", textColor: "text-cream" },
  { text: "La transformación empieza con una decisión.", bg: "bg-cream/95", textColor: "text-ink" },
];

export default function Landing() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % QUOTES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

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
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-light text-ink leading-[1.1] mb-8 text-balance">
              La segunda mitad de tu vida puede ser <span className="text-terracotta italic">la mejor</span>.
            </h1>
            <p className="text-lg md:text-xl text-ink-light mb-4 leading-relaxed max-w-lg font-light">
              Por <span className="font-medium text-ink">Isabel Martínez de Campos</span><br />
              <span className="text-sm tracking-widest uppercase text-terracotta">Midlife Coach</span>
            </p>
            <p className="text-lg text-ink-light mb-10 leading-relaxed max-w-lg font-light">
              Si tienes más de 50 años y sientes que algo dentro tuyo está cambiando, no estás sola.
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
                src="/IsabelFotoInicio.png"
                alt="Isabel - Coach Ontológica Reinventadas 5.0"
                className="pill-image w-full shadow-2xl object-cover object-top"
              />

              {/* ── MOBILE: un badge a la vez rotando ── */}
              <div className="lg:hidden absolute -bottom-16 left-0 right-0 flex justify-center">
                <div className="relative h-16 w-full flex justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeQuote}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className={`absolute px-5 py-3 rounded-2xl shadow-lg backdrop-blur-md ${QUOTES[activeQuote].bg} max-w-[280px] text-center`}
                    >
                      <p className={`font-serif italic text-base leading-snug ${QUOTES[activeQuote].textColor}`}>
                        "{QUOTES[activeQuote].text}"
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* ── DESKTOP: 8 badges flotantes distribuidos ── */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden lg:block absolute top-[8%] -right-10 bg-terracotta text-cream px-5 py-3 rounded-2xl shadow-xl max-w-[185px]"
              >
                <p className="font-serif italic text-base md:text-lg leading-snug">
                  "Nunca es tarde para empezar."
                </p>
              </motion.div>

              <motion.div
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="hidden lg:block absolute top-[8%] -left-10 bg-ink/85 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg max-w-[185px]"
              >
                <p className="font-serif italic text-base md:text-lg text-cream leading-snug">
                  "Eres más poderosa de lo que crees."
                </p>
              </motion.div>

              <motion.div
                animate={{ x: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="hidden lg:block absolute top-[38%] -left-12 bg-olive/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg max-w-[180px]"
              >
                <p className="font-serif italic text-base md:text-lg text-cream leading-snug">
                  "Tu tiempo es ahora, no después."
                </p>
              </motion.div>

              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="hidden lg:block absolute top-[38%] -right-10 bg-sand/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-terracotta/20 max-w-[185px]"
              >
                <p className="font-serif italic text-base md:text-lg text-ink leading-snug">
                  "Cada día es una nueva oportunidad."
                </p>
              </motion.div>

              <motion.div
                animate={{ x: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="hidden lg:block absolute top-[68%] -left-10 bg-cream/95 backdrop-blur-md px-4 py-3 rounded-3xl shadow-xl border border-white/60 max-w-[200px]"
              >
                <p className="font-serif italic text-base md:text-lg text-ink leading-snug">
                  "Reinventarse es un acto de amor propio."
                </p>
              </motion.div>

              <motion.div
                animate={{ x: [0, 9, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="hidden lg:block absolute top-[68%] -right-10 bg-terracotta/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl max-w-[185px]"
              >
                <p className="font-serif italic text-base md:text-lg text-cream leading-snug">
                  "Vibrar es tu derecho, no un lujo."
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="hidden lg:block absolute -bottom-8 -left-8 bg-olive text-cream px-4 py-3 rounded-2xl shadow-md max-w-[185px]"
              >
                <p className="font-serif italic text-base md:text-lg leading-snug">
                  "Tu esencia es tu mayor fortaleza."
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="hidden lg:block absolute -bottom-8 -right-8 bg-cream/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-sand max-w-[195px]"
              >
                <p className="font-serif italic text-base md:text-lg text-ink leading-snug text-center">
                  "La transformación empieza con una decisión."
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 1b. INTRO / TRANSICIÓN */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="space-y-6 text-lg text-ink-light font-light leading-relaxed"
          >
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }}>
              Muchas mujeres llegan a esta etapa con preguntas profundas:
            </motion.p>
            <motion.ul variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }} className="list-none space-y-2 pl-0">
              <li className="font-serif italic text-xl text-ink">¿Quién soy ahora?</li>
              <li className="font-serif italic text-xl text-ink">¿Qué quiero hacer con los próximos años de mi vida?</li>
              <li className="font-serif italic text-xl text-ink">¿Todavía estoy a tiempo de reinventarme?</li>
            </motion.ul>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }}>
              Durante décadas fuimos madres, profesionales, parejas, cuidadoras, sostén de muchos.
              Pero llega un momento en el que algo adentro empieza a decir:
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }} className="text-2xl font-serif italic text-terracotta">
              "Ahora me toca a mí".
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }}>
              Reinventadas 5.0 nace para acompañar a mujeres que están atravesando esta transición.
              Mujeres que sienten que la segunda mitad de su vida puede ser también el comienzo de algo nuevo.
            </motion.p>
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
            La crisis de los +50 de la que <span className="italic text-terracotta">casi nadie habla</span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-2xl mx-auto text-center mt-12 mb-16"
          >
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="text-lg font-light text-cream/80 leading-relaxed mb-8">
              A partir de los 50 años pasan muchas cosas al mismo tiempo.
            </motion.p>
            <motion.ul variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="space-y-4 font-light text-cream/80 text-lg text-left max-w-lg mx-auto mb-10">
              <li className="flex gap-4 border-t border-cream/10 pt-4"><span className="text-terracotta">—</span>Los hijos crecen y se van.</li>
              <li className="flex gap-4 border-t border-cream/10 pt-4"><span className="text-terracotta">—</span>Muchas parejas cambian o terminan.</li>
              <li className="flex gap-4 border-t border-cream/10 pt-4"><span className="text-terracotta">—</span>El trabajo deja de representar quién somos.</li>
              <li className="flex gap-4 border-t border-cream/10 pt-4"><span className="text-terracotta">—</span>El cuerpo cambia.</li>
              <li className="flex gap-4 border-t border-cream/10 pt-4"><span className="text-terracotta">—</span>La sociedad empieza a mirarnos de otra manera.</li>
            </motion.ul>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="text-lg font-light text-cream/80 leading-relaxed mb-6">
              Y muchas mujeres sienten algo difícil de explicar:
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }} className="text-xl font-serif italic text-terracotta mb-8">
              una mezcla de tristeza, miedo y vacío.
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="text-lg font-light text-cream/80 leading-relaxed mb-4">
              No porque su vida haya sido mala.
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="text-lg font-light text-cream/80 leading-relaxed mb-8">
              Sino porque aparece una pregunta que antes no estaba:
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }} transition={{ duration: 0.7 }} className="text-2xl font-serif italic text-terracotta mb-10">
              ¿Quién soy ahora?
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="text-lg font-light text-cream/80 leading-relaxed mb-4">
              Esta etapa es una transición profunda.
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }} className="text-xl font-serif italic text-cream/90">
              Y puede convertirse en el comienzo de una vida más auténtica.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER URGENCIA */}
      <section className="py-16 bg-terracotta">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
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
        </motion.div>
      </section>

      {/* 3. THE PROGRAM (Oversized Typographic) */}
      <section id="programa" className="py-32 bg-sand/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-serif font-light text-ink mb-6">
              El proceso <span className="italic text-terracotta">Reinventadas 5.0</span>
            </h2>
            <p className="text-xl text-ink-light font-light max-w-2xl">
              Acompaño a mujeres en un proceso de transformación personal enfocado en tres etapas.
            </p>
          </motion.div>

          <div className="space-y-0">
            {[
              {
                title: "Comprender la transición",
                intro: "Antes de reinventarnos necesitamos entender qué está pasando.",
                items: ["Los cambios emocionales de esta etapa", "Las creencias que nos limitan.", "Los roles que construyeron nuestra identidad."],
                closing: "Este paso trae algo muy importante: claridad."
              },
              {
                title: "Reconectar con tus deseos",
                intro: "Durante muchos años muchas mujeres viven para otros. En esta etapa comenzamos a reconectar con:",
                items: ["Deseos postergados.", "Talentos olvidados.", "Intereses propios.", "Valores profundos."],
                closing: "Aquí empieza a aparecer una nueva versión tuya."
              },
              {
                title: "Crear tu próxima etapa",
                intro: "La reinvención no es solo interna. También implica acción. En esta etapa trabajamos en:",
                items: ["Nuevos proyectos personales.", "Cambios laborales o creativos.", "Nuevas formas de vivir y disfrutar la vida."],
                closing: "No se trata de empezar de cero. Se trata de construir desde todo lo que ya eres."
              }
            ].map((session, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative flex flex-col md:flex-row md:items-start gap-6 md:gap-12 py-10 border-b border-ink/10 hover:bg-white/50 transition-colors px-4 -mx-4 rounded-2xl"
              >
                <div className="font-serif text-6xl md:text-7xl font-light text-terracotta/30 group-hover:text-terracotta transition-colors shrink-0">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-ink mb-3">{session.title}</h3>
                  <p className="text-ink-light font-light mb-3">{session.intro}</p>
                  <ul className="space-y-1 mb-4">
                    {session.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-ink-light font-light">
                        <span className="text-terracotta">—</span>{item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-ink font-serif italic">{session.closing}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA dentro del programa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <a
              href="https://tiendaup.com/tu-tienda/producto/reinventadas-5-0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 text-sm tracking-widest uppercase font-medium rounded-full text-cream bg-ink hover:bg-terracotta transition-colors duration-300"
            >
              <ArrowRight className="h-4 w-4" />
              Empezar mi transformación
            </a>
          </motion.div>
        </div>
      </section>

      {/* 4. ABOUT ISABEL (Split Layout) */}
      <section id="sobre-mi" className="py-32 bg-cream">
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
          className="max-w-7xl mx-auto px-6 lg:px-12 py-12 border-t border-sand"
        >
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
        </motion.div>
      </section>

      {/* 5. TESTIMONIALS (Warm Organic) */}
      <section id="testimonios" className="py-32 bg-olive text-cream">
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
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }} className="bg-white/5 p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TALLERES & COMUNIDAD */}
      <section id="comunidad" className="py-32 bg-sand/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20"
          >
            <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.7 }}>
              <h2 className="text-4xl font-serif font-light text-ink mb-8">
                Talleres para <span className="italic text-terracotta">mujeres 50+</span>
              </h2>
              <p className="text-lg text-ink-light font-light mb-8 leading-relaxed">
                Además de las sesiones individuales, organizo talleres grupales donde trabajamos los grandes temas de esta etapa de la vida.
              </p>
              <p className="text-ink-light font-light mb-6">Algunos de los talleres incluyen:</p>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <CheckCircle2 className="h-6 w-6 text-terracotta shrink-0 mt-1" />
                  <div>
                    <p className="text-ink font-serif italic text-lg">Reinventarte después de los 45</p>
                    <p className="text-ink-light font-light text-sm mt-1">Un espacio para repensar tu identidad, tus deseos y tu próxima etapa.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle2 className="h-6 w-6 text-terracotta shrink-0 mt-1" />
                  <div>
                    <p className="text-ink font-serif italic text-lg">Encontrar propósito en la segunda mitad de la vida</p>
                    <p className="text-ink-light font-light text-sm mt-1">Exploramos qué significa vivir con más sentido después de los 50.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle2 className="h-6 w-6 text-terracotta shrink-0 mt-1" />
                  <div>
                    <p className="text-ink font-serif italic text-lg">Volver a empezar.</p>
                  </div>
                </div>
              </div>
              <p className="text-ink-light font-light mt-8 leading-relaxed">
                Son espacios para atravesar este cambio con más conciencia y nuevas posibilidades.
                Los talleres también son una oportunidad para conectar con otras mujeres que están viviendo procesos similares.
              </p>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.7 }} className="bg-ink text-cream p-12 rounded-[3rem] shadow-2xl">
              <h2 className="text-4xl font-serif font-light mb-6">
                Una comunidad de mujeres <span className="italic text-terracotta">reinventándose</span>
              </h2>
              <p className="text-cream/80 font-light mb-6 text-lg leading-relaxed">
                Reinventadas 5.0 también es una comunidad.
              </p>
              <p className="text-cream/70 font-light mb-6 text-lg leading-relaxed">
                Hoy más de 25.000 mujeres forman parte de este espacio a través de Instagram, donde compartimos reflexiones, conversaciones y experiencias sobre esta etapa de la vida.
              </p>
              <p className="text-cream/80 font-light mb-4 text-lg">
                El objetivo es simple:
              </p>
              <p className="font-serif italic text-terracotta text-xl mb-8">
                que ninguna mujer sienta que está atravesando esta transición sola.
              </p>
              <p className="text-cream/70 font-light mb-4">
                Aquí hablamos de temas que muchas veces quedan silenciados:
              </p>
              <p className="text-cream/80 font-light mb-8">
                Edadismo, menopausia, reinventarse profesionalmente, nuevos comienzos, la libertad de esta etapa.
              </p>
              <p className="font-serif italic text-cream/90 mb-8">
                Porque la segunda mitad de la vida no tiene por qué ser un declive. Puede ser un despertar.
              </p>
              <a
                href="https://instagram.com/reinventadas5.0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm tracking-widest uppercase font-medium rounded-full text-ink bg-cream hover:bg-sand transition-colors"
              >
                Sumarme en Instagram
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7. SESIONES 1:1 */}
      <section id="inversion" className="py-32 bg-cream">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="max-w-4xl mx-auto px-6 lg:px-12 text-center"
        >
          <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.7 }} className="text-5xl font-serif font-light text-ink mb-6">
            Sesiones de <span className="italic text-terracotta">acompañamiento 1:1</span>
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
            href="https://tiendaup.com/tu-tienda/producto/reinventadas-5-0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-12 py-5 text-sm tracking-widest uppercase font-medium rounded-full text-cream bg-ink hover:bg-terracotta transition-colors duration-300"
          >
            Reservar mi sesión
          </motion.a>
        </motion.div>
      </section>

      {/* 8. CIERRE / CALL TO ACTION */}
      <section className="py-32 bg-sand/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="max-w-3xl mx-auto px-6 lg:px-12 text-center"
        >
          <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.7 }} className="text-4xl font-serif font-light text-ink mb-4">
            Tu reinvención puede empezar hoy
          </motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="text-lg text-ink-light font-light mb-6 leading-relaxed">
            Si sientes que estás atravesando un momento de cambio y quieres acompañamiento en este proceso, puedes comenzar de dos maneras:
          </motion.p>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="text-xl font-serif italic text-terracotta mb-4">Reservando una sesión individual</motion.p>
          <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 0.3 }} className="text-lg text-ink-light font-light mb-4">o</motion.p>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="text-xl font-serif italic text-terracotta mb-10">Participando en alguno de los talleres de Reinventadas 5.0.</motion.p>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="text-lg text-ink-light font-light mb-12 leading-relaxed">
            La segunda mitad de la vida no es el final de la historia.
            Muchas veces es el capítulo donde empezamos a vivir con más verdad, más libertad y más sentido.
          </motion.p>

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
        </motion.div>
      </section>

    </div>
  );
}
