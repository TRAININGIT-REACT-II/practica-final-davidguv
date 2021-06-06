import {useContext} from "react";
import {Switch} from "@material-ui/core";
import Theme from "../contexts/theme";

import {cambiarTema} from "../store/actions/tema";
import store from "../store/store";
import {useSelector, useDispatch} from "react-redux";

const SwitchTema = () => {
  const Tema = useContext(Theme);
  const tema = useSelector((store) => store.tema.tema);
  const dispatch = useDispatch();

  const onChange = () => {
    if (tema === "normal") {
      dispatch(cambiarTema("oscuro"));
    } else {
      dispatch(cambiarTema("normal"));
    }
  };

  return (
    <>
      Tema: <Switch color="secondary" onChange={onChange} />
    </>
  );
};

export default SwitchTema;
