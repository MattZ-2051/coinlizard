import { coinConstant } from "../constants/coinConstant";
import CoinGecko from "coingecko-api";

const coinGeckoClient = new CoinGecko();

export const fetchData = (id) => async (dispatch) => {
  const res = await coinGeckoClient.coins.fetch(id, {});
  if (res.code === 200) {
    dispatch({ type: coinConstant.FETCH_COIN_DATA, payload: res.data });
  }
};
