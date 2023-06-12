import { Player } from "@/types/tournamentTypes";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import {
  GridRowModesModel,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";

interface EditToolbarProps<T> {
  setRow: T;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

export default function EditToolbar<T extends (player: Player | {}) => void>(
  props: EditToolbarProps<T>
) {
  const { setRow, setRowModesModel } = props;

  const handleClick = () => {
    const id = uuidv4();
    setRow({ id, score: 0 });
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<Icon icon="mdi:plus" />}
        onClick={handleClick}
      >
        Ajouter un joueur
      </Button>
    </GridToolbarContainer>
  );
}
