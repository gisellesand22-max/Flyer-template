import {Config} from '@remotion/cli/config';
import fs from 'fs';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);

// En este entorno no hay acceso para descargar Chrome. Si existe el navegador
// preinstalado, se usa; en otra computadora Remotion descarga el suyo.
const local = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
if (fs.existsSync(local)) {
  Config.setBrowserExecutable(local);
}
