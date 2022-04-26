import axios from "axios";
import link from "./../helpers/variableContains";
import type from "./../types/actionsType";
const getAllTypes = () => {
  try {
    return async (dispatch) => {
      const result = await axios.get(`${link.URL_BACKEND}/type/getAll`);
      console.log(result);
      if (result.data.result.types) {
        dispatch({
          type: type.GETALLTYPES,
          payload: result.data.result.types,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export default getAllTypes;
