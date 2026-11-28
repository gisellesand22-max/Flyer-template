# Retoque suave: suaviza la piel de la cara y el cuello y blanquea un poco los dientes.
# Uso: python3 scripts/retoque.py public/toma.mp4 public/matte yunet.onnx public/toma_retoque.mp4
# El modelo YuNet (detector de caras) se baja de https://huggingface.co/opencv/face_detection_yunet
import sys, subprocess
import numpy as np, cv2
from PIL import Image
src, matte_dir, model, out = sys.argv[1:5]
W, H = 1080, 1920
SUAVE = 0.6    # intensidad del suavizado de piel (0 a 1)
DIENTES = 1.0  # intensidad del blanqueado de dientes (0 a 1)

det = cv2.FaceDetectorYN.create(model, "", (W, H), 0.6, 0.3, 5000)
rd = subprocess.Popen(["ffmpeg", "-v", "error", "-i", src, "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
wr = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", "30", "-i", "-", "-i", src,
                       "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-crf", "14", "-preset", "medium", "-pix_fmt", "yuv420p", "-c:a", "copy", out], stdin=subprocess.PIPE)
prev = None
n = 0
while True:
    buf = rd.stdout.read(W * H * 3)
    if len(buf) < W * H * 3: break
    f = np.frombuffer(buf, dtype=np.uint8).reshape(H, W, 3).copy()
    _, faces = det.detect(f)
    if faces is not None and len(faces):
        r = faces[0][:14].astype(np.float32)
        prev = r if prev is None else 0.6 * r + 0.4 * prev   # suaviza el movimiento de la máscara
    if prev is not None:
        x, y, w, h = prev[:4]
        # ── Piel: elipse que cubre cara y cuello, solo color de piel y solo dentro de tu figura ──
        a = np.array(Image.open(f"{matte_dir}/{min(n, 805):04d}.png").split()[3], dtype=np.float32) / 255.0
        ell = np.zeros((H, W), np.float32)
        cv2.ellipse(ell, (int(x + w / 2), int(y + h * 0.62)), (int(w * 0.66), int(h * 0.85)), 0, 0, 360, 1.0, -1)
        ycc = cv2.cvtColor(f, cv2.COLOR_BGR2YCrCb)
        skin = ((ycc[..., 1] > 133) & (ycc[..., 1] < 175) & (ycc[..., 2] > 77) & (ycc[..., 2] < 127)).astype(np.float32)
        m = cv2.GaussianBlur(ell * skin * (a > 0.6), (0, 0), 6)
        y0, y1 = max(0, int(y - h * 0.4)), min(H, int(y + h * 1.9))
        x0, x1 = max(0, int(x - w * 0.8)), min(W, int(x + w * 1.8))
        crop = f[y0:y1, x0:x1]
        sm = cv2.bilateralFilter(cv2.bilateralFilter(crop, 9, 38, 9), 9, 30, 7)
        mm = (m[y0:y1, x0:x1] * SUAVE)[..., None]
        f[y0:y1, x0:x1] = (crop * (1 - mm) + sm * mm).astype(np.uint8)
        # ── Dientes: entre las comisuras de la boca, solo pixeles claros y poco rosados ──
        rm, lm = prev[10:12], prev[12:14]
        c = (rm + lm) / 2
        mw = float(np.linalg.norm(rm - lm))
        hx, hy = int(mw * 0.55), int(mw * 0.28)
        cx, cy = int(c[0]), int(c[1])
        ys, ye, xs, xe = max(0, cy - hy), min(H, cy + hy), max(0, cx - hx), min(W, cx + hx)
        roi = f[ys:ye, xs:xe].astype(np.int16)
        if roi.size:
            hsv = cv2.cvtColor(f[ys:ye, xs:xe], cv2.COLOR_BGR2HSV)
            teeth = ((hsv[..., 1] < 70) & (hsv[..., 2] > 150) & ((roi[..., 2] - roi[..., 0]) < 30)).astype(np.float32)
            teeth = cv2.GaussianBlur(teeth, (0, 0), 1.2) * DIENTES
            hsv2 = hsv.astype(np.float32)
            hsv2[..., 1] *= 0.55
            hsv2[..., 2] = np.minimum(255, hsv2[..., 2] * 1.07 + 6)
            white = cv2.cvtColor(hsv2.clip(0, 255).astype(np.uint8), cv2.COLOR_HSV2BGR)
            t3 = teeth[..., None]
            f[ys:ye, xs:xe] = (f[ys:ye, xs:xe] * (1 - t3) + white * t3).astype(np.uint8)
    wr.stdin.write(f.tobytes())
    n += 1
wr.stdin.close(); wr.wait()
print("cuadros", n)
