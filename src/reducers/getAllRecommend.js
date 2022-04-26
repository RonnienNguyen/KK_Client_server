import type from "./../types/actionsType";
const initialState = [];
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GETALLRECOMMEND:
      state = [...action.payload];
      return state;

    default:
      return state;
  }
};
export default reducer;
