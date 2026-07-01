import pkg from "terminal-kit";
import figlet from "figlet";
import chalk from "chalk";
import {
  alienCanvas,
  alienCtx,
  shipCanvas,
  shipCtx,
  nukeCanvas,
  nukeCtx,
  game,
  BOUNDARY_MIN_X,
  BOUNDARY_MAX_X,
  BOUNDARY_MIN_Y,
  BOUNDARY_MAX_Y,
} from "./state.js";
import { drawShip } from "./ship.js";
import { drawAlien } from "./aliens.js";
import { drawNukes } from "./nukes.js";
import { getStats } from "../services/score.service.js";

const { terminal: term } = pkg;

function isBlank(char: string | undefined): boolean {
  return !char || char === " " || char === "\u2800";
}

export function render(): void {
  alienCtx.clearRect(0, 0, 160, 80);
  shipCtx.clearRect(0, 0, 160, 80);
  nukeCtx.clearRect(0, 0, 160, 80);

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

  game.alienArray.forEach((alien) => {
    if (alien.alive) drawAlien(alienCtx, alien.x, alien.y);
  });

  drawShip(shipCtx, game.ship.x, game.ship.y);

  game.bulletArray.forEach((bullet) => {
    shipCtx.fillRect(bullet.x, bullet.y, 1, 3);
  });

  drawNukes(nukeCtx);

  const alienLines = alienCanvas.toString().split("\n");
  const shipLines = shipCanvas.toString().split("\n");
  const nukeLines = nukeCanvas.toString().split("\n");

  const maxLines = Math.max(
    alienLines.length,
    shipLines.length,
    nukeLines.length
  );

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

  term.moveTo(28, 2).white("← → Move | Auto Fire | R Restart");
  term
    .moveTo(2, 1)
    .brightBlue(` SCORE: ${String(game.score).padStart(5, "0")} `);
  term
    .moveTo(60, 1)
    .brightGreen(`HIGHEST SCORE: ${String(getStats().highestScore).padStart(5, "0")} `);

  if (game.gameOver) {
    const msg = figlet.textSync("GAME OVER");
    const lines = msg.split("\n");

    lines.forEach((line, index) => {
      term.moveTo(10, 6 + index).red(line);
    });
    term.moveTo(30, 12).brightBlue(`SCORE: ${game.score}`);
    term.moveTo(30, 13).brightGreen(
      `HIGHEST SCORE: ${getStats().highestScore}`
    );
  }
}
