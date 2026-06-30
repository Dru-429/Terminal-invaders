export interface Player {
  playerId: string;
  username: string;
  tag: string;
  highestScore: number;
  gamesPlayed: number;
}

export interface PendingScore {
  score: number;
  timestamp: string;
}