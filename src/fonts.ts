/**
 * Font loading — Poppins, self-hosted from public/fonts/ so rendering
 * needs no network access. All text overlays use Poppins.
 */
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const family = "Poppins";

loadFont({
  family,
  url: staticFile("fonts/Poppins-Regular.ttf"),
  weight: "400",
});
loadFont({
  family,
  url: staticFile("fonts/Poppins-Medium.ttf"),
  weight: "500",
});
loadFont({
  family,
  url: staticFile("fonts/Poppins-SemiBold.ttf"),
  weight: "600",
});
loadFont({
  family,
  url: staticFile("fonts/Poppins-Bold.ttf"),
  weight: "700",
});

export const headingFamily = family;
export const bodyFamily = family;
