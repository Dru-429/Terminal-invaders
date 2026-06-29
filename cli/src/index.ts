#!/usr/bin/env node

import pkg from "terminal-kit";
import Canvas from "drawille-canvas";
import figlet from "figlet";
import chalk from "chalk";

// Types
interface Ship {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Alien {
  x: number;
  y: number;
  width: number;
  height: number;
  alive: boolean;
}

interface Bullet {
  x: number;
  y: number;
  used: boolean;
}

interface Nuke {
  x: number;
  y: number;
  used: boolean;
}

const { terminal: term } = pkg;

const alienCanvas = new Canvas(160, 80);
const alienCtx = alienCanvas.getContext("2d") as any;

const shipCanvas = new Canvas(160, 80);
const shipCtx = shipCanvas.getContext("2d") as any;

const nukeCanvas = new Canvas(160, 80);
const nukeCtx = nukeCanvas.getContext("2d") as any;

// Boundaries
const BOUNDARY_MIN_X = 5;
const BOUNDARY_MAX_X = 155;
const BOUNDARY_MIN_Y = 2;
const BOUNDARY_MAX_Y = 78;

// Game Constants
const INITIAL_ALIEN_ROWS = 2;
const ALIEN_COLS = 5;
const ALIEN_SPAWN_INTERVAL = 2500;
const AUTO_FIRE_INTERVAL = 250;

const NUKE_DROP_CHANCE = 0.015;
const NUKE_SPEED = 2;

let lastShotTime = Date.now();

// Game State
let ship: Ship = {
  x: 75,
  y: 70,
  width: 10,
  height: 5,
};

let alienWidth = 10;
let alienHeight = 6;

let alienArray: Alien[] = [];
let bulletArray: Bullet[] = [];
let nukeArray: Nuke[] = [];

let score = 0;
let gameOver = false;
let alienVelocityX = 1;
let lastAlienSpawn = Date.now();

// Drawing Functions
function drawShip(ctx: any, x: number, y: number): void {
  ctx.fillRect(x + 4, y, 2, 2);
  ctx.fillRect(x + 2, y + 2, 6, 1);
  ctx.fillRect(x, y + 3, 10, 2);
}

function drawAlien(ctx: any, x: number, y: number): void {
  ctx.fillRect(x + 2, y, 1, 1);
  ctx.fillRect(x + 8, y, 1, 1);
  ctx.fillRect(x + 3, y + 1, 5, 1);
  ctx.fillRect(x + 1, y + 2, 9, 2);
  ctx.fillRect(x, y + 3, 11, 1);
  ctx.fillRect(x + 2, y + 4, 2, 1);
  ctx.fillRect(x + 7, y + 4, 2, 1);
}

function drawNukes(ctx: any): void {
  nukeArray.forEach((nuke) => {
    // flame
    ctx.fillRect(nuke.x, nuke.y - 2, 2, 2);

    // body
    ctx.fillRect(nuke.x, nuke.y, 2, 4);
  });
}

// Init
function init(): void {
  term.fullscreen(true);
  term.hideCursor(true);
  term.grabInput(true);

  term.on("key", (name: string) => {
    if (name === "CTRL_C") process.exit();

    if (gameOver && (name === "r" || name === "R")) {
      resetGame();
      return;
    }

    if (gameOver) return;

    if (name === "LEFT") ship.x -= 4;
    if (name === "RIGHT") ship.x += 4;

    clampShip();
  });

  resetGame();
  gameLoop();
}

// Spawn Aliens
function spawnAliens(rows: number = 1, cols: number = ALIEN_COLS): void {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      alienArray.push({
        x: c * (alienWidth + 6) + 20,
        y: 8 + r * (alienHeight + 4),
        width: alienWidth,
        height: alienHeight,
        alive: true,
      });
    }
  }
}

// Push swarm down
function pushAlienSwarmDown(): void {
  alienArray.forEach((alien) => {
    if (!alien.alive) return;

    alien.y += alienHeight + 4;

    if (alien.y >= ship.y - 4) {
      gameOver = true;
    }
  });
}

// Drop nuke randomly
function dropNuke(): void {
  const aliveAliens = alienArray.filter((alien) => alien.alive);

  if (aliveAliens.length === 0) return;

  if (Math.random() < NUKE_DROP_CHANCE) {
    const randomAlien =
      aliveAliens[Math.floor(Math.random() * aliveAliens.length)];

    if (!randomAlien) return;

    nukeArray.push({
      x: randomAlien.x + Math.floor(randomAlien.width / 2),
      y: randomAlien.y + randomAlien.height,
      used: false,
    });
  }
}
function resetGame(): void {
  ship.x = 75;
  bulletArray = [];
  alienArray = [];
  nukeArray = [];

  score = 0;
  gameOver = false;
  alienVelocityX = 1;

  spawnAliens(INITIAL_ALIEN_ROWS);
  lastAlienSpawn = Date.now();
}

function clampShip(): void {
  ship.x = Math.max(
    BOUNDARY_MIN_X,
    Math.min(ship.x, BOUNDARY_MAX_X - ship.width)
  );
}

