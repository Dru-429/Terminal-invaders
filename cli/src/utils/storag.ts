import fs from "fs";
import {
  APP_DIR,
  PLAYER_FILE,
  SCORE_FILE,
  PENDING_SCORES_FILE,
} from "./config.js";

import type {
  Player,
  PlayerStats,
  PendingScore,
} from "../types/player.types.js";

export function ensureAppDirectory(): void {
  if (!fs.existsSync(APP_DIR)) {
    fs.mkdirSync(APP_DIR, { recursive: true });
  }
}

export function savePlayer(player: Player): void {
  ensureAppDirectory();

  fs.writeFileSync(
    PLAYER_FILE,
    JSON.stringify(player, null, 2),
    "utf-8"
  );
}

export function loadPlayer(): Player | null {
  ensureAppDirectory();

  if (!fs.existsSync(PLAYER_FILE)) {
    return null;
  }

  const rawData = fs.readFileSync(
    PLAYER_FILE,
    "utf-8"
  );

  return JSON.parse(rawData) as Player;
}

export function playerExists(): boolean {
  ensureAppDirectory();

  return fs.existsSync(PLAYER_FILE);
}

export function saveStats(stats: PlayerStats): void {
  ensureAppDirectory();

  fs.writeFileSync(
    SCORE_FILE,
    JSON.stringify(stats, null, 2),
    "utf-8"
  );
}

export function loadStats(): PlayerStats | null {
  ensureAppDirectory();

  if (!fs.existsSync(SCORE_FILE)) {
    return null;
  }

  const rawData = fs.readFileSync(
    SCORE_FILE,
    "utf-8"
  );

  return JSON.parse(rawData) as PlayerStats;
}

export function savePendingScores(
  scores: PendingScore[]
): void {
  ensureAppDirectory();

  fs.writeFileSync(
    PENDING_SCORES_FILE,
    JSON.stringify(scores, null, 2),
    "utf-8"
  );
}

export function loadPendingScores(): PendingScore[] {
  ensureAppDirectory();

  if (!fs.existsSync(PENDING_SCORES_FILE)) {
    return [];
  }

  const rawData = fs.readFileSync(
    PENDING_SCORES_FILE,
    "utf-8"
  );

  return JSON.parse(rawData) as PendingScore[];
}

export function addPendingScore(
  score: PendingScore
): void {
  const scores = loadPendingScores();

  scores.push(score);

  savePendingScores(scores);
}

export function clearPendingScores(): void {
  ensureAppDirectory();

  fs.writeFileSync(
    PENDING_SCORES_FILE,
    JSON.stringify([], null, 2),
    "utf-8"
  );
}