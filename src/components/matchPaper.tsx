import { blue, green } from "@mui/material/colors";
import { Match } from "../types/tournamentTypes";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import ScoreInput from "./ScoreInput";
import PlayerName from "./PlayerName";
import { useTournament } from "@/contexts/tournamentContext";

const team1Color = green[600];
const team2Color = blue[600];

type Props = {
  match: Match;
  roundId: string;
};

export default function MatchPaper({ match, roundId }: Props) {
  const { setMatchScore } = useTournament();

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

        {match.teams[0].players.map((playerId) => (
          <PlayerName playerId={playerId} color={team1Color} key={playerId} />
        ))}

        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs={12}
        >
          <Grid item xs paddingLeft={2}>
            <Divider />
          </Grid>

          <ScoreInput
            score={match.score[0]}
            setScore={(score: number) =>
              setMatchScore?.(roundId, match.id, 0, score)
            }
            color={team1Color}
          />

          <Typography variant="h6">VS</Typography>

          <ScoreInput
            score={match.score[1]}
            setScore={(score: number) =>
              setMatchScore?.(roundId, match.id, 1, score)
            }
            color={team2Color}
          />

          <Grid item xs paddingRight={2}>
            <Divider />
          </Grid>
        </Grid>

        {match.teams[1].players.map((playerId) => (
          <PlayerName playerId={playerId} color={team2Color} key={playerId} />
        ))}
      </Grid>
    </Paper>
  );
}
