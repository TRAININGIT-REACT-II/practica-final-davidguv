import {TextField, Typography, Container, Grid, Button} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import User from "../contexts/user";
import Note from "./Note";
import {useState, useContext, useEffect} from "react";

const Notes = (props) => {
  const user = useContext(User);
  const [Notas, setNotas] = useState([]);

  // Cargamos la lista de notas
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    fetch("/api/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-token": user.token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error != null) {
          console.log(json.error);
        } else {
          console.log(json);
          setNotas(json);
        }
      });
  };

  return (
    <>
      {Notas.length > 0 ? (
        <Container maxWidth="sm">
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            spacing={6}
          >
            {Notas.map((nota) => (
              <Grid item key={nota.id}>
                <Note
                  key={nota.id}
                  id={nota.id}
                  title={nota.title}
                  content={nota.content}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <center>
          <h1>No tienes ninguna nota</h1>
        </center>
      )}
    </>
  );
};

export default Notes;
