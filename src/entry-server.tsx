/** Se usa solo al compilar: genera el HTML de la página para que Google lo lea sin ejecutar JavaScript. */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { buildJsonLd } from './seo';

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

export function jsonLd() {
  return buildJsonLd()
    .map(o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ');
}
