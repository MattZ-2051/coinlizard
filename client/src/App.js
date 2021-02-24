import React, { useState, useEffect } from "react";
import CoinGecko from "coingecko-api";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Coin from "./components/Coin";

const coinGeckoClient = new CoinGecko();

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const params = {
        order: CoinGecko.ORDER.MARKET_CAP_DESC,
        per_page: 10,
      };
      const result = await coinGeckoClient.coins.markets({ params });
      setData(result.data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <title>Coinmarketcap clone</title>

      <h1>Coinmarketcap clone</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>24H Change</th>
            <th>Price</th>
            <th>Market cap</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((coin) => {
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

export default App;
