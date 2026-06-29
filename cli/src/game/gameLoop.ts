import {
  alienArray,
  bulletArray,
  nukeArray,
  ship,
  score,
  gameOver,
  alienVelocityX,
  lastAlienSpawn,
  BOUNDARY_MIN_X,
  BOUNDARY_MAX_X,
  BOUNDARY_MIN_Y,
  BOUNDARY_MAX_Y,
  INITIAL_ALIEN_ROWS,
  ALIEN_COLS,
  ALIEN_SPAWN_INTERVAL,
  NUKE_DROP_CHANCE,
  NUKE_SPEED,
  alienWidth,
  alienHeight,
} from "./state.js";

import { detectCollision, detectShipCollision } from "./collision.js";
import { render } from "./renderer.js";
import { shoot } from "./bullets.js";
import { Alien } from "../types/game.types.js";


let currentScore = score;
let currentGameOver = gameOver;
let currentAlienVelocityX = alienVelocityX;
let currentLastAlienSpawn = lastAlienSpawn;

export function clampShip() {
  if (ship.x < BOUNDARY_MIN_X) ship.x = BOUNDARY_MIN_X;
  if (ship.x + ship.width > BOUNDARY_MAX_X) {
    ship.x = BOUNDARY_MAX_X - ship.width;
  }
}

function createAlienSwarm(rows: number) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < ALIEN_COLS; c++) {
      alienArray.push({
        x: 20 + c * 20,
        y: 10 + r * 10,
        width: alienWidth,
        height: alienHeight,
        alive: true,
      });
    }
  }
}

function spawnAliens() {
  const now = Date.now();

  if (now - currentLastAlienSpawn >= ALIEN_SPAWN_INTERVAL) {
    createAlienSwarm(1);
    currentLastAlienSpawn = now;
  }
}

function pushAlienSwarmDown() {
  alienArray.forEach((alien) => {
    alien.y += 4;
  });

  currentAlienVelocityX *= -1;
}

function dropNuke(alien: Alien) {
  if (Math.random() < NUKE_DROP_CHANCE) {
    nukeArray.push({
      x: alien.x + alien.width / 2,
      y: alien.y + alien.height,
      used: false,
    });
  }
}

function updateAliens() {
  let hitWall = false;

  alienArray.forEach((alien) => {
    if (!alien.alive) return;

    alien.x += currentAlienVelocityX;

    if (
      alien.x <= BOUNDARY_MIN_X ||
      alien.x + alien.width >= BOUNDARY_MAX_X
    ) {
      hitWall = true;
    }

    if (alien.y + alien.height >= ship.y) {
      currentGameOver = true;
    }

    dropNuke(alien);
  });

  if (hitWall) {
    pushAlienSwarmDown();
  }
}

function updateBullets() {
  bulletArray.forEach((bullet) => {
    if (bullet.used) return;

    bullet.y -= 3;

    if (bullet.y <= BOUNDARY_MIN_Y) {
      bullet.used = true;
    }
  });

  for (const bullet of bulletArray) {
    for (const alien of alienArray) {
      if (!alien.alive || bullet.used) continue;

      if (detectCollision(bullet, alien)) {
        alien.alive = false;
        bullet.used = true;
        currentScore += 10;
      }
    }
  }

  for (let i = bulletArray.length - 1; i >= 0; i--) {
    if (bulletArray[i].used) {
      bulletArray.splice(i, 1);
    }
  }
}

function updateNukes() {
  nukeArray.forEach((nuke) => {
    if (nuke.used) return;

    nuke.y += NUKE_SPEED;

    if (nuke.y >= BOUNDARY_MAX_Y) {
      nuke.used = true;
    }

    if (detectShipCollision(nuke, ship)) {
      nuke.used = true;
      currentGameOver = true;
    }
  });

  for (let i = nukeArray.length - 1; i >= 0; i--) {
    if (nukeArray[i].used) {
      nukeArray.splice(i, 1);
    }
  }
}

function cleanupAliens() {
  for (let i = alienArray.length - 1; i >= 0; i--) {
    if (!alienArray[i].alive) {
      alienArray.splice(i, 1);
    }
  }
}

function update() {
  if (currentGameOver) return;

  shoot();

  updateAliens();
  updateBullets();
  updateNukes();
  cleanupAliens();
  spawnAliens();
}

export function resetGame() {
  alienArray.length = 0;
  bulletArray.length = 0;
  nukeArray.length = 0;

  ship.x = 75;
  ship.y = 70;

  currentScore = 0;
  currentGameOver = false;
  currentAlienVelocityX = 1;
  currentLastAlienSpawn = Date.now();

  createAlienSwarm(INITIAL_ALIEN_ROWS);
}

export function gameLoop() {
  update();
  render(currentScore, currentGameOver);

  setTimeout(gameLoop, 50);
}