export function drawAlien(ctx: any, x: number, y: number) {
  ctx.fillRect(x + 2, y, 1, 1);
  ctx.fillRect(x + 8, y, 1, 1);
  ctx.fillRect(x + 3, y + 1, 5, 1);
  ctx.fillRect(x + 1, y + 2, 9, 2);
  ctx.fillRect(x, y + 3, 11, 1);
  ctx.fillRect(x + 2, y + 4, 2, 1);
  ctx.fillRect(x + 7, y + 4, 2, 1);
}