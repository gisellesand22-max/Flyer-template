"""Arma public/base.mp4: la grabación con datos personales difuminados,
pausas en los momentos clave y sin audio. Lee src/timeline.json.

Uso: python3 scripts/build_base.py
"""
import json
import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
tl = json.loads((ROOT / "src/timeline.json").read_text())
FPS = tl["fps"]

# 1. Difuminados sobre el video original
chain = []
n = len(tl["blur"])
chain.append(f"[0:v]split={n + 1}[b0]" + "".join(f"[c{i}]" for i in range(n)))
for i, b in enumerate(tl["blur"]):
    chain.append(f"[c{i}]crop={b['w']}:{b['h']}:{b['x']}:{b['y']},boxblur=28:3[k{i}]")
    chain.append(
        f"[b{i}][k{i}]overlay={b['x']}:{b['y']}:enable='between(t,{b['from']},{b['to']})'[b{i + 1}]"
    )

# 2. Tramos: reproducir o congelar, todo en cuadros exactos
segs = tl["segments"]
chain.append(f"[b{n}]split={len(segs)}" + "".join(f"[s{i}]" for i in range(len(segs))))
for i, s in enumerate(segs):
    if "play" in s:
        a, b = (round(x * FPS) for x in s["play"])
        speed = s.get("speed", 1)
        chain.append(
            f"[s{i}]trim=start_frame={a}:end_frame={b},setpts=(PTS-STARTPTS)/{speed},fps={FPS}[o{i}]"
        )
    else:
        f = round(s["hold"] * FPS)
        d = round(s["dur"] * FPS)
        chain.append(
            f"[s{i}]trim=start_frame={f}:end_frame={f + 1},setpts=PTS-STARTPTS,"
            f"tpad=stop_mode=clone:stop={d - 1},fps={FPS}[o{i}]"
        )
chain.append("".join(f"[o{i}]" for i in range(len(segs))) + f"concat=n={len(segs)}:v=1:a=0[out]")

subprocess.run(
    [
        "ffmpeg", "-v", "error", "-y",
        "-i", str(ROOT / "assets/edits.mp4"),
        "-filter_complex", ";".join(chain),
        "-map", "[out]", "-an",
        "-c:v", "libx264", "-preset", "medium", "-crf", "14", "-pix_fmt", "yuv420p",
        str(ROOT / "public/base.mp4"),
    ],
    check=True,
)
print("public/base.mp4 listo")
