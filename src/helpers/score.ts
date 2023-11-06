import { Player } from "@/types/tournamentTypes";

export const getRacScore = (teamWon: boolean, scoreDiff: number): number => {
  if (teamWon) {
    return scoreDiff > 1 ? 3 : 2;
  }
  return scoreDiff > 1 ? 0 : 1;
};

export const round = (num: number, precision = 0): number => {
  const factor = 10 ** precision;
  return Math.round(num * factor) / factor;
};

export const sortPlayers = (
  playerA: Player | undefined,
  playerB: Player | undefined
): number => {
  if (!playerA?.matchesPlayed || !playerB?.matchesPlayed) return 0;
  const playerAScoreDiff = playerA.scoreDiff / playerA.matchesPlayed;
  const playerBScoreDiff = playerB.scoreDiff / playerB.matchesPlayed;
  if (playerAScoreDiff > playerBScoreDiff) return -1;
  if (playerAScoreDiff < playerBScoreDiff) return 1;
  return 0;
};
