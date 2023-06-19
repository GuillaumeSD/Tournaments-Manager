export interface Player {
  id: string;
  name: string;
  score: number;
  level: number;
}

export interface Team {
  id: number;
  players: string[];
}

export interface Match {
  id: number;
  score: [number, number];
  teams: [Team, Team];
}

export interface Round {
  id: string;
  matches: Match[];
}
