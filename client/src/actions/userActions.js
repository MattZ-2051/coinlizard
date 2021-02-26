import axios from "axios";
import { userConstant } from "../constants/userConstant.js";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: userConstant.FETCH_USER, payload: res.data });
};
