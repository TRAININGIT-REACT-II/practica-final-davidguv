import {TextField, Typography, Container, Button} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import {useParams, useHistory} from "react-router-dom";
import User from "../contexts/user";
import {useState, useContext, useEffect} from "react";
import Mensaje from "./Mensaje";

const NoteEdit = (props) => {
  const params = useParams();
  const [formState, setFormState] = useState({title: "", content: ""});
  const user = useContext(User);
  const history = useHistory();
  const [notifica, useNotifica] = useState({title: "", content: ""});

  useEffect(() => {
    if (props.editar === true && user.token !== "") {
      loadNote();
    } else {
      setFormState({title: "", content: ""});
    }
  }, [user.token, props.editar]);

  const onChange = (key) => {
    return (e) => {
      setFormState({
        ...formState,
        [key]: e.target.value,
      });
    };
  };

  const onClick = () => {
    if (props.editar) {
      editNote();
    } else {
      createNote();
    }
  };

  const postError = () => {};

  const onClickEliminar = () => {
    deleteNote();
  };

  const createNote = () => {
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-token": user.token,
      },
      body: JSON.stringify({
        title: formState.title,
        content: formState.content,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error != null) {
          console.log(json.error);
        } else {
          console.log(json);
          history.push("/");
        }
      });
  };

  const loadNote = () => {
    fetch("/api/notes/" + params.id, {
      method: "GET",
      headers: {
        "api-token": user.token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error != null) {
          console.log("er" + json.error);
          useNotifica({
            title: "No se puede cargar",
            content: json.error,
          });
        } else {
          setFormState({
            ...formState,
            title: json.title,
            content: json.content,
          });
        }
      });
  };

  const editNote = () => {
    fetch("/api/notes/" + params.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "api-token": user.token,
      },
      body: JSON.stringify({
        title: formState.title,
        content: formState.content,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error != null) {
          console.log(json.error);
        } else {
          console.log("editando", json);
          history.push("/");
        }
      });
  };

  const deleteNote = () => {
    fetch("/api/notes/" + params.id, {
      method: "DELETE",
      headers: {
        "api-token": user.token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error != null) {
          console.log(json.error);
          useNotifica({
            title: "No se puede eliminar",
            content: "Existe un problema al borrar la nota /r/n" + json,
          });
        } else {
          console.log("Eliminada Nota", json);
          history.push("/");
        }
      });
  };

  console.log("renderiza", notifica.title);
  return (
    <>
      <Container component="main" maxWidth="xs">
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Titulo"
            name="title"
            value={formState.title}
            onChange={onChange("title")}
            autoComplete="usuario"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={6}
            name="content"
            label="Contenido"
            onChange={onChange("content")}
            value={formState.content}
            id="contenido"
          />
          {props.editar === true ? (
            <>
              <h1>{notifica.title}</h1>
              <Button onClick={onClick} fullWidth variant="contained" color="primary">
                Editar nota
              </Button>
              <Button
                onClick={onClickEliminar}
                fullWidth
                variant="contained"
                color="secondary"
              >
                Eliminar
              </Button>
            </>
          ) : (
            <>
              <Button onClick={onClick} fullWidth variant="contained" color="primary">
                Alta de nota
              </Button>
            </>
          )}
        </form>
      </Container>
      <Mensaje
        open={notifica.title !== ""}
        title={notifica.title}
        content={notifica.content}
      />
    </>
  );
};

export default NoteEdit;
