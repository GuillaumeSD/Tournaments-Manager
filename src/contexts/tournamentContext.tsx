import { createDatabase } from "../helpers/localDatabase";
import { Player, Round } from "../types/tournamentTypes";
import { createContext, useContext } from "react";

export type TournamentContextType = {
  players: Player[];
  addPlayer: (player: Omit<Player, "id">) => void;
  setPlayer: (player: Player) => void;
  removePlayer: (playerId: number) => void;
  rounds: Round[];
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
    add: addPlayer,
    set: setPlayer,
    remove: removePlayer,
    reset: resetPlayers,
  } = createDatabase<Player>("TournamentPlayers");

  const { elements: rounds } = createDatabase<Round>("TournamentRounds");

  const tournamentReset = () => {
    resetPlayers();
  };

  const value: TournamentContextType = {
    players,
    addPlayer,
    setPlayer,
    removePlayer,
    rounds,
    tournamentReset,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
}
