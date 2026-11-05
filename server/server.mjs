/**
 * Mini servidor de Kano Publicidad (Node 20+, sin dependencias).
 *
 *  - Sirve la web compilada (carpeta dist/).
 *  - GET /api/instagram         → últimas publicaciones de Instagram en JSON.
 *  - GET /api/instagram/img/:id → la foto de cada publicación (pasa por aquí para que
 *                                 los enlaces de Instagram, que caducan, nunca se rompan).
 *
 * Variables de entorno:
 *  IG_ACCESS_TOKEN  Token de larga duración de la "Instagram API con inicio de sesión de Instagram".
 *  PORT             Puerto (por defecto 3000).
 *  DATA_DIR         Carpeta donde se guarda el token renovado y la caché (por defecto ./data).
 *                   En Dokploy móntala como volumen para que sobreviva a los redeploys.
 *  CACHE_MINUTES    Cada cuánto se consulta Instagram (por defecto 30).
 *  SITE_URL         Dominio oficial (ej. https://kanopublicidad.com). Cualquier otro dominio que llegue a
 *                   este servidor (www, demos...) se redirige aquí con un 301 (bueno para el SEO).
 *  LEGACY_PATH      Ruta vieja a quitar al redirigir (ej. /kano-publicidad de demos.easyprodigital.com).
 *  BASE_PATH        Ruta donde vive la web, ej. /kano-publicidad (debe ser la misma con la que se compiló).
 *                   Funciona tanto si Traefik quita la ruta ("strip path") como si no.
 */
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { join, extname, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, '..', 'dist');
const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = process.env.DATA_DIR || join(ROOT, '..', 'data');
const CACHE_MS = Number(process.env.CACHE_MINUTES || 30) * 60_000;
const REFRESH_EVERY_MS = 7 * 24 * 3600_000; // renovar el token cada 7 días (dura 60)
const MAX_POSTS = 30;
const GRAPH = 'https://graph.instagram.com';
const BASE = `/${(process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, ''); // '' o '/kano-publicidad'

const TOKEN_FILE = join(DATA_DIR, 'token.json');
const IMG_DIR = join(DATA_DIR, 'img');

let tokenState = { token: process.env.IG_ACCESS_TOKEN || '', refreshedAt: 0 };
let feed = { at: 0, posts: [], media: new Map() }; // media: id -> url original de Instagram
let inflight = null;

const log = (...a) => console.log(new Date().toISOString(), ...a);

/* ---------------- token ---------------- */
async function loadToken() {
  await mkdir(IMG_DIR, { recursive: true });
  try {
    const saved = JSON.parse(await readFile(TOKEN_FILE, 'utf8'));
    // Si en el entorno ponen un token NUEVO, ese manda sobre el guardado
    if (saved.token && (!process.env.IG_ACCESS_TOKEN || saved.seed === process.env.IG_ACCESS_TOKEN)) {
      tokenState = saved;
    }
  } catch {
    /* primera vez */
  }
}

async function refreshTokenIfNeeded() {
  if (!tokenState.token || Date.now() - tokenState.refreshedAt < REFRESH_EVERY_MS) return;
  try {
    const r = await fetch(`${GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token=${tokenState.token}`);
    const j = await r.json();
    if (j.access_token) {
      tokenState = { token: j.access_token, refreshedAt: Date.now(), seed: process.env.IG_ACCESS_TOKEN || '' };
      await writeFile(TOKEN_FILE, JSON.stringify(tokenState));
      log('Token de Instagram renovado');
    } else {
      log('No se pudo renovar el token:', j.error?.message || r.status);
    }
  } catch (e) {
    log('Error renovando token:', e.message);
  }
}

/* ---------------- feed ---------------- */
async function fetchFeed() {
  if (!tokenState.token) throw new Error('Falta IG_ACCESS_TOKEN');
  await refreshTokenIfNeeded();
  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const r = await fetch(`${GRAPH}/me/media?fields=${fields}&limit=${MAX_POSTS}&access_token=${tokenState.token}`);
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || `Instagram ${r.status}`);

  const media = new Map();
  const posts = (j.data || [])
    .map(p => {
      const src = p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url;
      if (!src) return null;
      media.set(p.id, src);
      return { id: p.id, img: `${BASE}/api/instagram/img/${p.id}`, url: p.permalink, caption: p.caption || '', type: p.media_type, date: p.timestamp };
    })
    .filter(Boolean);

  feed = { at: Date.now(), posts, media };
  log(`Feed actualizado: ${posts.length} publicaciones`);
}

async function getFeed() {
  if (Date.now() - feed.at < CACHE_MS && feed.posts.length) return feed;
  inflight ??= fetchFeed().finally(() => (inflight = null));
  try {
    await inflight;
  } catch (e) {
    log('Error leyendo Instagram:', e.message);
    if (!feed.posts.length) throw e; // si hay caché vieja, se sigue mostrando
  }
  return feed;
}

/* ---------------- respuestas ---------------- */
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json',
  '.ico': 'image/x-icon', '.txt': 'text/plain'
};

const json = (res, code, body, extra = {}) => {
  res.writeHead(code, { 'content-type': 'application/json; charset=utf-8', ...extra });
  res.end(JSON.stringify(body));
};

async function serveImage(res, id) {
  if (!/^\d+$/.test(id)) return json(res, 400, { error: 'id inválido' });
  const file = join(IMG_DIR, `${id}.jpg`);
  try {
    await stat(file);
  } catch {
    const { media } = await getFeed();
    const src = media.get(id);
    if (!src) return json(res, 404, { error: 'no encontrada' });
    const r = await fetch(src);
    if (!r.ok) return json(res, 502, { error: 'Instagram no respondió' });
    await writeFile(file, Buffer.from(await r.arrayBuffer()));
  }
  res.writeHead(200, { 'content-type': 'image/jpeg', 'cache-control': 'public, max-age=604800, immutable' });
  createReadStream(file).pipe(res);
}

/* ---------------- SEO: dominio, robots y sitemap ---------------- */
// Si no hay SITE_URL, se usa el dominio desde el que llega la visita (Traefik manda x-forwarded-*)
function siteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  const proto = (req.headers['x-forwarded-proto'] || 'http').split(',')[0].trim();
  const host = (req.headers['x-forwarded-host'] || req.headers.host || 'localhost').split(',')[0].trim();
  return `${proto}://${host}${BASE}`;
}

