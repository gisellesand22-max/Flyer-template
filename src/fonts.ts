/**
 * Font loading.
 *
 * Default: load from Google Fonts (no files needed).
 * If you give me custom font files, drop them in public/fonts/ and I'll
 * switch this to @remotion/fonts loadFont() with the local files.
 */
import { loadFont as loadHeading } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";

export const heading = loadHeading();
export const body = loadBody();

export const headingFamily = heading.fontFamily;
export const bodyFamily = body.fontFamily;
