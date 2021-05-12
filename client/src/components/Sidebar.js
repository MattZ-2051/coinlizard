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
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const points = [];
const coinGeckoClient = new CoinGecko();


const Sidebar = () => {
    const [coinData, setCoinData] = useState([]);
    const [favorited, setFavorited] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory()
    const data = useSelector((state) => state.coinReducer);
    const user = useSelector((state) => state.authReducer);
    const prices = useSelector((state) => state.coinReducer.prices);
    const favorites = useSelector(state => state.favoriteReducer);

    useEffect(() => {
        async function fetchCoinData() {
            const params = {
                order: CoinGecko.ORDER.MARKET_CAP_DESC,
            };
            const result = await coinGeckoClient.coins.markets({ params });
            setCoinData(result.data);
        }
        dispatch(fetchUser())
        dispatch(getFavorites(user._id))
        fetchCoinData()
    }, [fetchData, fetchTwoWeekData]);

    useEffect(() => {

        async function isFavorites(array, coin) {
            for (let i = 0; i < array.length; i++) {
                let obj = array[i];
                if (obj[Object.keys(obj)[1]] === coin) {
                    setFavorited(true)
                    return
                }
            }
            setFavorited(false);
        }
        isFavorites(favorites, params.coinId);
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
    const handleFavorites = (e) => {
        const form = {
            coinName: data.id,
            _user: user._id,
        };

        if (favorited === false) {
            console.log('favorited')
            dispatch(addFavorite(form));
            window.location.reload(false);
        } else {
            console.log('unfavorited')
            dispatch(removeFavorite(data.id, form));
            window.location.reload(false);
        }
    };
    return (
        <div className='coin-profile-sidebar'>
            <div className='sidebar-coin-id'>
                {data.image && <img className='id-image' src={data.image.large} alt="" />}
                <text style={{ color: 'white' }}>
                    {data.id}({data.symbol})
              </text>
            </div>
            <div className='home-and-favorited'>
                <img src={home} />
                {favorited ? (
                    <img onClick={handleFavorites} src={favorite} />
                ) : (
                    <img onClick={handleFavorites} src={unfavorite} />
                )}
            </div>
            <div className='sidebar-search'>
                <Search />
            </div>
            {user ? (
                <>
                    <div className='sidebar-profile-photo'>
                        <>
                            {user && (
                                <>
                                    <img style={{ width: '100px', height: '100px', borderRadius: '50%', }} src={user.profilePhoto} />
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
    )
}

export default Sidebar