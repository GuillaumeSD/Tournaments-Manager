import { useTournament } from "@/contexts/tournamentContext";
import { Grid, Typography } from "@mui/material";

interface Props {
  playerId: string;
  color: string;
}

export default function PlayerName({ playerId, color }: Props) {
  const { players } = useTournament();

  return (
    <Grid item container xs={4} justifyContent="center" alignItems="center">
      <Typography
        align="center"
        color={color}
        width={100}
        noWrap
        fontWeight={500}
      >
        {players?.[playerId]?.name}
      </Typography>
    </Grid>
  );
}
