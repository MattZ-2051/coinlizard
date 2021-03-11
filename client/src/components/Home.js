import React, { useState, useEffect } from "react";
import CoinGecko from "coingecko-api";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Coin from "./Coin";

// instance of CoinGecko client to use for api calls
const coinGeckoClient = new CoinGecko();
function Home() {
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    // function making calls to Coin Gecko API, results are ordered by market cap
    async function fetchData() {
      const params = {
        order: CoinGecko.ORDER.MARKET_CAP_DESC,
      };
      const result = await coinGeckoClient.coins.markets({ params });
      setCoinData(result.data);
    }

    fetchData();
  }, []);


  return (
    <div>
      <title>Coinmarketcap clone</title>

      <h1></h1>

      <table className="table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>24H Change</th>
            <th>Price</th>
            <th>Market cap</th>
            <th>Favorited</th>
          </tr>
        </thead>
        <tbody>
          {coinData ? (
            coinData.map((coin) => {
              return <Coin coin={coin} key={coin.id} />;
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
