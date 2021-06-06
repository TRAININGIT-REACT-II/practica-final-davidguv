import types from "../actions/types";

const initialState = {tema: "normal"};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CAMBIAR_TEMA:
      return {
        tema: action.name,
      };
    default:
      return state;
  }
};
export default reducer;
