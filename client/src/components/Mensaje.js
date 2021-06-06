import {
  Dialog,
  DialogTitle,
  DialogContentText,
  Button,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import {useState, useEffect} from "react";

const useStyles = makeStyles((theme) => ({
  titulo: {
    flexGrow: 1,
  },
}));

const Mensaje = ({open = false, title, content}) => {
  const classes = useStyles();
  const [abierto, useAbierto] = useState(open);

  useEffect(() => {
    useAbierto(open);
  }, [open]);

  const onClick = () => {
    useAbierto(false);
  };

  return (
    <Dialog
      open={abierto}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClick}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Mensaje;
