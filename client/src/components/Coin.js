import React from "react";
import { useHistory } from "react-router-dom";
import unfavorite from '../images/unfavorite.png';
import favorite from '../images/favorite.png';

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

  // Funtion that handles a click on a currency and will direct user to currency page
  const handleClick = async () => {
    history.push(`/coin-profile/${coin.id}`);
  };

  return (
      <tr style={{fontWeight: 'bold'}} key={coin.id} onClick={handleClick}>
        <td>
          <img
            src={coin.image}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
          {coin.symbol.toUpperCase()}
        </td>
        <td style={{fontWeight: 'bold'}}> 
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
        <td style={{fontWeight: 'bold'}}>{formatDollar(coin.current_price, 20)}</td>
        <td style={{fontWeight: 'bold'}}>{formatDollar(coin.market_cap, 12)}</td>
        <td>
          <img  style={{height: 30, paddingLeft: 35}} src={unfavorite} />
        </td>
      </tr>
  );
}
