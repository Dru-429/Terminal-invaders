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

const { terminal: term } = pkg;

const alienCanvas = new Canvas(160, 80);
const alienCtx = alienCanvas.getContext("2d") as any;

const shipCanvas = new Canvas(160, 80);
const shipCtx = shipCanvas.getContext("2d") as any;

// Boundaries
const BOUNDARY_MIN_X = 5;
const BOUNDARY_MAX_X = 155;
const BOUNDARY_MIN_Y = 2;
const BOUNDARY_MAX_Y = 78;

// Game Constants
const INITIAL_ALIEN_ROWS = 2;
const ALIEN_COLS = 5;
const ALIEN_SPAWN_INTERVAL = 2500;
const AUTO_FIRE_INTERVAL = 250; // fires every 250ms
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

// Spawn Aliens (Continuous)
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

// Push swarm down when new row enters
function pushAlienSwarmDown(): void {
  alienArray.forEach((alien) => {
    if (!alien.alive) return;

    alien.y += alienHeight + 4;

    if (alien.y >= ship.y - 4) {
      gameOver = true;
    }
  });
}

function resetGame(): void {
  ship.x = 75;
  bulletArray = [];
  alienArray = [];

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

  // Wall bounce
  if (hitWall) {
    alienVelocityX *= -1;
  }

  // Speed ramp
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

  // Cleanup
  bulletArray = bulletArray.filter((b) => b.y > 0 && !b.used);
  alienArray = alienArray.filter((a) => a.alive);

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

  // Draw aliens
  alienArray.forEach((alien) => {
    if (alien.alive) {
      drawAlien(alienCtx, alien.x, alien.y);
    }
  });

  // Draw ship
  drawShip(shipCtx, ship.x, ship.y);

  // Draw bullets
  bulletArray.forEach((bullet) => {
    shipCtx.fillRect(bullet.x, bullet.y, 1, 3);
  });

  const alienLines = alienCanvas.toString().split("\n");
  const shipLines = shipCanvas.toString().split("\n");

  const maxLines = Math.max(alienLines.length, shipLines.length);

  function isBlank(char: string | undefined): boolean {
    return (
      char === undefined || char === "" || char === " " || char === "\u2800"
    );
  }

  let rendered = "";

  for (let y = 0; y < maxLines; y++) {
    const aLine = alienLines[y] || "";
    const sLine = shipLines[y] || "";
    const maxCols = Math.max(aLine.length, sLine.length);

    for (let x = 0; x < maxCols; x++) {
      const sChar = sLine[x];
      const aChar = aLine[x];

      if (!isBlank(sChar)) {
        rendered += chalk.yellow(sChar);
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

  // HUD
  term
    .moveTo(9, 2)
    .white("SPACE to fire | ← → to move | Press R to restart");

  term
    .moveTo(2, 1)
    .brightYellow(` SCORE: ${String(score).padStart(5, "0")} `);

  if (gameOver) {
    const msg = figlet.textSync("GAME OVER");
    const lines = msg.split("\n");

    lines.forEach((line, index) => {
      term.moveTo(10, 6 + index).red(line);
    });

    term.moveTo(34, 12).yellow(` SCORE: ${String(score).padStart(5, "0")} `);
    term.moveTo(30, 14).yellow(" Press 'R' to Restart ");
  }
}

// Shoot
function shoot(): void {
  const now = Date.now();

  if (
    now - lastShotTime >= AUTO_FIRE_INTERVAL &&
    bulletArray.length < 6
  ) {
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

// Main Loop
function gameLoop(): void {
  update();
  draw();
  setTimeout(gameLoop, 40);
}

init();