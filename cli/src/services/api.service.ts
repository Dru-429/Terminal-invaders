import axios from "axios";
import { API_BASE_URL } from "../utils/config.js";

import type { Player } from "../types/player.types.js";

export async function createPlayer(player: Player): Promise<void> {
  try {
    const player_id = await axios.post(`${API_BASE_URL}/player`, {
      username: player.username,
      tag: player.tag,
    });
    
  } catch (err) {
    throw err;
  }
}

export async function submitScore(
  playerId: string,
  score: number,
): Promise<void> {
  try {
    await axios.post(`${API_BASE_URL}/score`, {
      playerId,
      score,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    throw err;
  }
}
