import { DEFAULT_PLAYER_STATS } from "../utils/config.js";
import {
  loadStats,
  saveStats,
  loadPlayer,
  addPendingScore,
} from "../utils/storag.js";

import { submitScore } from "../services/api.service.js";

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

  const player = loadPlayer();

  const timestamp = new Date().toISOString();

  if (player) {
    submitScore(player.playerId, score).catch(() => {
      addPendingScore({ score, timestamp });
    });
  } else {
    addPendingScore({ score, timestamp });
  }

  return stats;
}
