import {useContext} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Container} from "@material-ui/core";
import NotFound from "./views/NotFound";
import Login from "./components/Login";
import BarraAplicacion from "./components/BarraAplicacion";
import BarraInferior from "./components/BarraInferior";
import CssBaseline from "@material-ui/core/CssBaseline";

import Theme from "./contexts/theme";
import User from "./contexts/user";
import Mensaje from "./components/Mensaje";
import NoteEdit from "./components/NoteEdit";
import Notes from "./components/Notes";
import ErrorBoundary from "./components/ErrorBoundary";
import {makeStyles} from "@material-ui/core/styles";

import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import {useSelector} from "react-redux";

const normalTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#FABADA",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

// Componente principal de la aplicación.
const TrainingApp = () => {
  const classes = useStyles();
  const temaActual = useSelector((store) => store.tema.tema);
  const user = useContext(User);

  // Mostramos la aplicación
  return (
    <>
      <ThemeProvider theme={temaActual === "normal" ? normalTheme : darkTheme}>
        <CssBaseline />
        <Router>
          <BarraAplicacion />
          <Container className={classes.root}>
            <ErrorBoundary>
              <Switch>
                <Route path="/" exact>
                  {user.token === "" ? <Login login={true} /> : <Notes />}
                </Route>
                <Route path="/account/new" exact>
                  <h1>Nueva cuenta</h1>
                  <Login login={false} />
                </Route>
                <Route path="/notes" exact>
                  <h1>listado de notas</h1>
                  <Mensaje />
                </Route>
                <Route path="/notes/add" exact>
                  <h1>Añadir nota</h1>
                  <NoteEdit editar={false} />
                </Route>
                <Route path="/notes/edit/:id" exact>
                  <h1>Editar nota</h1>
                  <NoteEdit editar={true} />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </ErrorBoundary>
          </Container>
          <BarraInferior />
        </Router>
      </ThemeProvider>
    </>
  );
};

export default TrainingApp;
