import React, { useState, useEffect } from "react";
import CoinGecko from "coingecko-api";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const coinGeckoClient = new CoinGecko();

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const params = {
        order: CoinGecko.ORDER.MARKET_CAP_DESC,
      };
      const result = await coinGeckoClient.coins.markets({ params });
      setData(result.data);
    }

    fetchData();
  }, []);
  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits,
    }).format(number);
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
            data.map((coin) => (
              <tr key={coin.id}>
                <td>
                  <img
                    src={coin.image}
                    style={{ width: 25, height: 25, marginRight: 10 }}
                  />
                  {coin.symbol.toUpperCase()}
                </td>
                <td>
                  <span
                    className={
                      coin.price_change_percentage_24h > 0
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {formatPercent(coin.price_change_percentage_24h)}
                  </span>
                </td>
                <td>{formatDollar(coin.current_price, 20)}</td>
                <td>{formatDollar(coin.market_cap, 12)}</td>
              </tr>
            ))
          ) : (
            <h1>loading...</h1>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
