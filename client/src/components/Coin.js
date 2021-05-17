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
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(getFavorites(user._id));
  }, [dispatch]);

  const handleFavorites = (e) => {
    console.log('hasdfhasdjf')
    const form = {
      coinName: coin.id,
      _user: user._id,
    };

    if (isFavorited === false) {
      dispatch(addFavorite(form));
    } else {
      dispatch(removeFavorite(coin.id, form));
    }
  };

  return (
    <div className='coin-stats'>
      <div className='coin-stats-id size'>
      <a href={`/coin-profile/${coin.id}`}>
          <text>{coin.id}</text>
      </a>

      </div>
      <div className='coin-stats-price size'>
      <text style={{ color: '#05E502'}}>{`$${coin.current_price}`}</text>
      </div>  
      <div className='coin-stats-24h-change size'>
        {coin.market_cap_change_percentage_24h > 0 ? (
          <text style={{ color: '#05E502' }}>+{coin.market_cap_change_percentage_24h}%</text>
        ) : (
          <text style={{ color: 'red' }}>{coin.market_cap_change_percentage_24h}%</text>
        )}
      </div>
      <div className='coin-stats-market-cap size'>
        <text>{coin.market_cap}</text>
      </div>
      <div className='favorited'>
         {user && user ? (
         <div onClick={handleFavorites}>
           {isFavorited ? (
             <img style={{ height: 40, paddingLeft: 35 }} src={favorite} />
           ) : (
              <img style={{ height: 40, paddingLeft: 35 }} src={unfavorite} />
            )}     
          </div >
         ) : (
            <a href='/auth/google'>
             <img style={{ height: 30, paddingLeft: 35 }} src={unfavorite} />
           </a>
            
         )
         }
      </div>
  </div>
  )
}

