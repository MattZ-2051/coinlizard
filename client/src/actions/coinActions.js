import { coinConstant } from "../constants/coinConstant";
import CoinGecko from "coingecko-api";

const coinGeckoClient = new CoinGecko();

export const fetchData = (id) => async (dispatch) => {
  const res = await coinGeckoClient.coins.fetch(id, {});
  // console.log("===", res);
  if (res.code === 200) {
    // console.log("this is the res", res);
    dispatch({ type: coinConstant.FETCH_COIN_DATA, payload: res.data });
  }
};
