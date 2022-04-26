import axios from "axios";
import types from "./../types/actionsType";
import link from "./../helpers/variableContains";
const getAllHotels = (id, type, email) => {
  try {
    return async (dispatch) => {
      const result = await axios.get(
        `${link.URL_BACKEND}/partner/getAll/${id}?type=${type}&email=${email}`
      );
      if (result.data.result.partners) {
        dispatch({
          type: types.GETALLPARTNERS,
          payload: result.data.result.partners,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export default getAllHotels;
