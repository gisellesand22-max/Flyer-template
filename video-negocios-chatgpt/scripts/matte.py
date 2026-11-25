# Recorta la figura de la persona (Robust Video Matting) y guarda un PNG por cuadro
# con la silueta en el canal alfa. Se usa para poner texto DETRÁS de ti.
# Uso: python3 scripts/matte.py public/toma.mp4 public/matte modelo.onnx
import sys, os, subprocess
import numpy as np, onnxruntime as ort
from PIL import Image
src, outdir, model = sys.argv[1:4]
os.makedirs(outdir, exist_ok=True)
W, H = 1080, 1920
sess = ort.InferenceSession(model, providers=["CPUExecutionProvider"])
dr = np.array([0.25], dtype=np.float32)
rec = [np.zeros((1,1,1,1), dtype=np.float32) for _ in range(4)]
p = subprocess.Popen(["ffmpeg","-v","error","-i",src,"-f","rawvideo","-pix_fmt","rgb24","-"], stdout=subprocess.PIPE)
n = 0
while True:
    buf = p.stdout.read(W*H*3)
    if len(buf) < W*H*3: break
    x = np.frombuffer(buf, dtype=np.uint8).reshape(H,W,3).astype(np.float32)/255.0
    x = x.transpose(2,0,1)[None]
    fgr, pha, *rec = sess.run(None, {"src":x,"r1i":rec[0],"r2i":rec[1],"r3i":rec[2],"r4i":rec[3],"downsample_ratio":dr})
    a = (np.clip(pha[0,0],0,1)*255).astype(np.uint8)
    rgba = np.zeros((H,W,4), dtype=np.uint8); rgba[...,:3]=255; rgba[...,3]=a
    Image.fromarray(rgba, "RGBA").save(f"{outdir}/{n:04d}.png", compress_level=1)
    n += 1
print("frames", n)
