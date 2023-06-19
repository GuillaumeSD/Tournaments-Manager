import MatchPaper from "../components/MatchPaper";
import { useTournament } from "../contexts/tournamentContext";
import { Icon } from "@iconify/react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { useMemo, useState } from "react";

export default function Matches() {
  const { rounds, setNewRound } = useTournament();
  const [roundNb, setRoundNb] = useState(1);

  const currentRound = useMemo(() => {
    if (!rounds) return undefined;
    return rounds[roundNb.toString()];
  }, [roundNb, rounds]);

  const handleNextRoundClick = () => {
    if (!setNewRound || !rounds) {
      throw new Error("setNewRound or rounds is not defined");
    }
    const nextRoundNb = roundNb + 1;
    const nextRound = rounds[nextRoundNb.toString()];
    if (!nextRound) {
      setNewRound(nextRoundNb.toString());
    }
    setRoundNb(nextRoundNb);
  };

  const handlePreviousRoundClick = () => {
    if (roundNb < 2) return;
    setRoundNb((prev) => prev - 1);
  };

  return (
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      <Grid
        item
        container
        xs={12}
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setNewRound?.(roundNb.toString())}
          >
            {currentRound ? "Régénérer le tour" : "Générer le tour"}
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
            onClick={() => handlePreviousRoundClick()}
            disabled={roundNb < 2}
          >
            <Icon icon="mdi:chevron-left-circle-outline" />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h4">Tour {roundNb}</Typography>
        </Grid>
        <Grid item>
          <IconButton
            color="primary"
            onClick={() => handleNextRoundClick()}
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
  );
}
