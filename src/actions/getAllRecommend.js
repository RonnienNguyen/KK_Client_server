import axios from "axios";
import type from "./../types/actionsType";
import link from "./../helpers/variableContains";
const getAllRecommend = () => {
  try {
    return async (dispatch) => {
      const result = await axios.get(`${link.URL_BACKEND}/recommend/getAll/`);
      if (result.data.result) {
        dispatch({
          type: type.GETALLRECOMMEND,
          payload: result.data.result,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export default getAllRecommend;
