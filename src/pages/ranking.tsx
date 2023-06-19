import { useTournament } from "@/contexts/tournamentContext";
import { Player } from "@/types/tournamentTypes";
import { Grid } from "@mui/material";
import {
  DataGrid,
  GRID_DEFAULT_LOCALE_TEXT,
  GridColDef,
  GridLocaleText,
} from "@mui/x-data-grid";

const gridLocaleText: GridLocaleText = {
  ...GRID_DEFAULT_LOCALE_TEXT,
  noRowsLabel: "Aucun joueur",
};

const columns: GridColDef<Player>[] = [
  {
    field: "name",
    headerName: "Nom du joueur",
    width: 250,
  },
  {
    field: "matchesPlayed",
    headerName: "Matchs joués",
    type: "number",
    width: 140,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "winRate",
    headerName: "% de victoires",
    valueGetter: (params) => {
      const player = params.row;
      if (player.matchesPlayed === 0) return 0;
      return (player.matchesWon / player.matchesPlayed) * 100;
    },
    type: "number",
    width: 140,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "score/match",
    headerName: "Points marqués / match",
    valueGetter: (params) => {
      const player = params.row;
      if (player.matchesPlayed === 0) return 0;
      return player.score / player.matchesPlayed;
    },
    type: "number",
    width: 210,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "scoreDiff/match",
    headerName: "Différence de points / match",
    valueGetter: (params) => {
      const player = params.row;
      if (player.matchesPlayed === 0) return 0;
      return player.scoreDiff / player.matchesPlayed;
    },
    valueFormatter: (params) => {
      const value = params.value as number;
      return value > 0 ? `+${value}` : value;
    },
    type: "number",
    width: 240,
    align: "center",
    headerAlign: "center",
  },
];

export default function Ranking() {
  const { players } = useTournament();
  return (
    <Grid container justifyContent="center" alignItems="center" marginTop={1}>
      <Grid item maxWidth="100%" sx={{ minWidth: "50px" }}>
        <DataGrid
          aria-label="Liste des joueurs"
          initialState={{
            sorting: {
              sortModel: [{ field: "scoreDiff/match", sort: "desc" }],
            },
          }}
          rows={players ? (Object.values(players) as Player[]) : []}
          columns={columns}
          disableColumnMenu
          rowSelection={false}
          hideFooter={true}
          autoHeight={true}
          localeText={gridLocaleText}
          sortingOrder={["desc", "asc"]}
        />
      </Grid>
    </Grid>
  );
}
