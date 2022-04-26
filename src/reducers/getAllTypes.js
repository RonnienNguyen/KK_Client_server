import type from "../types/actionsType";
let initialState = [];
const reducer = (state = initialState, action) => {
  try {
    switch (action.type) {
      case type.GETALLTYPES:
        state = [...action.payload];
        return state;
      default:
        return state;
    }
  } catch (error) {
    console.log(error);
  }
};
export default reducer;
