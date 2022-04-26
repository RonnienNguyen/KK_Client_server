import axios from "axios";
import type from "./../types/actionsType";
import link from "./../helpers/variableContains";
const getAllHotels = (id) => {
  try {
    return async (dispatch) => {
      const result = await axios.get(`${link.URL_BACKEND}/hotel/getAll/${id}`);
      console.log(result);
      if (result.data.result) {
        dispatch({
          type: type.GETALLHOTELS,
          payload: result.data.result.hotels,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export default getAllHotels;
