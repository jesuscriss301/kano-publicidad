import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/montserrat/wght.css';
import '@fontsource-variable/montserrat/wght-italic.css';
import '@fontsource/sacramento/latin-400.css';
import './styles.css';
import App from './App';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// En producción el HTML ya viene pre-renderizado (bueno para Google): solo se "activa".
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
