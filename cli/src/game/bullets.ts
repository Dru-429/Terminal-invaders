import { game, AUTO_FIRE_INTERVAL } from "./state.js";

export function shoot(): void {
  const now = Date.now();

  if (
    now - game.lastShotTime >= AUTO_FIRE_INTERVAL &&
    game.bulletArray.length < 6
  ) {
    game.bulletArray.push({
      x: game.ship.x + 5,
      y: game.ship.y,
      used: false,
    });

    game.lastShotTime = now;
  }
}
