import axios from "axios";
import { API_BASE_URL } from "../utils/config.js";

import type { Player } from "../types/player.types.js";

export async function createPlayer(player: Player) {
  try {
    const res = await axios.post(`${API_BASE_URL}/player`, {
      username: player.username,
      tag: player.tag,
    });

    return res.data?.id ?? null;

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
    });
  } catch (err) {
    throw err;
  }
}