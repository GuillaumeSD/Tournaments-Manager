import { buildNewRound } from "../helpers/round";
import { useLocalDatabase } from "../helpers/localDatabase";
import { Player, Round } from "../types/tournamentTypes";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "@/helpers/localStorage";
import { v4 as uuidv4 } from "uuid";

export type TournamentContextType = {
  players: Record<string, Player | undefined>;
  addPlayer: (player: { name: string; level: number }) => void;
  setPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  playersSelected: string[];
  setPlayersSelected: (playersSelected: string[]) => void;
  currentRound: Round | undefined;
  currentRoundNb: number;
  setNewRound: (roundId: string) => void;
  goToNextRound: () => void;
  goToPreviousRound: () => void;
  resetRounds: () => void;
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

export function TournamentProvider({ children }: PropsWithChildren) {
  const [matchesNb, setMatchesNb] = useLocalStorage("matchesNb", 6);
  const [playersNbByTeam, setPlayersNbByTeam] = useLocalStorage(
    "playersNbByTeam",
    6
  );
  const [currentRoundNb, setCurrentRoundNb] = useLocalStorage(
    "currentRoundNb",
    1
  );

  const {
    elements: players,
    set: setPlayer,
    remove: removePlayer,
    reset: resetPlayers,
  } = useLocalDatabase<Player>("TournamentPlayers");

  const [playersSelected, setPlayersSelected] = useLocalStorage<string[]>(
    "playersSelected",
    []
  );

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
    setPlayersSelected((prev) => [...prev, id]);
  };

  const {
    elements: rounds,
    reset: resetRounds,
    set: setRound,
  } = useLocalDatabase<Round>("TournamentRounds");

  const setNewRound = (roundId: string) => {
    const roundPlayers = (Object.values(players) as Player[]).filter((player) =>
      playersSelected.includes(player.id)
    );
    const newRound = buildNewRound(roundPlayers, matchesNb, playersNbByTeam);
    setRound({ ...newRound, id: roundId });
  };

  const goToNextRound = () => {
    const nextRoundNb = currentRoundNb + 1;
    const nextRoundId = nextRoundNb.toString();
    const nextRound = rounds[nextRoundId];
    if (!nextRound) {
      setNewRound(nextRoundId);
    }
    setCurrentRoundNb(nextRoundNb);
  };

  const goToPreviousRound = () => {
    if (currentRoundNb < 2) return;
    setCurrentRoundNb((prev) => prev - 1);
  };

  const handleResetRounds = () => {
    resetRounds();
    setCurrentRoundNb(1);
  };

  const tournamentReset = () => {
    handleResetRounds();
    resetPlayers();
    setPlayersSelected([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    playersSelected,
    setPlayersSelected,
    currentRound: rounds[currentRoundNb.toString()],
    currentRoundNb,
    setNewRound,
    goToNextRound,
    goToPreviousRound,
    resetRounds: handleResetRounds,
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
