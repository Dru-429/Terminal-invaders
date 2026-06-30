import Canvas from "drawille-canvas";
import type { Alien, Bullet, Nuke, Ship } from "../types/game.types.js";

export const BOUNDARY_MIN_X = 5;
export const BOUNDARY_MAX_X = 155;
export const BOUNDARY_MIN_Y = 2;
export const BOUNDARY_MAX_Y = 78;

export const INITIAL_ALIEN_ROWS = 2;
export const ALIEN_COLS = 5;
export const ALIEN_SPAWN_INTERVAL = 2500;
export const AUTO_FIRE_INTERVAL = 250;
export const NUKE_DROP_CHANCE = 0.015;
export const NUKE_SPEED = 2;

export const alienCanvas = new Canvas(160, 80);
export const alienCtx = alienCanvas.getContext("2d") as any;

export const shipCanvas = new Canvas(160, 80);
export const shipCtx = shipCanvas.getContext("2d") as any;

export const nukeCanvas = new Canvas(160, 80);
export const nukeCtx = nukeCanvas.getContext("2d") as any;

export const alienWidth = 10;
export const alienHeight = 6;

export const game = {
  ship: { x: 75, y: 70, width: 10, height: 5 } as Ship,
  alienArray: [] as Alien[],
  bulletArray: [] as Bullet[],
  nukeArray: [] as Nuke[],
  score: 0,
  gameOver: false,
  alienVelocityX: 1,
  lastAlienSpawn: Date.now(),
  lastShotTime: Date.now(),
};
