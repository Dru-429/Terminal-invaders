#!/usr/bin/env node

const term = require("terminal-kit").terminal;
const Canvas = require("drawille-canvas");
const figlet = require("figlet");

// --- 1. CONFIGURATION ---
const canvas = new Canvas(160, 80);
const ctx = canvas.getContext("2d");

let ship = { x: 75, y: 70, width: 10, height: 5 };
let alienWidth = 10,
  alienHeight = 6;
let alienArray = [];
let bulletArray = [];
let score = 0;
let gameOver = false;
let alienVelocityX = 1;

// --- 2. SPRITE RENDERING FUNCTIONS ---

function drawShip(ctx, x, y) {
  ctx.fillRect(x + 4, y, 2, 2); // Cannon tip
  ctx.fillRect(x + 2, y + 2, 6, 1); // Mid section
  ctx.fillRect(x, y + 3, 10, 2); // Base
}

function drawAlien(ctx, x, y) {
  ctx.fillRect(x + 2, y, 6, 1); // Top
  ctx.fillRect(x + 1, y + 1, 8, 1); // Eyes row
  ctx.fillRect(x + 2, y + 1, 1, 1); // Left eye hole (clear)
  ctx.fillRect(x + 7, y + 1, 1, 1); // Right eye hole (clear)
  ctx.fillRect(x, y + 2, 10, 2); // Body
  ctx.fillRect(x + 1, y + 4, 2, 1); // Left leg
  ctx.fillRect(x + 7, y + 4, 2, 1); // Right leg
}

// --- 3. GAME LOGIC ---

function init() {
  term.fullscreen(true);
  term.hideCursor(true);
  term.grabInput(true);

  term.on("key", (name) => {
    if (name === "CTRL_C") process.exit();
    if (gameOver && (name === "r" || name === "R")) resetGame();
    if (gameOver) return;

    if (name === "LEFT") ship.x -= 4;
    if (name === "RIGHT") ship.x += 4;
    if (name === " ") shoot();
  });

  resetGame();
  gameLoop();
}

function resetGame() {
  ship.x = 75;
  alienArray = [];
  bulletArray = [];
  score = 0;
  gameOver = false;
  alienVelocityX = 1;

  // Create classic 3x5 grid
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      alienArray.push({
        x: c * (alienWidth + 6) + 20,
        y: r * (alienHeight + 4) + 10,
        width: alienWidth,
        height: alienHeight,
        alive: true,
      });
    }
  }
}

function update() {
  if (gameOver) return;

  let hitWall = false;

  // Move Aliens
  alienArray.forEach((alien) => {
    if (!alien.alive) return;
    alien.x += alienVelocityX;

    if (alien.x + alien.width >= 155 || alien.x <= 5) hitWall = true;
    if (alien.y >= ship.y) gameOver = true;
  });

  if (hitWall) {
    alienVelocityX *= -1.1; 
    alienArray.forEach((a) => (a.y += 4));
  }

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

  bulletArray = bulletArray.filter((b) => b.y > 0 && !b.used);

  // Check for Win
  if (alienArray.every((a) => !a.alive)) resetGame();
}

function draw() {
  ctx.clearRect(0, 0, 160, 80);

  // Draw Sprites
  drawShip(ctx, ship.x, ship.y);
  alienArray.forEach((a) => {
    if (a.alive) drawAlien(ctx, a.x, a.y);
  });
  bulletArray.forEach((b) => ctx.fillRect(b.x, b.y, 1, 3));

  // Render to Terminal
  term.moveTo(1, 1);
  process.stdout.write(canvas.toString());

  // HUD (High Contrast Green)
  term.moveTo(2, 1).brightGreen(` SCORE: ${String(score).padStart(5, "0")} `);

  if (gameOver) {
    const msg = figlet.textSync("G A M E  O V E R");
    term.moveTo(1, 10).red(msg);
    term.moveTo(40, 22).white("Press 'R' to Restart");
  }
}

function shoot() {
  if (bulletArray.length < 3) {
    // Limit shots for challenge
    bulletArray.push({ x: ship.x + 5, y: ship.y, used: false });
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + 1 > b.x &&
    a.y < b.y + b.height &&
    a.y + 3 > b.y
  );
}

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 40);
}

init();
