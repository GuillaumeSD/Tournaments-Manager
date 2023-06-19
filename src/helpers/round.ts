import { Match, Player, Round, Team } from "../types/tournamentTypes";
import { shuffleArray } from "./array";

const initPlayersByPools = (
  maxPoolNb: number,
  players: Player[]
): Player[][] => {
  const playersByPool = [];
  for (let pool = 1; pool <= maxPoolNb; pool++) {
    const playersInPool = players.filter((player) => player.level === pool);
    shuffleArray(playersInPool);
    playersByPool.push(playersInPool);
  }
  return playersByPool;
};

const initTeams = (matchesNb: number): Team[] => {
  const teams: Team[] = [];
  const teamsNb = matchesNb * 2;
  for (let i = 0; i < teamsNb; i++) {
    const team: Team = {
      id: i,
      players: [],
    };
    teams.push(team);
  }
  return teams;
};

const getNearestPoolId = (
  playersByPool: Player[][],
  currentId: number
): number => {
  const higherPoolId = playersByPool
    .slice(0, currentId)
    .findLastIndex((pool) => pool.length > 0);

  const lowerPoolId = playersByPool
    .slice(currentId)
    .findIndex((pool) => pool.length > 0);

  if (higherPoolId < 0) return lowerPoolId;
  if (lowerPoolId < 0) return higherPoolId;

  if (Math.abs(currentId - higherPoolId) < Math.abs(currentId - lowerPoolId))
    return higherPoolId;
  return lowerPoolId;
};

const buildMatches = (teams: Team[]): Match[] => {
  const matches: Match[] = [];
  for (let i = 0; i < teams.length; i += 2) {
    const match: Match = {
      id: i / 2,
      score: [0, 0],
      teams: [teams[i], teams[i + 1]],
    };
    matches.push(match);
  }
  return matches;
};

export const buildNewRound = (
  players: Player[],
  matchesNb: number,
  playersNbPerTeam: number
): Omit<Round, "id"> => {
  const maxPoolNb = playersNbPerTeam; // just for code clarity

  const teams = initTeams(matchesNb);

  const playersByPool = initPlayersByPools(maxPoolNb, players);

  let teamId = 0;
  let poolId = 0;

  while (poolId < maxPoolNb) {
    while (poolId < maxPoolNb - 1 && playersByPool[poolId].length === 0) {
      poolId++;
    }
    let scopePoolId = poolId;
    while (teamId < teams.length && scopePoolId < maxPoolNb) {
      const player = playersByPool[scopePoolId].shift();
      if (player) {
        teams[teamId].players.push(player.id);
        teamId++;
      } else {
        scopePoolId++;
      }
    }
    poolId++;
    teamId = 0;
  }

  while (
    playersByPool.some((pool) => pool.length > 0) &&
    teams.some((team) => team.players.length < playersNbPerTeam)
  ) {
    let currentPoolId = playersByPool.reduce((acc, pool, index) => {
      if (playersByPool[acc].length > pool.length) {
        return acc;
      }
      return index;
    }, 0);
    let currentTeamStartId = teams.findIndex(
      (team) => team.players.length < teams[0].players.length
    );
    currentTeamStartId = currentTeamStartId > 0 ? currentTeamStartId : 0;
    for (let i = currentTeamStartId; i < teams.length; i++) {
      if (teams[i].players.length === playersNbPerTeam) continue;

      let player = playersByPool[currentPoolId].shift();
      if (!player) {
        currentPoolId = getNearestPoolId(playersByPool, currentPoolId);
        if (currentPoolId < 0) break;
        player = playersByPool[currentPoolId].shift();
      }

      if (!player) break;
      teams[i].players.push(player.id);
    }
  }

  return {
    matches: buildMatches(teams),
  };
};
