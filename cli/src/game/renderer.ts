import pkg from "terminal-kit";
import {
  alienCanvas,
  alienCtx,
  shipCanvas,
  shipCtx,
  nukeCanvas,
  nukeCtx,
  alienArray,
  bulletArray,
  nukeArray,
  ship,
} from "./state.js";

import { drawShip } from "./ship.js";
import { drawAlien } from "./aliens.js";
import { drawNukes } from "./nukes.js";

const { terminal: term } = pkg;

function drawBullets() {
  bulletArray.forEach((bullet) => {
    alienCtx.fillRect(bullet.x, bullet.y, 1, 3);
  });
}

function drawAliens() {
  alienArray.forEach((alien) => {
    if (!alien.alive) return;
    drawAlien(alienCtx, alien.x, alien.y);
  });
}

function clearCanvases() {
  alienCtx.clearRect(0, 0, 160, 80);
  shipCtx.clearRect(0, 0, 160, 80);
  nukeCtx.clearRect(0, 0, 160, 80);
}

function drawBorders() {
  term.moveTo(1, 1);
  term.white("╔" + "═".repeat(80) + "╗");

  for (let i = 2; i <= 39; i++) {
    term.moveTo(1, i);
    term.white("║");
    term.moveTo(82, i);
    term.white("║");
  }

  term.moveTo(1, 40);
  term.white("╚" + "═".repeat(80) + "╝");
}

function drawHUD(score: number) {
  term.moveTo(85, 3);
  term.green(`Score: ${score}`);

  term.moveTo(85, 5);
  term.yellow(`Bullets: ${bulletArray.length}`);

  term.moveTo(85, 7);
  term.red(`Aliens: ${alienArray.length}`);
}

function drawGameOver(score: number) {
  term.moveTo(30, 18);
  term.red.bold("GAME OVER");

  term.moveTo(27, 20);
  term.white(`Final Score: ${score}`);

  term.moveTo(23, 22);
  term.yellow("Press R to Restart");
}

export function render(score: number, gameOver: boolean) {
  term.clear();

  clearCanvases();

  drawBorders();

  drawShip(shipCtx, ship.x, ship.y);
  drawAliens();
  drawBullets();
  drawNukes(nukeCtx);

  drawHUD(score);

  term.moveTo(3, 2);
  term(shipCanvas.frame());

  term.moveTo(3, 2);
  term(alienCanvas.frame());

  term.moveTo(3, 2);
  term(nukeCanvas.frame());

  if (gameOver) {
    drawGameOver(score);
  }
}