// Todos los textos en pantalla. Edita aquí y vuelve a renderizar.
// Regla: máximo 6 palabras por pantalla. Si agregas palabras, revisa los tiempos en timing.ts.

export const TEXTS = {
  escena1: {
    pantallaA: {chico: 'Directorio con', grande: 'beneficios', chico2: 'locales,'},
    pantallaB: {chico: 'verificados y', grande: 'reales.'},
  },
  escena2: {
    pantallaA: {chico: '¿Buscas', grande: 'plan', chico2: 'en Ags?'},
    pantallaB: {apoyo: 'Encuéntralo y ahorra.'},
  },
  escena3: {
    paso1: 'Regístrate',
    paso2: 'Elige categoría',
    paso3: ['Activa, muestra', 'tu código y ahorra'],
  },
  escena4: {
    pantallaA: {chico: 'Para', grande: 'ti', lado: ['que vives', 'en Ags']},
    pantallaB: {chico: 'Y para', grande: 'negocios', chico2: 'locales'},
  },
  escena5: {
    pantallaA: {chico: '¿Eres un', grande: 'negocio?'},
    pantallaB: {chico: 'Regístrate y llega a', grande: ['clientes', 'nuevos.']},
  },
  escena6: {
    titulo: ['Checa tu', 'siguiente'],
    tituloAcento: 'plan',
    boton: 'enplan.app',
    redes: '@enplan.ags',
  },
};

// Iconos de categorías en public/icons. Orden en que salen del celular.
export const ICONS = [
  {categoria: 'Comida', archivo: 'icons/comida.webp'},
  {categoria: 'Belleza', archivo: 'icons/belleza.webp'},
  {categoria: 'Fitness', archivo: 'icons/fitness.webp'},
  {categoria: 'Ocio', archivo: 'icons/ocio.webp'},
  {categoria: 'Tiendas', archivo: 'icons/tiendas.webp'},
  {categoria: 'Servicios', archivo: 'icons/servicios.webp'},
];
