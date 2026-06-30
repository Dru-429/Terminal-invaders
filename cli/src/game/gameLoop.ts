import {
  game,
  BOUNDARY_MIN_X,
  BOUNDARY_MAX_X,
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

export function clampShip(): void {
  game.ship.x = Math.max(
    BOUNDARY_MIN_X,
    Math.min(game.ship.x, BOUNDARY_MAX_X - game.ship.width)
  );
}

function spawnAliens(rows: number = 1, cols: number = ALIEN_COLS): void {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      game.alienArray.push({
        x: c * (alienWidth + 6) + 20,
        y: 8 + r * (alienHeight + 4),
        width: alienWidth,
        height: alienHeight,
        alive: true,
      });
    }
  }
}

function pushAlienSwarmDown(): void {
  game.alienArray.forEach((alien) => {
    if (!alien.alive) return;

    alien.y += alienHeight + 4;

    if (alien.y >= game.ship.y - 4) {
      game.gameOver = true;
    }
  });
}

function dropNuke(): void {
  const aliveAliens = game.alienArray.filter((alien) => alien.alive);

  if (aliveAliens.length === 0) return;

  if (Math.random() < NUKE_DROP_CHANCE) {
    const randomAlien =
      aliveAliens[Math.floor(Math.random() * aliveAliens.length)];

    if (!randomAlien) return;

    game.nukeArray.push({
      x: randomAlien.x + Math.floor(randomAlien.width / 2),
      y: randomAlien.y + randomAlien.height,
      used: false,
    });
  }
}

function update(): void {
  if (game.gameOver) return;

  clampShip();
  shoot();
  dropNuke();

  let hitWall = false;

  game.alienArray.forEach((alien) => {
    if (!alien.alive) return;

    alien.x += game.alienVelocityX;

    if (
      alien.x + alien.width >= BOUNDARY_MAX_X ||
      alien.x <= BOUNDARY_MIN_X
    ) {
      hitWall = true;
    }

    if (alien.y >= game.ship.y) {
      game.gameOver = true;
    }
  });

  if (hitWall) {
    game.alienVelocityX *= -1;
  }

  game.alienVelocityX *= 1.0005;

  game.bulletArray.forEach((bullet) => {
    bullet.y -= 3;

    game.alienArray.forEach((alien) => {
      if (alien.alive && !bullet.used && detectCollision(bullet, alien)) {
        alien.alive = false;
        bullet.used = true;
        game.score += 10;
      }
    });
  });

  game.nukeArray.forEach((nuke) => {
    nuke.y += NUKE_SPEED;

    if (detectShipCollision(nuke, game.ship)) {
      game.gameOver = true;
    }
  });

  game.bulletArray = game.bulletArray.filter((b) => b.y > 0 && !b.used);
  game.alienArray = game.alienArray.filter((a) => a.alive);
  game.nukeArray = game.nukeArray.filter(
    (n) => n.y < BOUNDARY_MAX_Y && !n.used
  );

  if (Date.now() - game.lastAlienSpawn >= ALIEN_SPAWN_INTERVAL) {
    pushAlienSwarmDown();
    spawnAliens(1);
    game.lastAlienSpawn = Date.now();
  }
}

export function resetGame(): void {
  game.ship.x = 75;
  game.bulletArray = [];
  game.alienArray = [];
  game.nukeArray = [];

  game.score = 0;
  game.gameOver = false;
  game.alienVelocityX = 1;

  spawnAliens(INITIAL_ALIEN_ROWS);
  game.lastAlienSpawn = Date.now();
}

export function gameLoop(): void {
  update();
  render();
  setTimeout(gameLoop, 40);
}
