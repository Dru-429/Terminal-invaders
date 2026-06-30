import os from "os";
import path from "path";

export const APP_NAME = "terminal-invaders";

export const APP_DIR = path.join(
  os.homedir(),
  `.${APP_NAME}`
);

export const PLAYER_FILE = path.join(
  APP_DIR,
  "player.json"
);

export const PENDING_SCORES_FILE = path.join(
  APP_DIR,
  "pending-scores.json"
);

export const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

export const MAX_USERNAME_LENGTH = 20;
export const TAG_LENGTH = 4;
export const MAX_PENDING_SCORES = 50;


export const DEFAULT_PLAYER_STATS = {
  highestScore: 0,
  gamesPlayed: 0,
};