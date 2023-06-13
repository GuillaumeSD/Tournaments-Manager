import { Player, PlayersObject } from "../types/tournamentTypes";
import { createContext, useContext, useState } from "react";

export type TournamentContextType = {
  players: PlayersObject;
  setPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  reset: () => void;
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
  const [players, setPlayers] = useState<PlayersObject>({});

  const setPlayer = (player: Player) => {
    setPlayers((prev) => {
      return {
        ...prev,
        [player.id]: player,
      };
    });
  };

  const removePlayer = (playerId: string) => {
    setPlayers((prev) => {
      const newPlayers = { ...prev };
      delete newPlayers[playerId];
      return newPlayers;
    });
  };

  const reset = () => {
    setPlayers({});
  };

  const value: TournamentContextType = {
    players,
    setPlayer,
    removePlayer,
    reset,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
}
