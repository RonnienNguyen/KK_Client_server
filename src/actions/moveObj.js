import type from "./../types/actionsType";
const moveObj = (obj) => {
  try {
    return async (dispatch) => {
      dispatch({
        type: type.MOVEOBJ,
        payload: obj,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export default moveObj;
