import types from "./types";

export const cambiarTema = (name) => ({
  type: types.CAMBIAR_TEMA,
  name,
});
