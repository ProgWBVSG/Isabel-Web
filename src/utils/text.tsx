import React from 'react';

/**
 * Función para renderizar texto que proviene del CMS.
 * Convierte asteriscos en spans con clase italic y color terracotta.
 * Convierte saltos de línea (\n) en etiquetas <br />.
 * 
 * @param text - El texto crudo (ej: "La segunda mitad de tu vida puede ser *la mejor*.")
 * @param fallback - Texto a usar si `text` es undefined o vacío
 * @param highlightClass - Clase CSS opcional para el texto entre asteriscos (por defecto: 'text-terracotta italic')
 */
export function renderText(text: string | undefined | null, fallback: string, highlightClass = 'text-terracotta italic') {
  const content = text && text.trim() !== '' ? text : fallback;
  
  // Dividir por doble salto de línea para crear párrafos
  const paragraphs = content.split(/\n\s*\n/);
  
  return (
    <>
      {paragraphs.map((p, index) => {
        const parts = p.split(/\*(.*?)\*/g);
        return (
          <p key={index}>
            {parts.map((part, i) => {
              if (i % 2 === 1) {
                return <span key={i} className={highlightClass}>{part}</span>;
              }
              // Saltos simples se convierten en <br />
              return part.split('\n').map((line, j, arr) => (
                <React.Fragment key={`${i}-${j}`}>
                  {line}
                  {j < arr.length - 1 && <br />}
                </React.Fragment>
              ));
            })}
          </p>
        );
      })}
    </>
  );
}