let indexCache = null;
async function serveIndex(req, res) {
  indexCache ??= await readFile(join(DIST, 'index.html'), 'utf8');
  res.writeHead(200, { 'content-type': TYPES['.html'], 'cache-control': 'no-cache' });
  res.end(indexCache.replaceAll('__SITE_URL__', siteUrl(req)));
}

function serveRobots(req, res) {
  res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
  res.end(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl(req)}/sitemap.xml\n`);
}

async function serveSitemap(req, res) {
  let lastmod = new Date().toISOString().slice(0, 10);
  try {
    lastmod = (await stat(join(DIST, 'index.html'))).mtime.toISOString().slice(0, 10);
  } catch {}
  res.writeHead(200, { 'content-type': 'application/xml; charset=utf-8' });
  res.end(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl(req)}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image><image:loc>${siteUrl(req)}/og-kano.jpg</image:loc></image:image>
  </url>
</urlset>
`);
}

async function serveStatic(req, res, pathname) {
  let file = normalize(join(DIST, decodeURIComponent(pathname)));
  if (!file.startsWith(DIST)) file = join(DIST, 'index.html'); // nada fuera de dist/
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
  } catch {
    file = join(DIST, 'index.html'); // una sola página
  }
  if (file === join(DIST, 'index.html')) return serveIndex(req, res);
  const ext = extname(file);
  const cache = file.startsWith(join(DIST, 'assets')) ? 'public, max-age=31536000, immutable' : 'no-cache';
  res.writeHead(200, { 'content-type': TYPES[ext] || 'application/octet-stream', 'cache-control': cache });
  createReadStream(file).pipe(res);
}

const CANONICAL = process.env.SITE_URL ? new URL(process.env.SITE_URL) : null;
const LEGACY = (process.env.LEGACY_PATH || '').replace(/\/+$/, '');

/** Redirige a SITE_URL si la visita llega por otro dominio (www, demos.easyprodigital.com, ...) */
function canonicalRedirect(req, res, url) {
  if (!CANONICAL || url.pathname === '/health') return false;
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim().split(':')[0];
  if (!host || host === CANONICAL.hostname || host === 'localhost' || /^[\d.]+$/.test(host)) return false;
  let path = url.pathname;
  if (LEGACY && (path === LEGACY || path.startsWith(`${LEGACY}/`))) path = path.slice(LEGACY.length) || '/';
  const base = CANONICAL.href.replace(/\/$/, '');
  res.writeHead(301, { location: `${base}${path}${url.search}` });
  res.end();
  return true;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (canonicalRedirect(req, res, url)) return;
  if (BASE) {
    if (url.pathname === BASE) {
      res.writeHead(301, { location: `${BASE}/${url.search}` });
      return res.end();
    }
    if (url.pathname.startsWith(`${BASE}/`)) url.pathname = url.pathname.slice(BASE.length);
  }
  try {
    if (url.pathname === '/api/instagram') {
      // sin token: lista vacía (la web muestra sus fotos de respaldo) en vez de un error
      if (!tokenState.token) return json(res, 200, { posts: [], reason: 'sin-token' });
      const { posts } = await getFeed();
      const limit = Math.min(MAX_POSTS, Number(url.searchParams.get('limit')) || 12);
      return json(res, 200, { posts: posts.slice(0, limit) }, { 'cache-control': 'public, max-age=300' });
    }
    const img = url.pathname.match(/^\/api\/instagram\/img\/([^/]+)$/);
    if (img) return await serveImage(res, img[1]);
    if (url.pathname === '/health') return json(res, 200, { ok: true });
    if (url.pathname === '/robots.txt') return serveRobots(req, res);
    if (url.pathname === '/sitemap.xml') return await serveSitemap(req, res);
    return await serveStatic(req, res, url.pathname);
  } catch (e) {
    log('Error:', e.message);
    if (!res.headersSent) json(res, 503, { error: 'Galería no disponible por ahora' });
  }
});

await loadToken();
server.listen(PORT, () => log(`Kano web en http://localhost:${PORT}`));
