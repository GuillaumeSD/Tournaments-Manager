export interface Player {
  id: number;
  name: string;
  score: number;
  pool: number;
}

export interface Team {
  id: number;
  players: Player[];
}

export interface Match {
  id: number;
  teams: [Team, Team];
}

export interface Round {
  id: number;
  matches: Match[];
}
