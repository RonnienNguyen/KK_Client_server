import type from "./../types/actionsType";
const getToken = (token) => {
  try {
    return async (dispatch) => {
      dispatch({
        type: type.GETTOKEN,
        payload: token,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export default getToken;
