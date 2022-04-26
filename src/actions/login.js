import type from "./../types/actionsType";
const loginAction = () => {
  try {
    return async (dispach) => {
      dispach({
        type: type.ISLOGIN,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export default loginAction;
