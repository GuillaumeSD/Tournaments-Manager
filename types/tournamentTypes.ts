export interface Player {
  id: string;
  name: string;
  score: number;
  pool: number;
}

export interface PlayersObject {
  [id: string]: Player | undefined;
}
