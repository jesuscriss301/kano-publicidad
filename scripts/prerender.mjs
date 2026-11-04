// Inserta el HTML pre-renderizado y los datos para Google dentro de dist/index.html
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const dist = resolve('dist');
const ssr = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);

let html = await readFile(`${dist}/index.html`, 'utf8');
html = html
  .replace('<div id="root"></div>', `<div id="root">${ssr.render()}</div>`)
  .replace('<!--json-ld-->', ssr.jsonLd());

await writeFile(`${dist}/index.html`, html);
await rm(resolve('dist-ssr'), { recursive: true, force: true });
console.log('Prerender listo:', (html.length / 1024).toFixed(1), 'KB');
