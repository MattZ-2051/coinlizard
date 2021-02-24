import React, { useEffect } from "react";
import CoinGecko from "coingecko-api";

const coinGeckoClient = new CoinGecko();

export default function Crypto({ coin }) {
  const id = coin.id;

  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits,
    }).format(number);

  useEffect(() => {
    async function fetchData() {}

    fetchData();
  }, []);

  return (
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
  );
}
