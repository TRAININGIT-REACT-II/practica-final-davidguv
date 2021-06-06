import {Card, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SwitchTema from "./SwitchTema";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import Fade from "@material-ui/core/Fade";
import Status from "./Status";

import User from "../contexts/user";

import {useContext, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    paddingLeft: "20px",
    bottom: 0,
    left: 0,
  },
  tema: {
    right: "300px",
    width: "500px",
  },
});

const BarraInferior = () => {
  const classes = useStyles();
  const user = useContext(User);
  const history = useHistory();
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargamos el estado del servidor
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStatus(data.status === "ok"))
      .finally(() => setLoading(false));
  }, []);

  const onClick = () => {
    window.localStorage.setItem("token", "");
    user.update("");
    history.push("/");
  };

  const onNuevaNota = () => {
    history.push("/notes/add");
  };

  return (
    <div className={classes.root}>
      <Card color="primary">
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={6}>
            Conexión con el servidor: <Status status={status} />
          </Grid>
          <Grid item xs={6} align="right">
            <SwitchTema />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default BarraInferior;
