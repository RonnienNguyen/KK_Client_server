import types from "./../types/actionsType";
const getStatus = JSON.parse(localStorage.getItem("islogin"));
let initialState = getStatus ? getStatus : false;
const reducer = (state = initialState, action) => {
  try {
    switch (action.type) {
      case types.ISLOGIN:
        state = true;
        localStorage.setItem("islogin", state);
        return state;
      case types.FALSELOGIN:
        state = false;
        localStorage.setItem("islogin", state);
        return state;

      default:
        return state;
    }
  } catch (error) {
    console.log(error);
  }
};
export default reducer;
