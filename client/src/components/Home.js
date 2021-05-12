import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from '../actions/userActions.js';
import { useParams, useHistory } from "react-router-dom";
import { fetchData, fetchTwoWeekData } from "../actions/coinActions";
import CoinGecko from "coingecko-api";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Coin from "./Coin";
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

    // async function isFavorites(array, coin) {
    //   for (let i = 0; i < array.length; i++) {
    //     let obj = array[i];
    //     if (obj[Object.keys(obj)[1]] === coin) {
    //       setFavorited(true)
    //       return
    //     }
    //   }
    //   setFavorited(false);
    // }
    // isFavorites(favorites, params.coinId);

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
    <>
      <div className='home-root'>
        <div className='home-col-1'>
          <div className='home-profile-photo'>
            <>
              {user && (
                  <img style={{ width: '100px', height: '100px', borderRadius: '50%', }} src={user.profilePhoto} />
              )}
            </>
          </div>
          <div className='home-search'>
            <Search />
          </div>
              {user ? (
                  <div className='home-user-favorites'>
                    {coinData ? (
                      coinData.map((coin) => {
                        return (
                          <SidebarFavorite
                            coin={coin}
                            key={coin.id}
                            isFavorited={test(favorites, coin)}
                          />
                        )
                      })
                    ) : (
                      <h1>Loading...</h1>
                    )}
                    </div>
              ) : (null)}
        </div>
        <div className='home-col-2'>
          {coinData.map((coin) => (
            <div className='coin-stats'>
    
                <div className='coin-stats-id size'>
                <a href={`/coin-profile/${coin.id}`}>
                    <text>{coin.id}</text>
                </a>
                  
                </div>
                <div className='coin-stats-price size'>
                  <text>{coin.current_price}</text>
                </div>  
                <div className='coin-stats-24h-change size'>
                  <text>{coin.market_cap_change_percentage_24h}</text>
                </div>
                <div className='coin-stats-market-cap size'>
                  <text>{coin.market_cap}</text>
                </div>
                <div className='favorited'>
                  {/* {isFavorited((favorites, coin.id) ? (
                    <img src={favorite} />
                  ) : (
                    <img src={unfavorite} />
                  ))}  */}
                  <h1>{isFavorited(favorites, coin.id)}</h1>
                </div>
            </div>
          ))}
          
          {/* 
          <div className='home-col-2-24h-change'>
            {coinData.map((coin) => (
              <h1>{coin.market_cap_change_percentage_24h}</h1>
            ))}
          </div>
          <div className='home-col-2-price'>
            {coinData.map((coin) => (
              <h1>{coin.current_price}</h1>
            ))}
          </div>
          <div className='home-col-2-market-cap'>
            {coinData.map((coin) => (
              <h1>{coin.market_cap}</h1>
            ))}
          </div>
          <div className='home-col-2-favorited'>
            {coinData.map((coin) => (
              isFavorited(favorites, coin.id) ? (
                <img src={favorite} />
              ) : (
                <img src={unfavorite} />
              )
            ))}
          </div> */}
        </div>
        <div className='home-col-3'>
      
        </div>
        
      </div>
      <div className='footer'>
          
      </div>
    </>
  );
}

export default Home;
