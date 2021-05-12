import React, {useState} from 'react';
import CoinGecko from "coingecko-api";
import { useSelector, useDispatch } from "react-redux";
import {
    getFavorites,
    addFavorite,
    removeFavorite,
} from "../actions/favoriteActions.js";
import '../styles/sidebar-favorite.css';
const coinGeckoClient = new CoinGecko();

const SidebarFavorite = ({ coin, isFavorited }) => {

    return (

        <div className='sidebar-favorite-root'>
            {isFavorited ? (
                <>
                    <div className='symbol'>
                        <img className='photo'src={coin.image}/>
                    </div>
                    <div className='price-change'>
                        {coin.market_cap_change_percentage_24h > 0 ? (
                            <h4 style={{ color: '#05E502' }}>+{coin.market_cap_change_percentage_24h}</h4>
                                ) : (
                            <h4 style={{ color: 'red' }}>{coin.market_cap_change_percentage_24h}</h4>
                        )}
                    </div>
                </>
            ) : (
                null
                )
              }
        </div>
        
    )
}

export default SidebarFavorite;