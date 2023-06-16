import { buildNewRound } from "../helpers/round";
import { createDatabase } from "../helpers/localDatabase";
import { Player, Round } from "../types/tournamentTypes";
import { createContext, useContext } from "react";
import { useLocalStorage } from "@/helpers/localStorage";
import { v4 as uuidv4 } from "uuid";

export type TournamentContextType = {
  players: Record<string, Player | undefined>;
  addPlayer: (player: Omit<Player, "id" | "score">) => void;
  setPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  rounds: Record<string, Round | undefined>;
  setNewRound: (roundId: string) => void;
  tournamentReset: () => void;
  matchesNb: number;
  setMatchesNb: (matchesNb: number) => void;
  playersNbByTeam: number;
  setPlayersNbByTeam: (playersNbByTeam: number) => void;
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
  } = createDatabase<Player>("TournamentPlayers");

  const addPlayer = (player: Omit<Player, "id" | "score">) => {
    const id = uuidv4();
    setPlayer({ ...player, id, score: 0 });
  };

  const {
    elements: rounds,
    reset: resetRounds,
    set: setRound,
  } = createDatabase<Round>("TournamentRounds");

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
    setPlayersNbByTeam(matchesNb);
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
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
}
