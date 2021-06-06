import {createContext} from "react";

const User = createContext({
  token: "",
  update: () => {},
});

export default User;
