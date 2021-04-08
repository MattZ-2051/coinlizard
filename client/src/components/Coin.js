import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import unfavorite from "../images/unfavorite.png";
import favorite from "../images/favorite.png";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../actions/favoriteActions.js";

export default function Crypto({ coin, isFavorited }) {
  // Helper function to turn number into percent
  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

  // Helper funtion to turn number in to USD with sig fig
  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits,
    }).format(number);

  const user = useSelector((state) => state.authReducer);
  const favorites = useSelector((state) => state.favoriteReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavorites(user._id));
  }, [dispatch]);

  const handleFavorites = (e) => {
    const form = {
      coinName: coin.id,
      _user: user._id,
    };

    if (isFavorited === false) {
      //setIsFavorite(true);
      dispatch(addFavorite(form));
    } else {
      //setIsFavorite(false);
      dispatch(removeFavorite(coin.id, form));
    }
  };

  return (
    <tr style={{ fontWeight: "bold" }} key={coin.id}>
      <td>
        <img
          src={coin.image}
          style={{ width: 25, height: 25, marginRight: 10 }}
        />
        <Link to={`/coin-profile/${coin.id}`} style={{ color: "#86A873" }}>
          {coin.symbol.toUpperCase()}
        </Link>
      </td>
      <td style={{ fontWeight: "bold" }}>
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
      <td style={{ fontWeight: "bold" }}>
        {formatDollar(coin.current_price, 20)}
      </td>
      <td style={{ fontWeight: "bold" }}>
        {formatDollar(coin.market_cap, 12)}
      </td>
      <td onClick={handleFavorites}>
        {isFavorited ? (
          <img style={{ height: 30, paddingLeft: 35 }} src={favorite} />
        ) : (
          <img style={{ height: 30, paddingLeft: 35 }} src={unfavorite} />
        )}
      </td>
    </tr>
  );
}
