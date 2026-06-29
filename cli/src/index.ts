#!/usr/bin/env node

import pkg from "terminal-kit";
import { setupControls } from "./game/controls.js";
import { resetGame, gameLoop, clampShip } from "./game/gameLoop.js";

const { terminal: term } = pkg;

function init() {
  term.fullscreen(true);
  term.hideCursor(true);
  term.grabInput(true);

  setupControls(resetGame, clampShip);

  resetGame();
  gameLoop();
}

init();