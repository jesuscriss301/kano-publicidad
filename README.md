# Kano Publicidad — web

Web de una sola página para Kano Publicidad (avisos luminosos, Bucaramanga).
Vite + React + TypeScript, con 4 componentes de React Bits:

| Sección | Componente | Para qué |
|---|---|---|
| Portada | `ElectricLogo` (ogl / WebGL) | Aviso de neón amarillo con la palabra NEON |
| Letras corpóreas | `DepthText` (solo CSS) | "Tu Marca" con volumen 3D |
| Stickers y vinilado | `StickerPeel` (WebGL) | Sticker de Kano que se despega y se arrastra |
| Galería | `Masonry` | Fotos de Instagram, se actualizan solas |

Los efectos pesados se cargan solo cuando hacen falta y, si el usuario tiene activada la
opción "reducir movimiento" o el navegador no soporta WebGL2, se muestra una versión fija.

## Secciones

Portada (neón) · Lo que hacemos · Servicios · **Aliados** · Cómo trabajamos · Galería de Instagram ·
**Preguntas frecuentes** · Contacto · **No te olvides de tu web** (promo de EasyPro Digital).

**Aliados:** las imágenes de `public/aliados/` son fotos de los avisos que Kano les hizo a cada empresa
(sacadas de su Instagram). Para agregar o quitar una, edita `ALLIES` en `src/config.ts`.

## SEO

- Título y descripción pensados para "avisos luminosos Bucaramanga".
- El HTML sale **pre-renderizado** al compilar: Google lee todo el texto sin ejecutar JavaScript.
- Ficha de negocio local, preguntas frecuentes y lista de clientes en datos estructurados
  (`src/seo.ts`), con las ciudades donde instalan y envíos a Colombia.
- `robots.txt` y `sitemap.xml` los genera el servidor.
- Imagen para compartir por WhatsApp/Facebook: `public/og-image.jpg`.
- **Dominio:** no hace falta configurarlo. El servidor usa el dominio desde el que se visita la
  web. Si quieres fijarlo, pon la variable `SITE_URL=https://tudominio.com`.

Cuando tengan dominio: regístrenlo en Google Search Console, envíen el `sitemap.xml` y creen
el perfil de Google Business de Kano con el enlace a la web.

## Cambiar datos

Todo está en `src/config.ts`: WhatsApp, usuario de Instagram, ciudad y cuántas fotos mostrar.
Los colores de la marca están en `src/styles.css` (`--navy` y `--amber`).
El logo está recreado a mano en `src/components/ui.tsx`; si el cliente pasa el original, reemplázalo.

## Desarrollo

```bash
npm install
npm run dev            # web en http://localhost:5173 (la galería mostrará "ver en Instagram")
npm run build
IG_ACCESS_TOKEN=xxx node server/server.mjs   # web + galería en http://localhost:3000
```

## Galería de Instagram

El mini servidor (`server/server.mjs`, sin dependencias) consulta Instagram cada 30 minutos,
guarda las fotos para que los enlaces nunca caduquen y **renueva el token solo** cada 7 días
(los tokens duran 60 días).

### Sacar el token (una sola vez)

1. La cuenta `@kano.publicidad` debe ser **profesional** (empresa o creador) — desde la app:
   Configuración → Tipo de cuenta.
2. En <https://developers.facebook.com/apps> crea una app de tipo **Empresa** y agrega el
   producto **Instagram → API con inicio de sesión de Instagram**.
3. En "Generar tokens de acceso", agrega la cuenta de Kano (tu amigo tendrá que aceptar el permiso
   desde su Instagram) y copia el token. Ese ya es de larga duración (60 días).
4. Ponlo en la variable `IG_ACCESS_TOKEN`.

Si el token se cambia por uno nuevo en la variable, el servidor usa el nuevo automáticamente.

## Subir a Dokploy

1. Sube esta carpeta a un repo de GitHub.
2. En Dokploy: **Create Application** → origen GitHub → Build Type **Dockerfile**.
3. Variables de entorno: `IG_ACCESS_TOKEN=...`
4. Volumen: monta `/app/data` (ahí se guardan el token renovado y las fotos).
5. Dominio: apunta el dominio al puerto **3000** con HTTPS (Traefik).

Revisa que funciona en `https://tudominio.com/api/instagram`.
