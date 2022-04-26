import type from "./../types/actionsType";
const falseAction = (info) => {
  try {
    return async (dispach) => {
      dispach({
        type: type.ACCOUNTINFO,
        payload: info,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export default falseAction;
