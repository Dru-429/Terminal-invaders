export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export type LeaderboardScope = "global" | "weekly" | "daily";

export type PlayerSummary = {
  id: string;
  username: string;
  tag: string;
  highestScore: number;
  gamePlayed: number;
  createdAt: string;
};

export type ScoreEntry = {
  id: string;
  playerId: string;
  score: number;
  createdAt: string;
  playersTag: string | null;
};

export type LeaderboardPlayer = {
  _max?: { score: number };
  score?: number;
  playerId: string;
  username?: string;
  tag?: string;
};

async function j<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as T;
}

export const api = {
  leaderboard: (scope: LeaderboardScope, page: number, limit = 10) =>
    j<{ players: LeaderboardPlayer[]; message: string }>(
      `/api/v1/leaderboard/${scope}?page=${page}&limit=${limit}`
    ),
  player: (id: string) => j<PlayerSummary>(`/api/v1/player/${id}`),
  scores: (id: string, page: number, limit = 10) =>
    j<{ scores: ScoreEntry[]; page: number; message: string }>(
      `/api/v1/score/${id}?page=${page}&limit=${limit}`
    ),
};
