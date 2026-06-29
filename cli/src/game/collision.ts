import { Alien, Bullet, Nuke, Ship } from "../types/game.types";

export function detectCollision(bullet: Bullet, alien: Alien): boolean {
  return (
    bullet.x < alien.x + alien.width &&
    bullet.x + 1 > alien.x &&
    bullet.y < alien.y + alien.height &&
    bullet.y + 3 > alien.y
  );
}

export function detectShipCollision(nuke: Nuke, ship: Ship): boolean {
  return (
    nuke.x < ship.x + ship.width &&
    nuke.x + 2 > ship.x &&
    nuke.y < ship.y + ship.height &&
    nuke.y + 4 > ship.y
  );
}