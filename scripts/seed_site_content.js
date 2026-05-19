import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const initialContent = [
  // LANDING
  { page: 'landing', section_key: 'landing_hero_title', section_label: 'Título Principal', text_value: 'La segunda mitad de tu vida puede ser *la mejor*.' },
  { page: 'landing', section_key: 'landing_hero_subtitle', section_label: 'Subtítulo Principal', text_value: 'Si tienes más de 50 años y sientes que algo dentro tuyo está cambiando, no estás sola.' },
  { page: 'landing', section_key: 'landing_intro', section_label: 'Introducción', text_value: 'Muchas mujeres llegan a esta etapa con preguntas profundas:\n- ¿Quién soy ahora?\n- ¿Qué quiero hacer con los próximos años de mi vida?\n- ¿Todavía estoy a tiempo de reinventarme?\n\nDurante décadas fuimos madres, profesionales, parejas, cuidadoras, sostén de muchos. Pero llega un momento en el que algo adentro empieza a decir:\n\n*Ahora me toca a mí*\n\nReinventadas 5.0 nace para acompañar a mujeres que están atravesando esta transición. Mujeres que sienten que la segunda mitad de su vida puede ser también el comienzo de algo nuevo.' },
  { page: 'landing', section_key: 'landing_manifesto', section_label: 'Manifiesto', text_value: 'El mayor problema no es cumplir años.\nEl problema es creer que a partir de los 50 ya no hay tiempo para cambiar de rumbo.\n\nNos enseñaron que esta etapa era el principio del fin. Que el nido vacío era una pérdida. Que la menopausia era algo que ocultar.\n\n*Pero es exactamente al revés.*\n\nPor primera vez, tienes la experiencia, la sabiduría y la libertad para elegirte a ti.' },
  
  // SOBRE MI
  { page: 'sobre_mi', section_key: 'sobremi_title', section_label: 'Título Sobre Mí', text_value: 'Soy *Isabel Martínez de Campos*' },
  { page: 'sobre_mi', section_key: 'sobremi_intro', section_label: 'Introducción Sobre Mí', text_value: 'Periodista • Emprendedora • Midlife Coach\n\nY, sobre todo, una mujer que también atravesó esta etapa.' },
  { page: 'sobre_mi', section_key: 'sobremi_historia', section_label: 'Historia', text_value: 'Durante años trabajé sin parar. Primero como periodista y luego como dueña de una agencia de contenidos.\n\nMi vida era trabajo. Clientes. Plazos. Noches sin dormir. Muchas veces me preguntaba: ¿Por qué sigo haciendo esto?\n\nLa respuesta era clara: sostener a mi familia, darles a mis hijos una buena vida.\n\n*Pero dentro mío empezó a crecer otra pregunta: ¿Esto es todo?*\n\nCuando cumplí 50 empecé a mirar a mi alrededor y descubrí algo que me impactó profundamente. Muchas mujeres estaban atravesando lo mismo:\n- depresión silenciosa,\n- separaciones,\n- sensación de no saber hacia dónde ir.\n\nAhí supe que tenía que hacer algo. Empecé a estudiar Coaching Ontológico y me enfoqué de lleno en acompañar a mujeres en la transición de la mediana edad.' },
  
  // TALLERES
  { page: 'talleres', section_key: 'talleres_title', section_label: 'Título Talleres', text_value: 'Talleres para *mujeres 50+*' },
  { page: 'talleres', section_key: 'talleres_desc', section_label: 'Descripción Talleres', text_value: 'Espacios grupales donde trabajamos los grandes temas de esta etapa de la vida.' },
  
  // MENTORIA
  { page: 'mentoria', section_key: 'mentoria_title', section_label: 'Título Mentoría', text_value: 'Mentoría *individual*' },
  { page: 'mentoria', section_key: 'mentoria_desc', section_label: 'Descripción Mentoría', text_value: 'Las sesiones individuales están pensadas para mujeres que sienten que están atravesando una transición profunda y quieren un espacio de acompañamiento personal.\n\nEn las sesiones trabajamos temas como:\n- Crisis de los 50\n- Búsqueda de propósito\n- Reinventarse profesionalmente\n- Nido vacío\n- Separaciones\n- Autoestima y cambios del cuerpo\n- Miedo al paso del tiempo\n- Proyectos personales post 50\n\nEste es un espacio de conversación profunda, reflexión y claridad para ayudarte a construir la próxima etapa de tu vida.' },
  
  // PRENSA
  { page: 'prensa', section_key: 'prensa_title', section_label: 'Título Prensa', text_value: 'Reinventadas *en los Medios*' },
  { page: 'prensa', section_key: 'prensa_desc', section_label: 'Descripción Prensa', text_value: 'Conversaciones, entrevistas y artículos sobre la segunda mitad de la vida.' },

  // TESTIMONIOS (Titulos de la pagina testimonios, no los testimonios en si)
  { page: 'testimonios', section_key: 'testimonios_page_title', section_label: 'Título Pág. Testimonios', text_value: 'Historias Reales' },
  { page: 'testimonios', section_key: 'testimonios_page_subtitle', section_label: 'Subtítulo Pág. Testimonios', text_value: 'Mujeres que ya están vibrando.' },
];

async function seed() {
  console.log('Borrando textos viejos...');
  const { error: delError } = await supabase.from('site_content').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
  
  if (delError) {
    console.error('Error al borrar:', delError);
    return;
  }

  console.log('Insertando textos completos...');
  const { error: insError } = await supabase.from('site_content').insert(initialContent);
  
  if (insError) {
    console.error('Error al insertar:', insError);
  } else {
    console.log('✅ Base de datos poblada exitosamente con ' + initialContent.length + ' bloques de texto.');
  }
}

seed();
