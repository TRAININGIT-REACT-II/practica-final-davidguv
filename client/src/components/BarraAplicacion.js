import {AppBar, Toolbar, IconButton, Switch, Typography, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SwitchTema from "./SwitchTema";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import Fade from "@material-ui/core/Fade";
import User from "../contexts/user";
import {useContext} from "react";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  titulo: {
    flexGrow: 1,
  },
  button: {
    marginRight: 10,
    marginLeft: 10,
  },
}));

const BarraAplicacion = () => {
  const classes = useStyles();
  const user = useContext(User);
  const history = useHistory();

  const onClick = () => {
    window.localStorage.setItem("token", "");
    user.update("");
    history.push("/");
  };

  const onNuevaNota = () => {
    history.push("/notes/add");
  };

  return (
    <Fade in={true} timeout={1000}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>

          <Typography variant="h5" className={classes.titulo}>
            <Link component={RouterLink} to="/" color="inherit">
              TrainingNotes
            </Link>
          </Typography>
          <>
            {user.token !== "" ? (
              <>
                <Button
                  onClick={onNuevaNota}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<LibraryAddIcon />}
                >
                  Nueva nota
                </Button>
                <Button
                  onClick={onClick}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<ExitToAppIcon />}
                >
                  Salir
                </Button>
              </>
            ) : null}
          </>
        </Toolbar>
      </AppBar>
    </Fade>
  );
};

export default BarraAplicacion;
