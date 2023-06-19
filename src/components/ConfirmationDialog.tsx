import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmationDialog({
  title,
  description,
  open,
  onClose,
  onConfirm,
}: Props) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ m: 1 }}>
        <Button variant="outlined" sx={{ marginRight: 1 }} onClick={onClose}>
          Annuler
        </Button>
        <Button
          variant="contained"
          sx={{ marginRight: 0.5 }}
          onClick={handleConfirm}
        >
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
