# Flyer Promo Video (Remotion)

A vertical **1080×1920 (9:16)**, ~18-second promo video built with
[Remotion](https://remotion.dev). Everything you edit lives in **`src/config.ts`**.

## Run it locally

You need [Node.js](https://nodejs.org) 18+.

```bash
npm install        # installs Remotion (downloads Chromium on first render)
npm run dev        # opens Remotion Studio — live preview in the browser
npm run render     # renders out/video.mp4
```

> Note: the cloud environment that scaffolded this can't render video
> (its network policy blocks Remotion's Chromium download). Rendering
> works normally on your own machine.

## Add your assets

1. **Images** — drop your background photos in `public/images/`
   (e.g. `scene1.jpg`, `scene2.jpg`, …).
2. **Text, colors, fonts, scene timing** — edit `src/config.ts`:
   - `COLORS` — your brand palette.
   - `FONTS` — Google Font names, or tell me to wire up custom font files
     placed in `public/fonts/`.
   - `SCENES` — for each scene set `image`, `title`, `subtitle`, `kicker`,
     `align` (`top` / `center` / `bottom`), and `durationInSeconds`.
   - `OUTRO` — closing card (brand, tagline, contact).

The total video length is computed automatically from the scene durations.

## Structure

```
src/
  config.ts              ← EDIT HERE (text, colors, fonts, images, timing)
  fonts.ts               ← font loading
  Root.tsx               ← composition registration
  Promo.tsx              ← sequences the scenes + outro
  components/
    SceneCard.tsx        ← full-screen scene: bg image + Ken Burns + text
    Outro.tsx            ← closing call-to-action card
public/
  images/                ← your background photos
  fonts/                 ← (optional) custom font files
```
