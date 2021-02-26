import { userConstant } from "../constants/userConstant.js";

export default function authReducer(state = null, action) {
  switch (action.type) {
    case userConstant.FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
