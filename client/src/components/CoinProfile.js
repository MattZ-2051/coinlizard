import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { fetchData, fetchTwoWeekData } from "../actions/coinActions";
import { fetchUser } from '../actions/userActions.js';
import { addFavorite, getFavorites, removeFavorite } from "../actions/favoriteActions";
import { useDispatch, useSelector } from "react-redux";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';

import axios from "axios";
import CoinGecko from "coingecko-api";
import unfavorite from "../images/unfavorite.png";
import favorite from "../images/favorite.png";
import CanvasJSReact from "../canvasjs.react";
import Search from './Search';
import SidebarFavorite from './SidebarFavorite';
import "../styles/CoinProfile.css";
import home from '../images/home.png';
import Header from "./Header.js";
import Sidebar from './Sidebar'
const points = [];

const coinGeckoClient = new CoinGecko();

export default function CoinProfile() {
  const [showDevData, setShowDevData] = useState(true);
  const [showCommData, setShowCommData] = useState(true);
  const [coinData, setCoinData] = useState([]);
  const [favorited, setFavorited] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory()
  const data = useSelector((state) => state.coinReducer);
  const user = useSelector((state) => state.authReducer);
  const prices = useSelector((state) => state.coinReducer.prices);
  const favorites = useSelector(state => state.favoriteReducer);


  function getGraphData(array) {
    for (let i = 0; i < array.length; i++) {  
      if (i % 24 === 0) {
        const date = new Date(array[i][0]);
        points.push({
          date: date.toLocaleDateString("en-US"),
          value: array[i][1]
        });
      }
    }
  }

  useEffect(() => {
    async function fetchCoinData() {
      const params = {
        order: CoinGecko.ORDER.MARKET_CAP_DESC,
      };
      const result = await coinGeckoClient.coins.markets({ params });
      setCoinData(result.data);
    }
    dispatch(fetchUser())
    dispatch(fetchData(params.coinId));
    dispatch(fetchTwoWeekData(params.coinId));
    dispatch(getFavorites(user._id))
    fetchCoinData()
  }, [fetchData, fetchTwoWeekData]);

  useEffect(() => {
    if (prices) {
      getGraphData(prices);
    }
  }, [prices]);
  
  const isFavorited = (array, coin) => {
    for (let i = 0; i < array.length; i++) {
      let obj = array[i];
      if (obj[Object.keys(obj)[1]] === coin.id) {
        return true;
      }
    }
    return false;
  };

  const handleAddOrRemoveFavorites = (e) => {
    const form = {
      coinName: data.id,
      _user: user._id,
    };

    if (isFavorited(favorites, data) === false) {
      dispatch(addFavorite(form));
      window.location.reload(false);
    } else {
      dispatch(removeFavorite(data.id, form));
      window.location.reload(false);
    }
  };

  const handleClick = async (e) => {
    history.push(`/accounts/${user._id}`);
  };

  if (Object.keys(data).length === 0) return null;

  return (
    <div className='coin-profile-root'>
      <div className='coin-profile-sidebar'>
        <div className='sidebar-coin-id'>
          {data.image && <img className='id-image' src={data.image.large} alt="" />}
              <text style={{color: 'white'}}>
                {data.id}({data.symbol})
              </text>
        </div>
        <div className='home-and-favorited'>
          <a href='/home'>
            <img src={home} />
          </a>
          
          {isFavorited(favorites, data) ? (
            <img style={{ height: 50 }} onClick={handleAddOrRemoveFavorites} src={favorite} />
          ) : (
              <img style={{ height: 50 }} onClick={handleAddOrRemoveFavorites} src={unfavorite} />
          )}
        </div>
        <div className='sidebar-search'>
          <Search/>
        </div>
        {user ? (
          <>
            <div className='sidebar-profile-photo'>
              <>
                {user && (
                  <>
                    <img onClick={handleClick} style={{ width: '100px', height: '100px', borderRadius: '50%', }} src={user.profilePhoto} />
                  </>
                )}
              </>
            </div>
            <div className='sidebar-favorite-stats'>
              {coinData ? (
                coinData.map((coin) => {
                  return (
                    <SidebarFavorite
                      coin={coin}
                      key={coin.id}
                      isFavorited={isFavorited(favorites, coin)}
                    />
                  );
                })
                ) : (
                  <h1>Loading...</h1>
                )}
            </div>
            </>
        ) : (null)}
        
        
      </div>
      {/* <Sidebar /> */}
      <div className='coin-profile-main'>
        <div className='row-1'>  
          <div className='coin-hourly-change-card'>
            {data.market_data && (
              data.market_data.market_cap_change_percentage_24h > 0 ? (
                <text style={{ color: '#05E502' }}>+{data.market_data.market_cap_change_percentage_24h}%</text>
              ) : (
                  <text style={{ color: 'red' }}>{data.market_data.market_cap_change_percentage_24h}%</text>
              )
              
            )}
          </div>
          {data.market_data && (
            <div className='market-data-cards'>
              {data.market_data.total_supply ? (
                <div className='coin-market-data-card-1'>
                  {data.market_data.total_supply && (
                    <text className='dev-text'>
                      {`Total Supply: \n${data.market_data.total_supply}`}
                    </text>
                  )}
                </div>
              ) : (null)}
              {data.market_data.circulating_supply ? (
                <div className='coin-market-data-card-2'>
                  {data.market_data.circulating_supply && (
                    <text className='dev-text'>Circulating Supply: {parseInt(data.market_data.circulating_supply)}</text>
                  )}
              </div>
              ) : (null)}
                {data.market_data.max_supply ? (
                  <div className='coin-market-data-card-3'>        
                    {data.market_data.max_supply && (
                      <text className='dev-text'>Max Supply: {data.market_data.max_supply}</text>
                    )}
                  </div>
                ) : (null)}
            </div>
            )}
        </div>   
        <div className='row-2'>         
          <div className='coin-graph-card'>
            <h1 style={{display: 'flex', justifyContent:'center', color: 'white'}}>Weekly Trend</h1>
            <ResponsiveContainer>
              <AreaChart data={points}>
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1" >
                    <stop offset='0%' stopColor='#2451b7' stopOpacity={0.4} />
                    <stop offset='75%' stopColor='#2451b7' stopOpacity={0.05} />
                  </linearGradient>
                </defs>
               <Area dataKey="value" stroke="#2451b7" fill="url(#color)"/>
               <XAxis dataKey="date" 
                axisLine={false}
                tickLine={false}
               />
               <YAxis 
                  dataKey="value" 
                  axisLine={false} 
                  tickLine={false}
                  tickCount={8}
                  />
               <Tooltip />
               <CartesianGrid opacity={0.1} vertical={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        </div>
    </div>
  );
}
