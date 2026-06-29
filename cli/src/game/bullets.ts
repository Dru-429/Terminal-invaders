import { ship, bulletArray,AUTO_FIRE_INTERVAL, lastShotTime } from "./state.js";

export function shoot() {
  const now = Date.now();

  if (now - lastShotTime >= AUTO_FIRE_INTERVAL && bulletArray.length < 6) {
    bulletArray.push({
      x: ship.x + 5,
      y: ship.y,
      used: false,
    });
  }
}