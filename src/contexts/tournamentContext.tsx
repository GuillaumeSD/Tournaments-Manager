import { buildNewRound } from "../helpers/round";
import { createDatabase } from "../helpers/localDatabase";
import { Player, Round } from "../types/tournamentTypes";
import { createContext, useContext } from "react";
import { v4 as uuid } from "uuid";

export type TournamentContextType = {
  players: Record<string, Player | undefined>;
  addPlayer: (player: Omit<Player, "id">) => void;
  setPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  rounds: Record<string, Round | undefined>;
  setNewRound: (roundId: string) => void;
  tournamentReset: () => void;
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
  const {
    elements: players,
    set: setPlayer,
    remove: removePlayer,
    reset: resetPlayers,
  } = createDatabase<Player>("TournamentPlayers");

  const addPlayer = (player: Omit<Player, "id">) => {
    const id = uuid();
    setPlayer({ ...player, id });
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

  const value: TournamentContextType = {
    players,
    addPlayer,
    setPlayer,
    removePlayer,
    rounds,
    setNewRound,
    tournamentReset,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
}
