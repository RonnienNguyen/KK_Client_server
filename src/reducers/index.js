import { combineReducers } from "redux";
import getAllAccounts from "./getAllAccounts";
import getAllHotels from "./getAllHotels";
import getAllPartners from "./getAllPartners";
import getAllType from "./getAllTypes";
import login from "./login";
import accountInfo from "./accountInfo";
import token from "./getToken";
import recommend from "./getAllRecommend";
import allRecommend from "./recommend";
import moveObj from "./moveObj";
import restaurant from "./getRestaurant";
export default combineReducers({
  getAllAccounts,
  getAllHotels,
  getAllPartners,
  getAllType,
  login,
  accountInfo,
  token,
  recommend,
  allRecommend,
  moveObj,
  restaurant,
});
