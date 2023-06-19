import { useTournament } from "@/contexts/tournamentContext";
import {
  MenuItem,
  Select,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NewPlayerDialog({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState<number | "">("");
  const { addPlayer, playersNbByTeam } = useTournament();

  useEffect(() => {
    if (playersNbByTeam === 1) setLevel(1);
  }, [playersNbByTeam]);

  const handleAddPlayer = () => {
    if (!addPlayer || !playersNbByTeam) throw new Error("Unable to add player");
    if (!name) {
      alert("Le nom du joueur est obligatoire !");
      throw new Error("Player name is invalid");
    }
    if (!level || level < 1 || level > playersNbByTeam) {
      alert(
        `Le niveau du joueur doit être compris entre 1 et ${playersNbByTeam} !`
      );
      throw new Error("Player pool is invalid");
    }
    addPlayer({
      name,
      level,
    });
    handleClose();
  };

  const handleClose = () => {
    setName("");
    playersNbByTeam === 1 ? setLevel(1) : setLevel("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogTitle>Ajouter un joueur</DialogTitle>
      <DialogContent>
        <Typography paragraph>
          {playersNbByTeam &&
            playersNbByTeam > 1 &&
            `Le niveau 1 est considéré comme le niveau le plus fort et le niveau ${playersNbByTeam} le plus faible. Il n'est pas nécessaire d'utiliser toutes les poules de 1 à ${playersNbByTeam}.`}
          {playersNbByTeam &&
            playersNbByTeam > 2 &&
            " Par exemple on pourrait utiliser seulement les poules 1 et 2."}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              label="Nom"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="dialog-select-label">Niveau</InputLabel>
            <Select
              labelId="dialog-select-label"
              id="dialog-select"
              displayEmpty
              input={<OutlinedInput label="Niveau" />}
              value={level}
              onChange={(e) => {
                if (typeof e.target.value === "string") {
                  throw new Error("Invalid value");
                }
                setLevel(e.target.value);
              }}
              disabled={playersNbByTeam === 1}
            >
              <MenuItem value={""} key={"empty-val"}>
                Niveau
              </MenuItem>
              {playersNbByTeam &&
                [...Array(playersNbByTeam + 1).keys()].slice(1).map((lvl) => (
                  <MenuItem value={lvl} key={lvl}>
                    {lvl}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ m: 1 }}>
        <Button
          variant="outlined"
          sx={{ marginRight: 1 }}
          onClick={handleClose}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          sx={{ marginRight: 0.5 }}
          onClick={handleAddPlayer}
        >
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}
