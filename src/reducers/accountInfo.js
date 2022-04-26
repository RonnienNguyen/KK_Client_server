import type from "./../types/actionsType";
let initialState = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : {};
const reducer = (state = initialState, action) => {
  try {
    switch (action.type) {
      case type.ACCOUNTINFO:
        state = { ...action.payload };
        localStorage.setItem("account", JSON.stringify(state));
        return state;
      default:
        return state;
    }
  } catch (error) {
    console.log(error);
  }
};
export default reducer;
