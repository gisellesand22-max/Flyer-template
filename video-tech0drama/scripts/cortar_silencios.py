# Corta los silencios de la toma original y normaliza el audio.
# Uso: python3 scripts/cortar_silencios.py assets/original.mov public/toma.mp4
import subprocess, sys, json
src, out = sys.argv[1], sys.argv[2]
# Se quitó el primer "¡Mira!" (original 18.53 a 18.89): lo dices dos veces seguidas.
# Tramos con voz (ffmpeg silencedetect, -32 dB, pausas de 0.3 s o más), con 0.06 s de margen por lado.
segs = [(0.91,3.286),(3.713,6.81),(7.567,13.118),(13.50,17.758),(19.794,21.083),(21.43,25.073),(25.289,27.115),(27.367,29.242),(29.577,32.908)]
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
t=0; bounds=[0.0]
for a,b in segs: t+=b-a; bounds.append(round(t,2))
print(json.dumps(bounds))
