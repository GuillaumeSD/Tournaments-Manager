import { useTournament } from "@/contexts/tournamentContext";
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export default function HomePage() {
  const { fieldNb, setFieldNb, playerNbByTeam, setPlayerNbByTeam } =
    useTournament();

  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="center"
      marginTop={1}
    >
      <Grid
        item
        container
        xs={12}
        lg={6}
        spacing={4}
        justifyContent="center"
        alignItems="center"
        marginBottom={2}
      >
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <FormControl sx={{ maxWidth: "20em" }} fullWidth>
            <InputLabel id="tournament-select-label">
              Type de tournoi
            </InputLabel>
            <Select
              labelId="tournament-select-label"
              id="tournament-select"
              label="Type de tournoi"
              value={"M"}
            >
              <MenuItem value={"M"}>Tournoi à la mêlée</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <Autocomplete
            options={[...Array(100).keys()].slice(1)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nombre de terrains"
                type="number"
                inputProps={{ ...params.inputProps, min: 1, max: 99 }}
              />
            )}
            value={fieldNb}
            getOptionLabel={(option) => option.toString()}
            onChange={(_, val) => setFieldNb?.(val ?? 6)}
            sx={{ maxWidth: "20em" }}
            fullWidth
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <Autocomplete
            options={[...Array(13).keys()].slice(1)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nombre de joueurs par équipe"
                type="number"
                inputProps={{ ...params.inputProps, min: 1, max: 12 }}
              />
            )}
            value={playerNbByTeam}
            getOptionLabel={(option) => option.toString()}
            onChange={(_, val) => setPlayerNbByTeam?.(val ?? 6)}
            sx={{ maxWidth: "20em" }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography paragraph gutterBottom>
          Un tournoi à la mêlée, parfois appelé tournoi de "mêlée" ou "mixte",
          est une variante de compétition sportive où les équipes sont
          constituées de manière aléatoire à chaque match.
        </Typography>
        <Typography paragraph marginBottom={0}>
          Voici comment cela fonctionne généralement :
        </Typography>
        <List
          sx={{
            listStyleType: "decimal",
            listStylePosition: "inside",
          }}
        >
          <ListItem sx={{ display: "list-item" }}>
            Formation des équipes : Les participants inscrits au tournoi sont
            assignés à des équipes aléatoires à chaque match en tenant compte de
            leur niveau relatif. Cette approche favorise le mélange des
            compétences et encourage l'esprit d'équipe.
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            Rotation des équipes : À chaque match, les équipes sont
            réorganisées, de sorte que vous jouerez avec de nouveaux coéquipiers
            à chaque rencontre. Par exemple, si vous faites partie d'une équipe
            spécifique lors du premier match, vous serez ensuite réassigné à une
            nouvelle équipe pour le deuxième match, et ainsi de suite.
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            Règles du jeu : Les règles du sport en question s'appliquent
            normalement lors d'un tournoi à la mêlée. Que ce soit le volleyball,
            le football, le basketball, le rugby ou tout autre sport, les règles
            habituelles du jeu sont respectées.
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            Classement et progression : Selon le format du tournoi, les équipes
            peuvent accumuler des points au fil des matchs. À la fin du tournoi,
            les équipes avec le plus grand nombre de points ou les meilleures
            performances peuvent passer aux étapes suivantes ou être déclarées
            vainqueurs du tournoi.
          </ListItem>
        </List>
        <Typography paragraph gutterBottom>
          Les tournois à la mêlée sont souvent très appréciés, car ils
          permettent aux participants de rencontrer de nouvelles personnes, de
          jouer avec différents partenaires et de développer leurs compétences
          en s'adaptant à différents styles de jeu. C'est aussi une excellente
          occasion de promouvoir l'esprit d'équipe et de créer une atmosphère
          amicale et compétitive.
        </Typography>
        <Typography paragraph gutterBottom>
          En résumé, les tournois à la mêlée offrent une expérience sportive
          dynamique où les équipes sont formées de manière aléatoire à chaque
          match, ajoutant ainsi une dimension sociale et une opportunité
          d'apprentissage pour les participants.
        </Typography>
      </Grid>
    </Grid>
  );
}
