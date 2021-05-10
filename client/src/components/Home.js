import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CoinGecko from "coingecko-api";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Coin from "./Coin";
import Header from "./Header";
import Loading from "../components/Loading";
import unfavorite from "../images/unfavorite.png";
import favorite from "../images/favorite.png";
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
  const user = useSelector((state) => state.authReducer);
  const favorites = useSelector((state) => state.favoriteReducer);
  const dispatch = useDispatch();


  useEffect(() => {
    // function making calls to Coin Gecko API, results are ordered by market cap
    async function fetchData() {
      const params = {
        order: CoinGecko.ORDER.MARKET_CAP_DESC,
      };
      const result = await coinGeckoClient.coins.markets({ params });
      setCoinData(result.data);
    }
    dispatch(getFavorites(user._id));
    fetchData();
  }, []);

  const isFavorited = (array, coin) => {
   
    for (let i = 0; i < array.length; i++) {
      let obj = array[i];
      // console.log(coin, obj[Object.keys(obj)[1]])
      if (obj[Object.keys(obj)[1]] === coin) {
        console.log('here')
        return <img src={favorite} />;
      }
    }
    return <img src={unfavorite} />;
  };

  return (
    // <div style={{ paddingLeft: "50px", paddingRight: "50px", paddingTop: "10px" }}>
    //   <Header />
    //   <title>Coinmarketcap clone</title>
    //   <Loading />

    //   <table className="table">
    //     <thead>
    //       <tr>
    //         <th className="header" style={{color: 'white'}}>Symbol</th>
    //         <th className="header">24H Change</th>
    //         <th className="header">Price</th>
    //         <th className="header">Market cap</th>
    //         {user && (
    //           <th className="header">Favorited</th>
    //         )}
            
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {coinData ? (
    //         coinData.map((coin) => {
    //           return (
    //             <Coin
    //               coin={coin}
    //               key={coin.id}
    //               isFavorited={isFavorited(favorites, coin)}
    //             />
    //           );
    //         })
    //       ) : (
    //         <h1>Loading...</h1>
    //       )}
    //     </tbody>
    //   </table>
    // </div>
    <div className='home-root'>
      {/* <Header /> */}
      <div className='home-col-1'>

      </div>
      <div className='home-col-2'>
        {coinData.map((coin) => (
          <div className='coin-stats'>
  
              <div className='coin-stats-id'>
                <h1>{coin.id}</h1>
              </div>
              <div className='coin-stats-price'>
                <h1>{coin.current_price}</h1>
              </div>  
              <div className='coin-stats-24h-change'>
                <h1>{coin.market_cap_change_percentage_24h}</h1>
              </div>
              <div className='coin-stats-market-cap'>
                <h1>{coin.market_cap}</h1>
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
  );
}

export default Home;