// Update Logic
function update(): void {
  if (gameOver) return;

  clampShip();
  shoot();
  dropNuke();

  let hitWall = false;

  // Move aliens
  alienArray.forEach((alien) => {
    if (!alien.alive) return;

    alien.x += alienVelocityX;

    if (alien.x + alien.width >= BOUNDARY_MAX_X || alien.x <= BOUNDARY_MIN_X) {
      hitWall = true;
    }

    if (alien.y >= ship.y) {
      gameOver = true;
    }
  });

  if (hitWall) {
    alienVelocityX *= -1;
  }

  alienVelocityX *= 1.0005;

  // Bullets
  bulletArray.forEach((bullet) => {
    bullet.y -= 3;

    alienArray.forEach((alien) => {
      if (alien.alive && !bullet.used && detectCollision(bullet, alien)) {
        alien.alive = false;
        bullet.used = true;
        score += 100;
      }
    });
  });

  // Nukes
  nukeArray.forEach((nuke) => {
    nuke.y += NUKE_SPEED;

    if (detectShipCollision(nuke, ship)) {
      gameOver = true;
    }
  });

  // Cleanup
  bulletArray = bulletArray.filter((b) => b.y > 0 && !b.used);
  alienArray = alienArray.filter((a) => a.alive);
  nukeArray = nukeArray.filter((n) => n.y < BOUNDARY_MAX_Y && !n.used);

  // Continuous spawn
  if (Date.now() - lastAlienSpawn >= ALIEN_SPAWN_INTERVAL) {
    pushAlienSwarmDown();
    spawnAliens(1);
    lastAlienSpawn = Date.now();
  }
}

// Draw
function draw(): void {
  alienCtx.clearRect(0, 0, 160, 80);
  shipCtx.clearRect(0, 0, 160, 80);
  nukeCtx.clearRect(0, 0, 160, 80);

  // Boundary
  shipCtx.fillRect(
    BOUNDARY_MIN_X,
    BOUNDARY_MIN_Y,
    BOUNDARY_MAX_X - BOUNDARY_MIN_X,
    1
  );
  shipCtx.fillRect(
    BOUNDARY_MIN_X,
    BOUNDARY_MAX_Y,
    BOUNDARY_MAX_X - BOUNDARY_MIN_X,
    1
  );
  shipCtx.fillRect(
    BOUNDARY_MIN_X,
    BOUNDARY_MIN_Y,
    1,
    BOUNDARY_MAX_Y - BOUNDARY_MIN_Y
  );
  shipCtx.fillRect(
    BOUNDARY_MAX_X,
    BOUNDARY_MIN_Y,
    1,
    BOUNDARY_MAX_Y - BOUNDARY_MIN_Y
  );

  // Aliens
  alienArray.forEach((alien) => {
    if (alien.alive) drawAlien(alienCtx, alien.x, alien.y);
  });

  // Ship
  drawShip(shipCtx, ship.x, ship.y);

  // Bullets
  bulletArray.forEach((bullet) => {
    shipCtx.fillRect(bullet.x, bullet.y, 1, 3);
  });

  // Nukes
  drawNukes(nukeCtx);

  const alienLines = alienCanvas.toString().split("\n");
  const shipLines = shipCanvas.toString().split("\n");
  const nukeLines = nukeCanvas.toString().split("\n");

  const maxLines = Math.max(
    alienLines.length,
    shipLines.length,
    nukeLines.length
  );

  function isBlank(char: string | undefined): boolean {
    return !char || char === " " || char === "\u2800";
  }

  let rendered = "";

  for (let y = 0; y < maxLines; y++) {
    const aLine = alienLines[y] || "";
    const sLine = shipLines[y] || "";
    const nLine = nukeLines[y] || "";

    const maxCols = Math.max(aLine.length, sLine.length, nLine.length);

    for (let x = 0; x < maxCols; x++) {
      const sChar = sLine[x];
      const aChar = aLine[x];
      const nChar = nLine[x];

      if (!isBlank(sChar)) {
        rendered += chalk.yellow(sChar);
      } else if (!isBlank(nChar)) {
        // top flame = orange
        if (y > 0 && isBlank(nLine[x])) {
          rendered += chalk.magenta(nChar);
        } else {
          rendered += chalk.red(nChar);
        }
      } else if (!isBlank(aChar)) {
        rendered += chalk.white(aChar);
      } else {
        rendered += " ";
      }
    }

    rendered += "\n";
  }

  term.moveTo(1, 1);
  process.stdout.write(rendered);

  term.moveTo(9, 2).white("← → Move | Auto Fire | R Restart");
  term.moveTo(2, 1).brightYellow(
    ` SCORE: ${String(score).padStart(5, "0")} `
  );

  if (gameOver) {
    const msg = figlet.textSync("GAME OVER");
    const lines = msg.split("\n");

    lines.forEach((line, index) => {
      term.moveTo(10, 6 + index).red(line);
    });
  }
}

// Auto fire
function shoot(): void {
  const now = Date.now();

  if (now - lastShotTime >= AUTO_FIRE_INTERVAL && bulletArray.length < 6) {
    bulletArray.push({
      x: ship.x + 5,
      y: ship.y,
      used: false,
    });

    lastShotTime = now;
  }
}

// Collision
function detectCollision(bullet: Bullet, alien: Alien): boolean {
  return (
    bullet.x < alien.x + alien.width &&
    bullet.x + 1 > alien.x &&
    bullet.y < alien.y + alien.height &&
    bullet.y + 3 > alien.y
  );
}

// Nuke vs Ship collision
function detectShipCollision(nuke: Nuke, ship: Ship): boolean {
  return (
    nuke.x < ship.x + ship.width &&
    nuke.x + 2 > ship.x &&
    nuke.y < ship.y + ship.height &&
    nuke.y + 4 > ship.y
  );
}

// Main Loop
function gameLoop(): void {
  update();
  draw();
  setTimeout(gameLoop, 40);
}

init();