import type from "../types/actionsType";
let initialState = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";
const reducer = (state = initialState, action) => {
  try {
    switch (action.type) {
      case type.GETTOKEN:
        state = action.payload;
        localStorage.setItem("token", JSON.stringify(action.payload));
        return state;
      default:
        return state;
    }
  } catch (error) {
    console.log(error);
  }
};
export default reducer;
