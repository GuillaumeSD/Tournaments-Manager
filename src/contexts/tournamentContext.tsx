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
  fieldNb: number;
  setFieldNb: (fieldNb: number) => void;
  playerNbByTeam: number;
  setPlayerNbByTeam: (playerNbByTeam: number) => void;
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
  const [fieldNb, setFieldNb] = useLocalStorage("fieldNb", 6);
  const [playerNbByTeam, setPlayerNbByTeam] = useLocalStorage(
    "playerNbByTeam",
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
    const newRound = buildNewRound(Object.values(players) as Player[], 5);
    setRound({ ...newRound, id: roundId });
  };

  const tournamentReset = () => {
    resetRounds();
    resetPlayers();
  };

  const handleSetPlayerNbByTeam = (newValue: number) => {
    if (playerNbByTeam === newValue) return;
    tournamentReset();
    setPlayerNbByTeam(fieldNb);
  };

  const value: TournamentContextType = {
    players,
    addPlayer,
    setPlayer,
    removePlayer,
    rounds,
    setNewRound,
    tournamentReset,
    fieldNb,
    setFieldNb,
    playerNbByTeam,
    setPlayerNbByTeam: handleSetPlayerNbByTeam,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
}
