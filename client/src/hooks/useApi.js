import {useState, useEffect} from "react";

const useApi = (url) => {
  const [error, useError] = useState(null);
  const [data, setData] = useState(null);
  const [peticion, setPeticion] = useState(true);

  const setConfigPeticion = (config) => {
    setPeticion(config);
  };

  useEffect(() => {
    fetch(url, peticion)
      .then((res) => res.json())
      .then((json) => {
        if (json.error != null) {
          setError(json.error);
        } else {
          setData(json);
        }
      });
  }, [url, peticion]);

  return {
    data,
    error,
    setConfigPeticion,
  };
};

export default useApi;
