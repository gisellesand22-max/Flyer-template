/**
 * ───────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE
 *  This is the single place to plug in your assets:
 *  texts, colors, fonts, and background images.
 * ───────────────────────────────────────────────────────────────
 */

// Video format (vertical 9:16)
export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 18 * 30, // ~18 seconds
};

// ── COLOR PALETTE ──────────────────────────────────────────────
// Replace with your brand colors.
export const COLORS = {
  primary: "#1a1a1a",
  secondary: "#c9a24b", // accent / gold
  light: "#f5f1e8",
  dark: "#0d0d0d",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.75)",
  overlay: "rgba(0,0,0,0.45)", // darkening over background photos
};

// ── FONTS ──────────────────────────────────────────────────────
// Two options:
//  A) Use a Google Font name (loaded automatically) — set `googleFamily`.
//  B) Drop a font file in public/fonts and reference it in src/fonts.ts.
export const FONTS = {
  // For now we load Google Fonts. Tell me the exact font names you want.
  headingGoogle: "Playfair Display",
  bodyGoogle: "Inter",
  // If you give me custom font files, we switch these to the local family names.
  headingFamily: "Playfair Display",
  bodyFamily: "Inter",
};

// ── SCENES ─────────────────────────────────────────────────────
// Each scene = one full-screen section with a background image + text.
// Put your images in public/images/ and reference them by filename.
export type Scene = {
  image: string; // filename inside public/images/  (e.g. "scene1.jpg")
  durationInSeconds: number;
  kicker?: string; // small label above the title
  title: string;
  subtitle?: string;
  align?: "top" | "center" | "bottom";
};

// NOTE: `image: ""` shows a gradient placeholder so the project renders
// before you've added files. Put real photos in public/images/ and set
// the filename here (e.g. image: "scene1.jpg").
export const SCENES: Scene[] = [
  {
    image: "",
    durationInSeconds: 4,
    kicker: "PRESENTING",
    title: "Your Headline Here",
    subtitle: "A short supporting line of text",
    align: "bottom",
  },
  {
    image: "",
    durationInSeconds: 4,
    kicker: "FEATURE",
    title: "Second Message",
    subtitle: "Describe the highlight",
    align: "center",
  },
  {
    image: "",
    durationInSeconds: 5,
    kicker: "FEATURE",
    title: "Third Message",
    subtitle: "Another supporting detail",
    align: "top",
  },
];

// ── CLOSING / CALL TO ACTION ───────────────────────────────────
export const OUTRO = {
  image: "", // optional background filename; leave "" for solid color
  title: "Your Brand",
  tagline: "Your tagline or call to action",
  contact: "yourwebsite.com  ·  +00 000 000 0000",
  durationInSeconds: 5,
};
