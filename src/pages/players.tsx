import { Button, Grid } from "@mui/material";
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
import NewPlayerDialog from "../components/players/NewPlayerCard";
import { useState } from "react";

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
  const { players, removePlayer, setPlayer } = useTournament();
  const [openNewPlayerDialog, setOpenNewPlayerDialog] = useState(false);

  const handleDeleteClick = (id: GridRowId) => () => {
    if (!removePlayer || typeof id !== "number")
      throw new Error("Unable to remove player");
    removePlayer(id);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    if (!setPlayer) throw new Error("Unable to set player");
    const player = {
      id: newRow.id,
      name: newRow.name,
      pool: newRow.pool,
      score: newRow.score,
    } as Player;
    if (!player.name) {
      alert("Le nom du joueur est obligatoire !");
      throw new Error("Player name is invalid");
    }
    if (!player.pool || player.pool < 1 || player.pool > 6) {
      alert("La poule du joueur doit être comprise entre 1 et 6 !");
      throw new Error("Player pool is invalid");
    }
    setPlayer(player);
    return newRow;
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nom du joueur",
      width: 250,
      editable: true,
    },
    {
      field: "pool",
      headerName: "Poule",
      type: "number",
      width: 90,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "score",
      headerName: "Points",
      type: "number",
      width: 90,
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
            icon={<Icon icon="mdi:delete-outline" color="red" width="20px" />}
            label="Supprimer"
            onClick={handleDeleteClick(id)}
            color="inherit"
            key={`${id}-delete-button`}
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
          marginTop={1}
        >
          <Button
            variant="contained"
            onClick={() => setOpenNewPlayerDialog(true)}
          >
            Ajouter un joueur
          </Button>
        </Grid>
        <Grid item maxWidth="100%">
          <DataGrid
            aria-label="Liste des joueurs"
            rows={players ? (Object.values(players) as Player[]) : []}
            columns={columns}
            disableColumnMenu
            rowSelection={false}
            hideFooter={true}
            autoHeight={true}
            localeText={gridLocaleText}
            onRowEditStart={handleRowEdit}
            onRowEditStop={handleRowEdit}
            processRowUpdate={processRowUpdate}
          />
        </Grid>
      </Grid>
      <NewPlayerDialog
        open={openNewPlayerDialog}
        onClose={() => setOpenNewPlayerDialog(false)}
      />
    </>
  );
}
