import { buildNewRound } from "../helpers/round";
import { useLocalDatabase } from "../helpers/localDatabase";
import { Player, Round } from "../types/tournamentTypes";
import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "@/helpers/localStorage";
import { v4 as uuidv4 } from "uuid";

export type TournamentContextType = {
  players: Record<string, Player | undefined>;
  addPlayer: (player: { name: string; level: number }) => void;
  setPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  rounds: Record<string, Round | undefined>;
  setNewRound: (roundId: string) => void;
  tournamentReset: () => void;
  matchesNb: number;
  setMatchesNb: (matchesNb: number) => void;
  playersNbByTeam: number;
  setPlayersNbByTeam: (playersNbByTeam: number) => void;
  setMatchScore: (
    roundId: string,
    matchId: number,
    teamIdx: number,
    score: number
  ) => void;
};

const TournamentContext = createContext<Partial<TournamentContextType>>({});

export function useTournament() {
  return useContext(TournamentContext);
}

export function TournamentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [matchesNb, setMatchesNb] = useLocalStorage("matchesNb", 6);
  const [playersNbByTeam, setPlayersNbByTeam] = useLocalStorage(
    "playersNbByTeam",
    6
  );

  const {
    elements: players,
    set: setPlayer,
    remove: removePlayer,
    reset: resetPlayers,
  } = useLocalDatabase<Player>("TournamentPlayers");

  const addPlayer = (player: { name: string; level: number }) => {
    const id = uuidv4();
    setPlayer({
      ...player,
      id,
      score: 0,
      scoreDiff: 0,
      matchesPlayed: 0,
      matchesWon: 0,
    });
  };

  const {
    elements: rounds,
    reset: resetRounds,
    set: setRound,
  } = useLocalDatabase<Round>("TournamentRounds");

  const setNewRound = (roundId: string) => {
    const newRound = buildNewRound(
      Object.values(players) as Player[],
      matchesNb,
      playersNbByTeam
    );
    setRound({ ...newRound, id: roundId });
  };

  const tournamentReset = () => {
    resetRounds();
    resetPlayers();
  };

  const handleSetPlayersNbByTeam = (newValue: number) => {
    if (playersNbByTeam === newValue) return;
    tournamentReset();
    setPlayersNbByTeam(newValue);
  };

  useEffect(() => {
    for (const player of Object.values(players)) {
      if (!player) continue;
      player.score = 0;
      player.scoreDiff = 0;
      player.matchesPlayed = 0;
      player.matchesWon = 0;
      setPlayer(player);
    }

    for (const round of Object.values(rounds)) {
      if (!round) continue;

      for (const match of round.matches) {
        if (match.score[0] === 0 && match.score[1] === 0) continue;
        const scoreDiff = Math.abs(match.score[0] - match.score[1]);
        const winningTeam =
          scoreDiff === 0 ? -1 : match.score[0] > match.score[1] ? 0 : 1;

        for (const [teamId, team] of match.teams.entries()) {
          for (const playerId of team.players) {
            const player = players[playerId];
            if (!player) continue;

            player.score += match.score[teamId];
            const playerWon = teamId === winningTeam;
            player.scoreDiff += playerWon ? scoreDiff : -scoreDiff;
            player.matchesPlayed++;
            if (playerWon) player.matchesWon++;
            setPlayer(player);
          }
        }
      }
    }
  }, [rounds]);

  const setMatchScore = (
    roundId: string,
    matchId: number,
    teamIdx: number,
    score: number
  ) => {
    if (score < 0) score = 0;
    if (score > 99) score = 99;

    const round = rounds[roundId];
    if (!round) return;

    const match = round.matches[matchId];
    if (!match) return;

    const newScore: [number, number] =
      teamIdx === 0 ? [score, match.score[1]] : [match.score[0], score];

    round.matches[matchId] = {
      ...match,
      score: newScore,
    };

    setRound(round);
  };

  const value: TournamentContextType = {
    players,
    addPlayer,
    setPlayer,
    removePlayer,
    rounds,
    setNewRound,
    tournamentReset,
    matchesNb,
    setMatchesNb,
    playersNbByTeam,
    setPlayersNbByTeam: handleSetPlayersNbByTeam,
    setMatchScore,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
}
