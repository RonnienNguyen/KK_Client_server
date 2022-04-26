import type from "./../types/actionsType";
const obj = {};
const reducer = (state = obj, action) => {
  switch (action.type) {
    case type.MOVEOBJ:
      state = {
        ...action.payload,
      };
      return state;

    default:
      return state;
  }
};
export default reducer;
