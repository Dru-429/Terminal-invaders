import { DEFAULT_PLAYER_STATS } from "../utils/config.js";
import { loadStats, saveStats } from "../utils/storag.js";

import type { PlayerStats } from "../types/player.types.js";

export function getStats(): PlayerStats {
  return loadStats() ?? { ...DEFAULT_PLAYER_STATS };
}

export function savePlayerStats(stats: PlayerStats): void {
  saveStats(stats);
}

export function recordGame(score: number): PlayerStats {
  const stats = getStats();

  stats.gamesPlayed += 1;

  if (score > stats.highestScore) {
    stats.highestScore = score;
  }

  saveStats(stats);

  return stats;
}
