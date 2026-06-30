#!/usr/bin/env node

import pkg from "terminal-kit";
import { setupControls } from "./game/controls.js";
import { resetGame, gameLoop, clampShip } from "./game/gameLoop.js";
import { initializePlayer } from "./services/player.service.js";

const { terminal: term } = pkg;

async function init() {
  await initializePlayer();

  term.hideCursor(true);
  term.grabInput(true);

  setupControls(resetGame, clampShip);

  resetGame();
  gameLoop();
}

init();