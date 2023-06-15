export interface Player {
  id: string;
  name: string;
  score: number;
  pool: number;
}

export interface Team {
  id: number;
  players: string[];
}

export interface Match {
  id: number;
  teams: [Team, Team];
}

export interface Round {
  id: string;
  matches: Match[];
}
