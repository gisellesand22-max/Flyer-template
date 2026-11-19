# Corta los silencios de la toma original y normaliza el audio.
# Uso: python3 scripts/cortar_silencios.py assets/original.mov public/toma.mp4
import subprocess, sys, json
src, out = sys.argv[1], sys.argv[2]
segs = [(0.66,7.65),(8.15,11.82),(12.62,13.75),(14.46,22.02),(22.19,22.48),(23.15,28.25),(28.47,31.37),(32.07,33.14),(33.35,36.41),(36.66,39.77),(40.45,42.25),(43.36,43.95)]
n=len(segs); f=[]
f.append(f"[0:v]fps=30,scale=1080:1920,format=yuv420p,split={n}"+"".join(f"[v{i}]" for i in range(n)))
f.append(f"[0:a:0]aformat=sample_rates=48000:channel_layouts=stereo,asplit={n}"+"".join(f"[a{i}]" for i in range(n)))
for i,(a,b) in enumerate(segs):
    d=b-a
    f.append(f"[v{i}]trim={a}:{b},setpts=PTS-STARTPTS[x{i}]")
    f.append(f"[a{i}]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st={d-0.02:.3f}:d=0.02[y{i}]")
f.append("".join(f"[x{i}][y{i}]" for i in range(n))+f"concat=n={n}:v=1:a=1[v][a]")
f.append("[a]loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[an]")
subprocess.run(["ffmpeg","-v","error","-y","-i",src,"-filter_complex",";".join(f),"-map","[v]","-map","[an]","-c:v","libx264","-crf","16","-preset","medium","-c:a","aac","-b:a","192k",out],check=True)
print(json.dumps(segs))
