import { coinConstant } from "../constants/coinConstant.js";

export default function coinReducer(state = {}, action) {
  switch (action.type) {
    case coinConstant.FETCH_COIN_DATA:
      return action.payload || false;
    default:
      return state;
  }
}
