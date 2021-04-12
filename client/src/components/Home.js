import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CoinGecko from "coingecko-api";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Coin from "./Coin";
import Header from "./Header";
import Loading from "../components/Loading";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../actions/favoriteActions.js";

// instance of CoinGecko client to use for api calls
const coinGeckoClient = new CoinGecko();

function Home() {
  const [coinData, setCoinData] = useState([]);
  const user = useSelector((state) => state.authReducer);
  const favorites = useSelector((state) => state.favoriteReducer);
  const dispatch = useDispatch();


  useEffect(() => {
    // function making calls to Coin Gecko API, results are ordered by market cap
    async function fetchData() {
      const params = {
        order: CoinGecko.ORDER.MARKET_CAP_DESC,
      };
      const result = await coinGeckoClient.coins.markets({ params });
      setCoinData(result.data);
    }
    dispatch(getFavorites(user._id));
    fetchData();
  }, []);

  const isFavorited = (array, coin) => {
    for (let i = 0; i < array.length; i++) {
      let obj = array[i];
      if (obj[Object.keys(obj)[1]] === coin.id) {
        return true;
      }
    }
    return false;
  };

  return (
    <div style={{ paddingLeft: "50px", paddingRight: "50px", paddingTop: "10px" }}>
      <Header />
      <title>Coinmarketcap clone</title>
      <Loading />

      <table className="table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>24H Change</th>
            <th>Price</th>
            <th>Market cap</th>
            {user && (
              <th>Favorited</th>
            )}
            
          </tr>
        </thead>
        <tbody>
          {coinData ? (
            coinData.map((coin) => {
              return (
                <Coin
                  coin={coin}
                  key={coin.id}
                  isFavorited={isFavorited(favorites, coin)}
                />
              );
            })
          ) : (
            <h1>Loading...</h1>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
