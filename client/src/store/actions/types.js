// Definimos la lista de acciones
const actions = [
  // Tema
  "CAMBIAR_TEMA",

  // Usuarios
  "UPDATE_NAME",
];

// Las convertimos en un objeto
const actionTypes = {};
actions.forEach((action) => {
  actionTypes[action] = action;
});

export default actionTypes;
