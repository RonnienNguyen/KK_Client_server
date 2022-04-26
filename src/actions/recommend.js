import axios from "axios";
import type from "./../types/actionsType";
import link from "./../helpers/variableContains";
const getAllRecommend = () => {
  try {
    return async (dispatch) => {
      const result = await axios.get(`${link.URL_BACKEND}/recommend`);
      if (result.data) {
        dispatch({
          type: type.RECOMMEND,
          payload: result.data,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export default getAllRecommend;
