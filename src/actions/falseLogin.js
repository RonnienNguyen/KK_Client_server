import type from "./../types/actionsType";
const falseAction = () => {
  return async (dispach) => {
    try {
      dispach({
        type: type.FALSELOGIN,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export default falseAction;
