import { coinConstant } from "../constants/coinConstant";
import CoinGecko from "coingecko-api";
import axios from "axios";

const coinGeckoClient = new CoinGecko();

export const fetchData = (id) => async (dispatch) => {
  const res = await coinGeckoClient.coins.fetch(id, {});
  if (res.code === 200) {
    dispatch({ type: coinConstant.FETCH_COIN_DATA, payload: res.data });
  }
};

export const fetchTwoWeekData = (id) => async (dispatch) => {
  const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`);
  // console.log(`Data for ${id}`, res.data);

  if (res.status === 200) {
    dispatch({ type: coinConstant.FETCH_COIN_DATA, payload: res.data})
  }
}
