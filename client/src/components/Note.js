import {
  TextField,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  Container,
  Button,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    width: 345,
  },
  media: {
    height: 140,
  },
  line: {
    backgroundColor: "#BBBBBB",
  },
});

const Note = ({id, title = "Sin titulo", content = "Sin contenido"}) => {
  const classes = useStyles();
  const history = useHistory();

  const onClick = () => {
    history.push("/notes/edit/" + id);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClick}>
        <CardContent className={classes.line} color="primary"></CardContent>
        <CardContent>
          <Typography data-testid="textoTitulo" variant="h5" component="h2">
            {title.substr(0, 200)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content.substr(0, 400)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={onClick} size="small" color="primary">
          Editar
        </Button>
      </CardActions>
    </Card>
  );
};

export default Note;
