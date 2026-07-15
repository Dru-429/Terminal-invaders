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
  createdAt?: string;
};

export type LeaderboardResponse = {
  players: LeaderboardPlayer[];
  message: string;
};

export type ScoresResponse = {
  scores: ScoreEntry[];
  page: number;
  message: string;
};