import axios from "axios";
import type from "./../types/actionsType";
import redirectToHome from "./../helpers/redirectToHome";
import link from "./../helpers/variableContains";
const getAllAccounts = (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    return async (dispatch) => {
      const result = await axios({
        method: "GET",
        url: `${link.URL_BACKEND}/account/getAll/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const { statusCode, accounts } = result.data.result;
      if (statusCode === 200) {
        if (accounts) {
          dispatch({
            type: type.GETALLACCOUNTS,
            payload: accounts,
          });
        }
      } else if (statusCode === 403) {
        redirectToHome(dispatch);
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export default getAllAccounts;
