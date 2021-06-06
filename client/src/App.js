import {useEffect, useState} from "react";

import Theme from "./contexts/theme";
import User from "./contexts/user";

import store from "./store/store";
import {Provider, useSelector} from "react-redux";
import TrainingApp from "./TrainingApp";

// Componente principal de la aplicación.
const App = () => {
  const [tema, setTema] = useState("rosa");
  const [token, setToken] = useState("");

  // Cargamos el token de localStorage
  useEffect(() => {
    const tokenLocalStorage = window.localStorage.getItem("token");
    if (tokenLocalStorage) {
      setToken(tokenLocalStorage);
    }
  }, []);

  // Mostramos la aplicación
  return (
    <>
      <Provider store={store}>
        <User.Provider value={{token: token, update: setToken}}>
          <Theme.Provider value={{current: tema, update: setTema}}>
            <TrainingApp />
          </Theme.Provider>
        </User.Provider>
      </Provider>
    </>
  );
};

export default App;
