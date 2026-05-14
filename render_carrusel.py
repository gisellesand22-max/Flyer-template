#!/usr/bin/env python3
"""Render Harmony Real Estate Instagram carousel to PNG slides."""

from pathlib import Path
from playwright.sync_api import sync_playwright

HTML_PATH = Path("/home/claude/harmony_carrusel.html")
OUT_DIR = Path("/home/claude")
SLIDE_W = 1080
SLIDE_H = 1350
SCALE = 2
FONT_WAIT_MS = 900


def main():
    url = f"file://{HTML_PATH.resolve()}"

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            viewport={"width": SLIDE_W, "height": SLIDE_H},
            device_scale_factor=SCALE,
        )
        page = context.new_page()
        page.goto(url, wait_until="networkidle")
        page.evaluate("() => document.fonts.ready")
        page.wait_for_timeout(FONT_WAIT_MS)

        for i in range(1, 7):
            selector = f"#slide-{i}"
            page.evaluate(
                """sel => {
                    const el = document.querySelector(sel);
                    const top = el.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo(0, top);
                }""",
                selector,
            )
            page.wait_for_timeout(150)

            out_path = OUT_DIR / f"slide_{i}.png"
            page.screenshot(
                path=str(out_path),
                clip={"x": 0, "y": 0, "width": SLIDE_W, "height": SLIDE_H},
            )
            print(f"Rendered {out_path}")

        browser.close()


if __name__ == "__main__":
    main()
