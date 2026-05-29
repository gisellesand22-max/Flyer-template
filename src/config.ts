/**
 * ───────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE
 *  Single place to plug in your assets: texts, colors, images, timing.
 *  Fonts are handled in src/fonts.ts (currently Poppins, self-hosted).
 * ───────────────────────────────────────────────────────────────
 */

// Video format (vertical 9:16)
export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
};

// ── COLOR PALETTE ──────────────────────────────────────────────
// Replace with your palette (you said you'll send hex codes).
export const COLORS = {
  primary: "#1a1a1a",
  secondary: "#c9a24b", // accent — used for kicker labels + outro line
  light: "#f5f1e8",
  dark: "#0d0d0d",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.85)",
  overlay: "rgba(0,0,0,0.45)", // darkening over background photos
};

// ── SCENES ─────────────────────────────────────────────────────
// Each scene = one full-screen photo + text. 5 Switzerland scenes.
// Put photos in public/images/ and set the filename here.
// `image: ""` shows a gradient placeholder so the project renders
// before files are added.
export type Scene = {
  image: string; // filename inside public/images/ (e.g. "scene1.jpg")
  durationInSeconds: number;
  kicker?: string; // small label above the title
  title: string;
  subtitle?: string;
  align?: "top" | "center" | "bottom";
};

export const SCENES: Scene[] = [
  {
    image: "", // scene1.jpg
    durationInSeconds: 3,
    kicker: "SWITZERLAND",
    title: "Scene 1 title",
    subtitle: "Your text for scene 1",
    align: "bottom",
  },
  {
    image: "", // scene2.jpg
    durationInSeconds: 3,
    kicker: "SWITZERLAND",
    title: "Scene 2 title",
    subtitle: "Your text for scene 2",
    align: "center",
  },
  {
    image: "", // scene3.jpg
    durationInSeconds: 3,
    kicker: "SWITZERLAND",
    title: "Scene 3 title",
    subtitle: "Your text for scene 3",
    align: "top",
  },
  {
    image: "", // scene4.jpg
    durationInSeconds: 3,
    kicker: "SWITZERLAND",
    title: "Scene 4 title",
    subtitle: "Your text for scene 4",
    align: "bottom",
  },
  {
    image: "", // scene5.jpg
    durationInSeconds: 3,
    kicker: "SWITZERLAND",
    title: "Scene 5 title",
    subtitle: "Your text for scene 5",
    align: "center",
  },
];

// ── CLOSING CARD ───────────────────────────────────────────────
// Give me the brand name, tagline, and contact line.
export const OUTRO = {
  image: "", // optional background filename (e.g. "outro.jpg"); "" = solid color
  title: "Closing title",
  tagline: "Closing tagline / call to action",
  contact: "yourwebsite.com  ·  +00 000 000 0000",
  durationInSeconds: 4,
};
