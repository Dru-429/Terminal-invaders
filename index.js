#!/usr/bin/env node

const term = require("terminal-kit").terminal;
const Canvas = require("drawille-canvas");
const figlet = require("figlet");
const chalk = require("chalk");

const canvas = new Canvas(160, 80);
const ctx = canvas.getContext("2d");

const alienCanvas = new Canvas(160, 80);
const alienCtx = alienCanvas.getContext("2d");
const shipCanvas = new Canvas(160, 80);
const shipCtx = shipCanvas.getContext("2d");

const BOUNDARY_MIN_X = 5;
const BOUNDARY_MAX_X = 155;
const BOUNDARY_MIN_Y = 2;
const BOUNDARY_MAX_Y = 78;

let ship = { x: 75, y: 70, width: 10, height: 5 };
let alienWidth = 10,
  alienHeight = 6;
let alienArray = [];
let bulletArray = [];
let score = 0;
let gameOver = false;
let alienVelocityX = 1;

//Drawing Char

function drawShip(ctx, x, y) {
  ctx.fillRect(x + 4, y, 2, 2); // Cannon tip
  ctx.fillRect(x + 4, y, 2, 2); // Cannon tip
  ctx.fillRect(x + 2, y + 2, 6, 1); // Mid section
  ctx.fillRect(x, y + 3, 10, 2); // Base
  ctx.fillRect(x, y + 3, 10, 2); // Base
}

function drawAlien(ctx, x, y) {
  ctx.fillRect(x + 2, y, 1, 1); // Left antenna
  ctx.fillRect(x + 8, y, 1, 1); // Right antenna
  ctx.fillRect(x + 3, y + 1, 5, 1); // Top of head
  ctx.fillRect(x + 1, y + 2, 9, 2); // Wide body row
  ctx.fillRect(x, y + 3, 11, 1); // Arm row
  ctx.fillRect(x + 2, y + 4, 2, 1); // Left foot
  ctx.fillRect(x + 7, y + 4, 2, 1); // Right foot
}

//GAME LOGIC
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
    clampShip();
    if (name === " ") shoot();
  });

  function clampShip() {
    ship.x = Math.max(
      BOUNDARY_MIN_X,
      Math.min(ship.x, BOUNDARY_MAX_X - ship.width),
    );
  }

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

function clampShip() {
  ship.x = Math.max(
    BOUNDARY_MIN_X,
    Math.min(ship.x, BOUNDARY_MAX_X - ship.width),
  );
}

function update() {
  if (gameOver) return;

  clampShip();

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
  // Clear each layer
  alienCtx.clearRect(0, 0, 160, 80);
  shipCtx.clearRect(0, 0, 160, 80);

  // Draw boundary (grid border)
  shipCtx.fillRect(
    BOUNDARY_MIN_X,
    BOUNDARY_MIN_Y,
    BOUNDARY_MAX_X - BOUNDARY_MIN_X,
    1,
  ); // top line
  shipCtx.fillRect(
    BOUNDARY_MIN_X,
    BOUNDARY_MAX_Y,
    BOUNDARY_MAX_X - BOUNDARY_MIN_X,
    1,
  ); // bottom line
  shipCtx.fillRect(
    BOUNDARY_MIN_X,
    BOUNDARY_MIN_Y,
    1,
    BOUNDARY_MAX_Y - BOUNDARY_MIN_Y,
  ); // left line
  shipCtx.fillRect(
    BOUNDARY_MAX_X,
    BOUNDARY_MIN_Y,
    1,
    BOUNDARY_MAX_Y - BOUNDARY_MIN_Y,
  ); // right line

  alienArray.forEach((a) => {
    if (a.alive) drawAlien(alienCtx, a.x, a.y);
  });
  drawShip(shipCtx, ship.x, ship.y);
  bulletArray.forEach((b) => shipCtx.fillRect(b.x, b.y, 1, 3));

  const alienLines = alienCanvas.toString().split("\n");
  const shipLines = shipCanvas.toString().split("\n");
  const maxLines = Math.max(alienLines.length, shipLines.length);

  function isBlank(char) {
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

  // HUD (High Contrast Yellow)
  term
    .moveTo(9, 2)
    .white("SPACE for firing | <-- --> for movement | Press R to restart");
  term.moveTo(2, 1).brightYellow(` SCORE: ${String(score).padStart(5, "0")} `);

  if (gameOver) {
    const msg = figlet.textSync("GAME OVER");
    const lines = msg.split("\n"); // Split the ASCII art into an array of lines
    // Loop through each line of the ASCII art
    lines.forEach((line, index) => {
      // Move to the X coordinate (10) and increment the Y coordinate for each line
      term.moveTo(10, 6 + index).red(line);
    });
    term.moveTo(34, 12).yellow(` SCORE: ${String(score).padStart(5, "0")} `);
    term.moveTo(30, 14).yellow(" Press 'R' to Restart ");
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
