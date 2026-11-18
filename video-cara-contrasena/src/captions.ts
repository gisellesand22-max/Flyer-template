// Subtítulos: [palabra, segundo del original]. `hl` marca la palabra en aqua.
// La primera frase no lleva subtítulo porque el título del gancho ya la muestra.
export type Chunk = { words: [string, number][]; end: number; hl: number[] };

export const CHUNKS: Chunk[] = [
  { words: [["El", 2.24], ["sistema", 2.5], ["mide", 2.82], ["el", 3.18], ["tamaño", 3.44]], end: 3.96, hl: [4] },
  { words: [["y", 3.96], ["la", 4.12], ["distancia", 4.22], ["entre", 4.64], ["tus", 4.86], ["rasgos:", 5.06]], end: 5.44, hl: [2] },
  { words: [["tus", 5.44], ["ojos,", 6.16], ["tu", 6.48], ["nariz,", 6.72], ["tu", 6.96], ["boca,", 7.16]], end: 7.38, hl: [1] },
  { words: [["y", 7.38], ["lo", 7.64], ["compara", 7.74], ["con", 8.06], ["otra", 8.22], ["foto", 8.44], ["tuya.", 8.74]], end: 9.4, hl: [2] },
  { words: [["Si", 9.4], ["coincide,", 9.66], ["pasas;", 10.04]], end: 10.62, hl: [2] },
  { words: [["y", 10.62], ["si", 10.74], ["no,", 10.84], ["pues", 10.98], ["no.", 11.16]], end: 11.4, hl: [4] },
  { words: [["Al", 11.4], ["final", 11.92], ["es", 12.1], ["un", 12.3], ["modelo", 12.4], ["matemático.", 12.58]], end: 13.3, hl: [5] },
  { words: [["Y", 13.3], ["no", 13.82], ["sé", 14.04], ["tú,", 14.32]], end: 14.48, hl: [] },
  { words: [["¿aceptarías", 14.48], ["que", 14.92], ["tu", 15.18], ["cara", 15.68]], end: 15.88, hl: [0] },
  { words: [["sea", 15.88], ["la", 16.08], ["llave", 16.24], ["para", 16.48], ["todo?", 16.7]], end: 16.98, hl: [2] },
  { words: [["Tipo,", 16.98], ["la", 17.28], ["CURP", 17.46], ["biométrica", 17.75]], end: 18.22, hl: [2, 3] },
  { words: [["ya", 18.22], ["usa", 18.44], ["esto:", 18.64]], end: 18.94, hl: [1] },
  { words: [["guarda", 18.94], ["fotos", 19.6], ["de", 19.8], ["tu", 20.0], ["rostro,", 20.12]], end: 20.56, hl: [4] },
  { words: [["tus", 20.56], ["huellas", 20.78], ["y", 21.32], ["tu", 21.56], ["iris.", 21.78]], end: 22.35, hl: [4] },
];
