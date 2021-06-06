import {TextField, Typography, Container, Button} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import User from "../contexts/user";
import {useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {Link as RouterLink} from "react-router-dom";

const Login = (props) => {
  const [formState, setFormState] = useState({username: "", password: ""});
  const user = useContext(User);
  const history = useHistory();

  const onChange = (key) => {
    return (e) => {
      setFormState({
        ...formState,
        [key]: e.target.value,
      });
    };
  };

  const onClick = () => {
    if (props.login) {
      loginAccount();
    } else {
      createAccount();
    }
  };

  const createAccount = () => {
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formState.username,
        password: formState.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error != null) {
          console.log(json.error);
        } else {
          user.update(json.token);
          window.localStorage.setItem("token", json.token);
          console.log(json);
          history.push("/");
        }
      });
  };

  const loginAccount = () => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formState.username,
        password: formState.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error != null) {
          console.log(json.error);
        } else {
          user.update(json.token);
          window.localStorage.setItem("token", json.token);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="usuario"
          label="Usuario"
          name="usuario"
          value={formState.username}
          onChange={onChange("username")}
          autoComplete="usuario"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          onChange={onChange("password")}
          value={formState.password}
          id="password"
          autoComplete="current-password"
        />
        {props.login === true ? (
          <>
            <Button onClick={onClick} fullWidth variant="contained" color="primary">
              Entrar
            </Button>
            <Typography>
              <Link component={RouterLink} to="/account/new" color="inherit">
                No tienes cuenta? Crea una
              </Link>
            </Typography>
          </>
        ) : (
          <>
            <Button onClick={onClick} fullWidth variant="contained" color="primary">
              Crear cuenta
            </Button>
            <Typography>
              <Link component={RouterLink} to="/" color="inherit">
                Ya tienes cuenta? Logueate
              </Link>
            </Typography>
          </>
        )}
      </form>
    </Container>
  );
};

export default Login;
