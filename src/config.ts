/**
 * ───────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE
 *  Single place to plug in your assets: texts, colors, images, timing.
 *  Fonts are handled in src/fonts.ts (Poppins, self-hosted).
 * ───────────────────────────────────────────────────────────────
 */

// Video format (vertical 9:16)
export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
};

// ── COLORS ─────────────────────────────────────────────────────
export const COLORS = {
  bubbleText: "#4d39ed", // purple text inside the bubbles
  bubbleBg: "#ffffff", // white pill background
  dark: "#0d0d0d",
  overlay: "rgba(0,0,0,0.25)", // slight darkening over photos
};

// ── TEXT / BUBBLE STYLE ────────────────────────────────────────
export const TEXT = {
  fontSize: 35, // px — as requested ("Poppins size 35")
  fontWeight: 600,
  bubbleRadius: 999, // pill shape
  bubblePaddingV: 16, // vertical padding inside a bubble (px)
  bubblePaddingH: 34, // horizontal padding inside a bubble (px)
  bubbleGap: 22, // vertical gap between stacked bubbles (px)
  staggerSeconds: 0.7, // delay between each bubble appearing
};

// ── SCENES ─────────────────────────────────────────────────────
// Each scene = one full-screen photo + a stack of bubbles that pop in
// one after another. Put photos in public/images/ named below.
// `image: ""` shows a gradient placeholder so it renders before files exist.
export type Scene = {
  image: string; // filename inside public/images/
  durationInSeconds: number;
  bubbles: string[]; // appear sequentially, then stay
  align?: "top" | "center" | "bottom";
};

export const SCENES: Scene[] = [
  {
    image: "scene1.jpg", // train station
    durationInSeconds: 4,
    bubbles: ["One app", "one login"],
    align: "center",
  },
  {
    image: "scene2.jpg", // swiss flags
    durationInSeconds: 3,
    bubbles: ["all mobility options"],
    align: "center",
  },
  {
    image: "scene3.jpg", // mountains
    durationInSeconds: 4,
    bubbles: ["coverage", "across", "the country"],
    align: "center",
  },
  {
    image: "scene4.jpg", // city street (Dosenbach)
    durationInSeconds: 4.5,
    bubbles: ["the network grows everyday", "list or rent", "two ways to win"],
    align: "center",
  },
  {
    image: "scene5.jpg", // BMW
    durationInSeconds: 3.5,
    bubbles: ["download in app store"],
    align: "center",
  },
];
