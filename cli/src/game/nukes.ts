import { game } from "./state.js";

export function drawNukes(ctx: any): void {
  game.nukeArray.forEach((nuke) => {
    ctx.fillRect(nuke.x + 1, nuke.y, 1, 2);
    ctx.fillRect(nuke.x - 1, nuke.y + 2, 1, 1);
    ctx.fillRect(nuke.x + 3, nuke.y + 2, 1, 1);
    ctx.fillRect(nuke.x, nuke.y + 2, 3, 3);
    ctx.fillRect(nuke.x, nuke.y + 5, 3, 1);
    ctx.fillRect(nuke.x + 1, nuke.y + 6, 1, 1);
  });
}
