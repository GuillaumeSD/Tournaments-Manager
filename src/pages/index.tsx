import { useTournament } from "@/contexts/tournamentContext";
import { Icon } from "@iconify/react";
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
import { yellow } from "@mui/material/colors";

export default function HomePage() {
  const { matchesNb, setMatchesNb, playersNbByTeam, setPlayersNbByTeam } =
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
        lg={4}
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
          <Typography variant="h5" component="h1" marginRight={1}>
            Paramètres
          </Typography>
          <Icon icon={"mdi:cog"} height="1.5em" />
        </Grid>
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
            value={matchesNb}
            getOptionLabel={(option) => option.toString()}
            onChange={(_, val) => setMatchesNb?.(val ?? 6)}
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
                label="Nombre max de joueurs par équipe"
                type="number"
                inputProps={{ ...params.inputProps, min: 1, max: 12 }}
              />
            )}
            value={playersNbByTeam}
            getOptionLabel={(option) => option.toString()}
            onChange={(_, val) => setPlayersNbByTeam?.(val ?? 6)}
            sx={{ maxWidth: "20em" }}
            fullWidth
          />
          <Grid
            item
            container
            xs={12}
            justifyContent="center"
            alignItems="center"
            marginTop={0.5}
          >
            <Icon icon={"mdi:information-outline"} color={yellow[700]} />
            <Typography
              variant="caption"
              color="text.secondary"
              marginLeft={0.5}
            >
              changer ce paramètre réinitialisera les joueurs et les matchs
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={8}>
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
            Classement et progression : Les joueurs accumulent des points au fil
            des matchs. À chaque match joué, chaque joueur accumule en cas de
            victoire ou encaisse en cas défaite la différence de points entre
            les deux équipes. À la fin du tournoi, les joueurs avec le plus
            grand nombre de points ou les meilleures performances peuvent être
            déclarées vainqueurs du tournoi.
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
