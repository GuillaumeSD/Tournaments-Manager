import { useState } from "react";
import MatchPaper from "../components/MatchPaper";
import { useTournament } from "../contexts/tournamentContext";
import { Icon } from "@iconify/react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import ConfirmationDialog from "@/components/ConfirmationDialog";

export default function Matches() {
  const [openResetRoundsDialog, setOpenResetRoundsDialog] = useState(false);
  const {
    currentRound,
    currentRoundNb,
    setNewRound,
    goToNextRound,
    goToPreviousRound,
    resetRounds,
  } = useTournament();

  return (
    <>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Grid item md={4} display={{ xs: "none", md: "block" }}></Grid>
          <Grid container item md={4} xs={6} justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                if (!setNewRound || !currentRoundNb) {
                  console.error("setNewRound or currentRoundNb is undefined");
                  return;
                }
                setNewRound(currentRoundNb.toString());
              }}
            >
              {currentRound ? "Régénérer le tour" : "Générer le tour"}
            </Button>
          </Grid>
          <Grid
            container
            item
            md={4}
            xs={6}
            justifyContent={{ md: "flex-end", xs: "center" }}
          >
            <Button
              variant="outlined"
              onClick={() => setOpenResetRoundsDialog(true)}
              color="error"
            >
              Réinitialiser tous les tours
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
          spacing={5}
        >
          <Grid item>
            <IconButton
              color="primary"
              onClick={() => goToPreviousRound?.()}
              disabled={currentRoundNb !== undefined && currentRoundNb < 2}
            >
              <Icon icon="mdi:chevron-left-circle-outline" />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h4">Tour {currentRoundNb ?? 1}</Typography>
          </Grid>
          <Grid item>
            <IconButton
              color="primary"
              onClick={() => goToNextRound?.()}
              disabled={!currentRound}
            >
              <Icon icon="mdi:chevron-right-circle-outline" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
          spacing={6}
          marginTop={3}
        >
          {currentRound?.matches.map((match) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={match.id}>
              <MatchPaper match={match} roundId={currentRound.id} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <ConfirmationDialog
        title="Réinitialiser tous les tours ?"
        description="Voulez-vous vraiment réinitialiser tous les tours ? Cette action est irréversible."
        open={openResetRoundsDialog}
        onClose={() => setOpenResetRoundsDialog(false)}
        onConfirm={() => resetRounds?.()}
      />
    </>
  );
}
