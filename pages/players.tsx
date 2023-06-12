import EditToolbar from "@/components/editToolbar";
import { useTournament } from "@/contexts/tournamentContext";
import { Player } from "@/types/tournamentTypes";
import { Icon } from "@iconify/react";
import {
  DataGrid,
  GridColDef,
  GridLocaleText,
  GRID_DEFAULT_LOCALE_TEXT,
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
  GridEventListener,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
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
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    if (!removePlayer || typeof id !== "string")
      throw new Error("Unable to remove player");
    removePlayer(id);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
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

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nom du joueur", width: 200, editable: true },
    {
      field: "pool",
      headerName: "Poule",
      type: "number",
      width: 90,
      editable: true,
    },
    {
      field: "score",
      headerName: "Points",
      type: "number",
      width: 90,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Icon icon="mdi:content-save" />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<Icon icon="mdi:close" />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Icon icon="mdi:pencil" />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Icon icon="mdi:delete-outline" />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        aria-label="Liste des joueurs"
        rows={players ? (Object.values(players) as Player[]) : []}
        columns={columns}
        disableColumnMenu
        rowSelection={false}
        hideFooter={true}
        autoHeight={true}
        onCellEditStop={(params) => {
          console.log(params);
        }}
        localeText={gridLocaleText}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStart={handleRowEdit}
        onRowEditStop={handleRowEdit}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRow: setPlayer, setRowModesModel },
        }}
      />
    </div>
  );
}
