import pkg from "terminal-kit";
import { gameOver, ship } from "./state.js";

const { terminal: term } = pkg;

export function setupControls(resetGame: () => void, clampShip: () => void) {
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
}