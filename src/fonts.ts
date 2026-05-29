/**
 * Font loading — Poppins, self-hosted from public/fonts/ so rendering
 * needs no network access. All text uses Poppins.
 */
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const family = "Poppins";

const weights: Array<[string, string]> = [
  ["400", "Poppins-Regular.ttf"],
  ["500", "Poppins-Medium.ttf"],
  ["600", "Poppins-SemiBold.ttf"],
  ["700", "Poppins-Bold.ttf"],
];

for (const [weight, file] of weights) {
  loadFont({
    family,
    url: staticFile(`fonts/${file}`),
    weight,
    format: "truetype",
  }).catch((err) => {
    // Don't fail the render if a weight is slow/missing; Poppins falls back.
    console.warn(`Font load issue for ${file}:`, err);
  });
}

export const headingFamily = family;
export const bodyFamily = family;
