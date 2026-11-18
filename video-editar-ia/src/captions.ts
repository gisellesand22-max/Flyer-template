// Subtítulos: [palabra, segundo del original]. `hl` marca las palabras en aqua.
// "¡Qué pedo!" (3,82 a 4,46 s) se escucha pero no se escribe.
export type Chunk = { words: [string, number][]; end: number; hl: number[] };

export const CHUNKS: Chunk[] = [
  { words: [["Me", 1.05], ["gusta", 1.18], ["grabar", 1.34], ["contenido,", 1.76]], end: 2.14, hl: [2] },
  { words: [["pero", 2.14], ["la", 2.62], ["parte", 2.86], ["de", 3.22], ["editar…", 3.46]], end: 3.82, hl: [4] },
  { words: [["lo", 4.46], ["tardado", 4.58], ["que", 4.98], ["es.", 5.18]], end: 5.38, hl: [1] },
  { words: [["Entonces", 5.95], ["descubrí", 6.28], ["cómo", 6.84], ["hacerlo", 7.0]], end: 7.24, hl: [1] },
  { words: [["con", 7.24], ["inteligencia", 7.46], ["artificial,", 7.98]], end: 8.42, hl: [1, 2] },
  { words: [["como", 8.42], ["este", 8.8], ["video.", 9.02]], end: 9.55, hl: [2] },
  { words: [["Te", 11.1], ["dejo", 11.2], ["el", 11.38], ["link", 11.46], ["de", 11.6], ["Remotion", 11.68]], end: 12.14, hl: [5] },
  { words: [["para", 12.14], ["que", 12.5], ["lo", 12.62], ["instales", 12.74], ["en", 13.18], ["Claude", 13.32], ["Code.", 13.56]], end: 14.0, hl: [5, 6] },
];
