import pkg from "terminal-kit";
import { game } from "./state.js";

const { terminal: term } = pkg;

export function setupControls(resetGame: () => void, clampShip: () => void) {
  term.on("key", (name: string) => {
    if (name === "CTRL_C") process.exit();

    if (game.gameOver && (name === "r" || name === "R")) {
      resetGame();
      return;
    }

    if (game.gameOver) return;

    if (name === "LEFT") game.ship.x -= 4;
    if (name === "RIGHT") game.ship.x += 4;

    clampShip();
  });
}
