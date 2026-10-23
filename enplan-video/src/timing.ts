// Tiempos en cuadros (30 fps). Cada pantalla dura al menos 10 cuadros por palabra
// (1 segundo por cada 3 palabras).
export const FPS = 30;
export const DURATION = 510; // 17 s

export const T = {
  s1: {from: 0, a: [0, 40], b: [40, 70]}, // 4 palabras, 3 palabras
  s2: {from: 70, a: [70, 110], b: [110, 150]}, // 4, 4 ("plan" se queda)
  s3: {from: 150, phoneIn: 150, p1: [158, 174], p2: [174, 194], p3: [194, 254]}, // 1, 2, 6
  s4: {from: 254, a: [254, 314], b: [314, 354]}, // 6, 4
  s5: {from: 354, a: [354, 384], b: [384, 444]}, // 3, 6
  s6: {from: 444, a: [444, 510]}, // 6 (logo aparte)
};
