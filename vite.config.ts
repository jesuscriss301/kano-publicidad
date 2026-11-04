import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH permite publicar la web dentro de una ruta, por ejemplo /kano-publicidad/
const raw = process.env.BASE_PATH || '/';
const base = `/${raw.replace(/^\/+|\/+$/g, '')}/`.replace('//', '/');

export default defineConfig({
  base,
  plugins: [react()]
});
