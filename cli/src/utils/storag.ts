import fs from "fs";
import {
  APP_DIR,
  PLAYER_FILE,
  SCORE_FILE,
  SYNC_DIR,
  SYNC_SCORES_FILE,
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

  fs.writeFileSync(SCORE_FILE, JSON.stringify(stats, null, 2), "utf-8");
}

export function loadStats(): PlayerStats | null {
  ensureAppDirectory();

  if (!fs.existsSync(SCORE_FILE)) {
    return null;
  }

  const rawData = fs.readFileSync(SCORE_FILE, "utf-8");

  try {
    const parsed = JSON.parse(rawData);

    if (
      parsed &&
      typeof parsed === "object" &&
      parsed.highestScore !== undefined &&
      parsed.gamesPlayed !== undefined
    ) {
      return parsed as PlayerStats;
    }
  } catch (_) {
    return null;
  }

  return null;
}

export function ensureSyncDirectory(): void {
  ensureAppDirectory();

  if (!fs.existsSync(SYNC_DIR)) {
    fs.mkdirSync(SYNC_DIR, { recursive: true });
  }
}

export function savePendingScores(scores: PendingScore[]): void {
  ensureSyncDirectory();

  fs.writeFileSync(SYNC_SCORES_FILE, JSON.stringify(scores, null, 2), "utf-8");
}

export function loadPendingScores(): PendingScore[] {
  ensureSyncDirectory();

  if (!fs.existsSync(SYNC_SCORES_FILE)) {
    return [];
  }

  const rawData = fs.readFileSync(SYNC_SCORES_FILE, "utf-8");

  return (JSON.parse(rawData) as PendingScore[]) ?? [];
}

export function addPendingScore(
  score: PendingScore
): void {
  const scores = loadPendingScores();

  scores.push(score);

  savePendingScores(scores);
}

export function clearPendingScores(): void {
  ensureSyncDirectory();

  fs.writeFileSync(
    SYNC_SCORES_FILE,
    JSON.stringify([], null, 2),
    "utf-8"
  );
}