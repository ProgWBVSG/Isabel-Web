/* eslint-disable */
import Image from "next/image"

export default function AboutSection() {
    return (
        <section className="w-full bg-[var(--color-brand-beige)] py-24 px-6 lg:px-8 border-y border-brand-crema">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                {/* Foto Isabel */}
                <div className="w-full md:w-1/2 relative">
                    <div className="aspect-[4/5] md:aspect-square w-full rounded-2xl overflow-hidden bg-brand-olive-light/10 relative border-4 border-white shadow-xl">
                        <Image 
                            src="/images/FotoSobreMi.jpg" 
                            alt="Isabel Martinez Campos sobre mí" 
                            fill
                            className="object-cover object-top"
                        />
                    </div>
                    {/* Elemento decorativo */}
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[var(--color-brand-crema)] rounded-full -z-10 shadow-inner"></div>
                </div>

                {/* Textos About */}
                <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                    <span className="text-brand-brown-dark font-bold tracking-wider uppercase text-sm mb-4">Sobre Mí</span>

                    <h2 className="text-3xl md:text-5xl font-bold font-sans text-brand-text mb-8 leading-tight">
                        Encontré mi propósito cuando creía que ya lo había vivido todo.
                    </h2>

                    <div className="space-y-6 text-lg text-brand-text leading-relaxed font-outfit">
                        <p>
                            Hola, soy Isabel. Como creadora de <strong className="text-brand-olive font-bold">Reinventadas 5.0</strong>, sé de primera mano lo que es llegar a los 50 y sentir que el mundo te pide que bajes el volumen, justo cuando vos sentís que tenés más para decir que nunca.
                        </p>
                        <p>
                            Me especialicé en mujeres en la mediana edad porque no somos una &quot;crisis&quot; ni necesitamos volver a ser jóvenes. Somos mujeres maduras con la experiencia necesaria para empezar a tomar las decisiones correctas.
                        </p>
                        <p className="font-medium text-brand-brown-dark italic border-l-4 border-brand-brown pl-6 my-8">
                            &quot;Caminar hacia tu propósito es una decisión, no una edad. Hoy acompaño a mujeres 45+ a descubrir que también es su momento de volar.&quot;
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}



