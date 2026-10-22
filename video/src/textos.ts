// Todos los textos en pantalla. Edita aquí y vuelve a renderizar.
// Mantén textos/textos.md sincronizado con este archivo.

export const textos = {
  escena1: {
    titular: '¿Aún imprimes flyers para promocionar tu negocio y sus descuentos?',
  },
  escena2: {
    etiqueta: 'Aguascalientes',
    titular: 'Publícalas en enplan.',
    apoyo: 'Escoge tu beneficio y llega a nuevos clientes.',
  },
  escena3: {
    titular: 'Tu negocio, en el nuevo directorio de Aguascalientes',
    // Solo categorías con icono entregado.
    categorias: [
      {nombre: 'Comida', icono: 'icons/comida.webp'},
      {nombre: 'Belleza', icono: 'icons/belleza.webp'},
      {nombre: 'Fitness', icono: 'icons/fitness.webp'},
      {nombre: 'Ocio', icono: 'icons/ocio.webp'},
      {nombre: 'Tiendas', icono: 'icons/tiendas.webp'},
      {nombre: 'Servicios', icono: 'icons/servicios.webp'},
      {nombre: 'Destacados', icono: 'icons/destacados.webp'},
    ],
  },
  escena4: {
    tarjetas: [
      'Dale visibilidad a tu negocio.',
      'Tú decides la oferta. ¡Sin comisiones!',
      'Empiezas con el primer mes gratis.',
    ],
  },
  escena5: {
    titular: 'Con un flyer no sabes quién llegó. Aquí sí.',
    etiquetaEjemplo: 'Datos de ejemplo',
    // Números de ejemplo, no son datos reales.
    visitasDiarias: {etiqueta: 'Visitas diarias', valor: '128'},
    codigosValidados: {etiqueta: 'Códigos validados', valor: '46'},
    tendencias: {
      etiqueta: 'Tendencias',
      dias: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
      valores: [62, 74, 70, 88, 112, 128, 96],
    },
    edad: {
      etiqueta: 'Edad',
      rangos: [
        {rango: '18 a 24', valor: 34},
        {rango: '25 a 34', valor: 41},
        {rango: '35 a 44', valor: 17},
        {rango: '45+', valor: 8},
      ],
    },
    genero: {
      etiqueta: 'Género',
      partes: [
        {nombre: 'Mujeres', valor: 58},
        {nombre: 'Hombres', valor: 42},
      ],
    },
  },
  escena6: {
    boton: 'Registra tu negocio',
    redes: '@enplan.ags',
    web: 'enplan.app',
  },
};
