import React, { useState } from "react";
import CoinGecko from "coingecko-api";
import { useHistory } from "react-router-dom";

const coinGeckoClient = new CoinGecko();

export default function Crypto({ coin }) {
  // Helper function to turn number into percent
  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;
  // Helper funtion to turn number in to USD with sig fig
  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits,
    }).format(number);

  const history = useHistory();
  const [singleCoinData, setSingleCoinData] = useState(null);

  // Funtion that handles a click on a currency and will direct user to currency page
  const handleClick = async (e) => {
    const result = await coinGeckoClient.coins.fetch(coin.id, {});
    setSingleCoinData(result.data);
    history.push(`/coin-profile/${result.data.id}`);
  };

  return (
    <tr key={coin.id} onClick={handleClick}>
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
  );
}
