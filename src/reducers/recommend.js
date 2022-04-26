import type from "./../types/actionsType";
const initialState = [];
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.RECOMMEND:
      state = [...action.payload];
      console.log(state);
      return state;

    default:
      return state;
  }
};
export default reducer;
