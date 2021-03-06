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

function LoggedOutSidebar() {
    const [coinData, setCoinData] = useState([]);
    const [favorited, setFavorited] = useState(false);
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
            if (obj[Object.keys(obj)[1]] === coin) {
                return <img src={favorite} />;
            }
        }
        return <img src={unfavorite} />;
    };

    const test = (array, coin) => {

        for (let i = 0; i < array.length; i++) {
            let obj = array[i];
            console.log('im hereeeee', coin)
            if (obj[Object.keys(obj)[1]] === coin.id) {
                return true
            }
        }
        return false
    };


    console.log('favorites', favorites)
    return (
        <div className='home-col-1'>
            <div className='home-profile-photo'>
                <div className='landing-button-2'>
                    <a className='btn' href='/auth/google'>
                        Login with Google
                    </a>
                </div>
            </div>
            <div className='home-search'>
                <Search />
            </div>
        </div>
    )
}

export default LoggedOutSidebar