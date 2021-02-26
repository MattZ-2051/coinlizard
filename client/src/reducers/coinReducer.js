import { coinConstant } from "../constants/coinConstant.js";

export default function coinReducer(state = {}, action) {
  switch (action.type) {
    case coinConstant.FETCH_COIN_DATA:
      console.log("here");
      return action.payload || false;
    default:
      console.log("default");
      return state;
  }
}
