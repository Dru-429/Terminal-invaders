export function drawShip(ctx: any, x: number, y: number) {
  ctx.fillRect(x + 4, y, 2, 2);
  ctx.fillRect(x + 2, y + 2, 6, 1);
  ctx.fillRect(x, y + 3, 10, 2);
}