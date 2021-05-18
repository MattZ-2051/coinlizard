import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from '../actions/userActions.js';
import { useParams, useHistory } from "react-router-dom";
import { fetchData, fetchTwoWeekData } from "../actions/coinActions";
import LoggedInSidebar from './LoggedInSidebar';
import LoggedOutSidebar from './LoggedOutSidebar';
import CoinGecko from "coingecko-api";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Crypto from "./Coin";
import Header from "./Header";
import Loading from "../components/Loading";
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

function Home() {
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
  }, [getFavorites]);

  const isFavorited = (array, coin) => { // function for determining whether a user has favorited a crypto
    for (let i = 0; i < array.length; i++) {
      let obj = array[i];
      if (obj[Object.keys(obj)[1]] === coin.id) {
        return true
      }
    }
    return false
  };
  console.log(coinData)
  return (
    <div className='home-root'>
      {user ? (
        <LoggedInSidebar />
      ) : (
        <LoggedOutSidebar />
      )}
       
        <div className='home-col-2'>
          <div className='home-headers'>
            <h3 className="header">Name</h3>
            <h3 className="header">Price</h3>
            <h3 className="header">24h Change</h3>
            <h3 className="header">Market Cap</h3>
            {user ? (
              <h3 className="header">Favorited</h3>
            ) : (
              <h3 className="header">Favorited</h3>
            )}
            
          </div>
          
          {coinData.map((coin) => (
            <Crypto  
              coin={coin}
              key={coin.id}
              isFavorited={isFavorited(favorites, coin)}
            />
          ))}
          
        </div>
        <div className='home-col-3'>
      
        </div>
    </div>
  );
}

export default Home;
