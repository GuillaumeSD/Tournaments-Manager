import { Button, Grid, Typography } from "@mui/material";
import { useTournament } from "../contexts/tournamentContext";
import { Player } from "../types/tournamentTypes";
import { Icon } from "@iconify/react";
import {
  DataGrid,
  GridColDef,
  GridLocaleText,
  GRID_DEFAULT_LOCALE_TEXT,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import NewPlayerDialog from "../components/NewPlayerCard";
import { useMemo, useState } from "react";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { red } from "@mui/material/colors";

const gridLocaleText: GridLocaleText = {
  ...GRID_DEFAULT_LOCALE_TEXT,
  noRowsLabel: "Aucun joueur",
};

const handleRowEdit: GridEventListener<"rowEditStart" | "rowEditStop"> = (
  _params,
  event
) => {
  event.defaultMuiPrevented = true;
};

export default function Players() {
  const {
    players,
    removePlayer,
    setPlayer,
    tournamentReset,
    playersSelected,
    setPlayersSelected,
  } = useTournament();
  const [openNewPlayerDialog, setOpenNewPlayerDialog] = useState(false);
  const [openResetTournamentDialog, setOpenResetTournamentDialog] =
    useState(false);

  const handleDeleteClick = useMemo(
    () => (id: GridRowId) => () => {
      if (!removePlayer || typeof id !== "string")
        throw new Error("Unable to remove player");
      removePlayer(id);
    },
    [removePlayer]
  );

  const processRowUpdate = useMemo(
    () => (newRow: GridRowModel, oldRow: GridRowModel) => {
      if (!setPlayer) throw new Error("Unable to set player");
      const player = {
        id: newRow.id,
        name: newRow.name,
        level: newRow.level,
        score: newRow.score,
      } as Player;
      if (!player.name) {
        alert("Le nom du joueur est obligatoire !");
        return oldRow;
      }
      if (!player.level || player.level < 1 || player.level > 6) {
        alert("Le niveau du joueur doit être compris entre 1 et 6 !");
        return oldRow;
      }
      setPlayer(player);
      return newRow;
    },
    [setPlayer]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "name",
        headerName: "Nom du joueur",
        width: 250,
        editable: true,
      },
      {
        field: "level",
        headerName: "Niveau",
        type: "number",
        width: 90,
        editable: true,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "matchesPlayed",
        headerName: "Matchs joués",
        type: "number",
        width: 110,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Supprimer",
        width: 100,
        cellClassName: "actions",
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={
                <Icon icon="mdi:delete-outline" color={red[400]} width="20px" />
              }
              label="Supprimer"
              onClick={handleDeleteClick(id)}
              color="inherit"
              key={`${id}-delete-button`}
            />,
          ];
        },
      },
    ],
    [handleDeleteClick]
  );

  return (
    <>
      <Grid
        container
        rowSpacing={3}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Grid
            item
            container
            justifyContent="center"
            sx={{ maxWidth: "250px" }}
          >
            <Button
              variant="contained"
              onClick={() => setOpenNewPlayerDialog(true)}
            >
              Ajouter un joueur
            </Button>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            sx={{ maxWidth: "300px" }}
          >
            <Button
              variant="outlined"
              onClick={() => setOpenResetTournamentDialog(true)}
              color="error"
            >
              Supprimer tous les joueurs
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="subtitle2">
            Joueurs sélectionnés pour le tournoi :{" "}
            {playersSelected?.length ?? 0} sur un total de{" "}
            {Object.keys(players ?? []).length}
          </Typography>
        </Grid>
        <Grid item maxWidth="100%" sx={{ minWidth: "50px" }}>
          <DataGrid
            aria-label="Liste des joueurs"
            rows={players ? (Object.values(players) as Player[]) : []}
            columns={columns}
            disableColumnMenu
            hideFooter={true}
            autoHeight={true}
            localeText={gridLocaleText}
            onRowEditStart={handleRowEdit}
            onRowEditStop={handleRowEdit}
            processRowUpdate={processRowUpdate}
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setPlayersSelected?.(newRowSelectionModel as string[]);
            }}
            rowSelectionModel={playersSelected}
          />
        </Grid>
      </Grid>
      <NewPlayerDialog
        open={openNewPlayerDialog}
        onClose={() => setOpenNewPlayerDialog(false)}
      />
      <ConfirmationDialog
        title="Supprimer tous les joueurs ?"
        description="Voulez-vous vraiment supprimer tous les joueurs ? Cette action est irréversible."
        open={openResetTournamentDialog}
        onClose={() => setOpenResetTournamentDialog(false)}
        onConfirm={() => tournamentReset?.()}
      />
    </>
  );
}
