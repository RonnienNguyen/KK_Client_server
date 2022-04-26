import type from "./../types/actionsType";
function redirectToHome(dispatch) {
  setTimeout(() => {
    dispatch({
      type: type.FALSELOGIN,
    });
    window.location.href = "/";
  }, 100);
}
export default redirectToHome;
