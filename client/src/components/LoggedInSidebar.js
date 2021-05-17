import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from '../actions/userActions.js';
import { useParams, useHistory } from "react-router-dom";
import { fetchData, fetchTwoWeekData } from "../actions/coinActions";
import CoinGecko from "coingecko-api";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import unfavorite from "../images/unfavorite.png";
import favorite from "../images/favorite.png";
import SidebarFavorite from './SidebarFavorite';
import Search from './Search';
import {
    getFavorites,
    addFavorite,
    removeFavorite,
} from "../actions/favoriteActions.js";
import "../styles/homePage.css";
// instance of CoinGecko client to use for api calls
const coinGeckoClient = new CoinGecko();

function LoggedInSidebar() {
    const [coinData, setCoinData] = useState([]);
    const user = useSelector((state) => state.authReducer);
    const favorites = useSelector((state) => state.favoriteReducer);
    const dispatch = useDispatch();
    const params = useParams();


    useEffect(() => {
        // function making calls to Coin Gecko API, results are ordered by market cap
        async function fetchData() {
            const params = {
                order: CoinGecko.ORDER.MARKET_CAP_DESC,
            };
            const result = await coinGeckoClient.coins.markets({ params });
            setCoinData(result.data);
        }
        dispatch(fetchUser())
        dispatch(getFavorites(user._id));
        fetchData();
    }, [fetchData, fetchTwoWeekData]);

    const isFavorited = (array, coin) => {

        for (let i = 0; i < array.length; i++) {
            let obj = array[i];
            if (obj[Object.keys(obj)[1]] === coin.id) {
                return true
            }
        }
        return false
    };

    return ( 
        <div className='home-col-1'>
            <div className='home-profile-photo'>
                <>
                    {user && (
                        <a href="/api/logout">
                            <img style={{ width: '100px', height: '100px', borderRadius: '50%', }} src={user.profilePhoto} />
                        </a>
                    )}
                </>
            </div>
            <div className='home-search'>
                <Search />
            </div>
            <div className='home-sidebar-header'>
                <h3 className='favorites-header'>Favorites</h3>
            </div>
            {user ? (
                <div className='home-user-favorites'>
                    {coinData ? (
                        coinData.map((coin) => {
                            return (
                                <SidebarFavorite
                                    coin={coin}
                                    key={coin.id}
                                    isFavorited={isFavorited(favorites, coin)}
                                />
                            )
                        })
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </div>
            ) : (null)}
        </div>
    )
}

export default LoggedInSidebar