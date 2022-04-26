import axios from "axios";
import types from "./../types/actionsType";
import link from "./../helpers/variableContains";
const getRestaurants = (id, name) => {
  console.log(id);
  try {
    return async (dispatch) => {
      console.log(`${link.URL_BACKEND}/${name}/${id}`);
      const result = await axios.get(`${link.URL_BACKEND}/${name}/${id}`);
      console.log(result);
      if (result.data.result.restaurant) {
        dispatch({
          type: types.RESTAURANTS,
          payload: result.data.result.restaurant,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export default getRestaurants;
