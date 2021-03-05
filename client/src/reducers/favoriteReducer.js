import { favoriteConstant } from "../constants/favoriteConstant.js";

export default function favoriteReducer(state = {}, action) {
  switch (action.type) {
    case favoriteConstant.FETCH_FAVORITE_DATA:
      return action.payload || false;
    default:
      return state;
  }
}
