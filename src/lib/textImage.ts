/**
 * Dibuja en un canvas (con las fuentes de la web ya cargadas) y devuelve un PNG en data URL.
 * Lo usan ElectricLogo (que necesita una imagen con transparencia para trazar el contorno)
 * y StickerPeel (que necesita la imagen del sticker).
 */
export async function drawToDataUrl(
  width: number,
  height: number,
  fonts: string[],
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
): Promise<string> {
  try {
    await Promise.all(fonts.map(f => document.fonts.load(f)));
  } catch {
    /* si la fuente falla, se dibuja con la de respaldo */
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  draw(ctx, width, height);
  return canvas.toDataURL('image/png');
}

/** Ajusta el tamaño de letra para que el texto ocupe como máximo `maxWidth`. */
export function fitFont(
  ctx: CanvasRenderingContext2D,
  text: string,
  template: (size: number) => string,
  maxWidth: number,
  start: number
) {
  let size = start;
  ctx.font = template(size);
  while (ctx.measureText(text).width > maxWidth && size > 8) {
    size -= 2;
    ctx.font = template(size);
  }
  return size;
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
