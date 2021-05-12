import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { fetchData } from '../actions/coinActions.js';
import CoinGecko from "coingecko-api";
import unfavorite from '../images/unfavorite.png';
import favorite from '../images/favorite.png';
import { removeFavorite } from "../actions/favoriteActions.js";
const coinGeckoClient = new CoinGecko();

const Favorite = (props) => {
    const [coin, setCoin] = useState([]);
    const [isFavorited, setIsFavorited] = useState(true)

    const user = useSelector((state) => state.authReducer);
    // Helper function to turn number into percent
    const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

    // Helper funtion to turn number in to USD with sig fig
    const formatDollar = (number, maximumSignificantDigits) =>
        new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits,
        }).format(number);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const res = await coinGeckoClient.coins.fetch(props.coin.coinName, {});
            setCoin(res.data);
        }
        fetchData();
    }, []);

    const removeFavorites = (e) => {
        const form = {
          coinName: coin.id,
          _user: user._id,
        };
        
        dispatch(removeFavorite(coin.id, form));
        window.location.reload(true);
      };
    return (     
        <tr style={{fontWeight: 'bold'}} key={coin.id}>
            {coin.market_data && (
                <>
                    <td>
                        <img
                            src={coin.image.large}
                            style={{ width: 25, height: 25, marginRight: 10 }}
                        />
                        <a href={`/coin-profile/${coin.id}`} style={{ color: "black" }}>
                            {coin.symbol.toUpperCase()}
                        </a>
                        
                    </td>
                    <td style={{fontWeight: 'bold'}}> 
                        {coin && ( <span
                            className={
                                coin.price_change_percentage_24h > 0
                                ? "text-success"
                                : "text-danger"
                            }
                        >
                            {formatPercent(coin.market_data.price_change_percentage_24h)}
                        </span>
                        )}
                    </td>
                    <td style={{fontWeight: 'bold'}}>{formatDollar(coin.market_data.current_price.usd, 20)}</td>
                    <td style={{fontWeight: 'bold'}}>{formatDollar(coin.market_data.market_cap.usd, 12)}</td>
                    <td>
                        <img  style={{height: 30, paddingLeft: 35}} src={favorite} onClick={removeFavorites} />
                    </td>
                </>
            )}    
        </tr>
    )
}

export default Favorite