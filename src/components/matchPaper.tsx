import { blue, green } from "@mui/material/colors";
import { useTournament } from "../contexts/tournamentContext";
import { Match } from "../types/tournamentTypes";
import { Divider, Grid, Paper, Typography } from "@mui/material";

export default function MatchPaper({ match }: { match: Match }) {
  const { players } = useTournament();

  if (!players) return null;

  const playerItem = (playerId: string, color: string) => (
    <Grid
      item
      container
      xs={4}
      key={playerId}
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        align="center"
        color={color}
        width={100}
        noWrap
        fontWeight={"bold"}
      >
        {players[playerId]?.name}
      </Typography>
    </Grid>
  );

  return (
    <Paper elevation={3}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        paddingBottom={2}
      >
        <Grid item xs={12}>
          <Typography align="center" variant="h6">
            Match {match.id + 1}
          </Typography>
        </Grid>

        {match.teams[0].players.map((playerId) =>
          playerItem(playerId, green[600])
        )}

        <Grid item xs={11}>
          <Divider>VS</Divider>
        </Grid>

        {match.teams[1].players.map((playerId) =>
          playerItem(playerId, blue[600])
        )}
      </Grid>
    </Paper>
  );
}
