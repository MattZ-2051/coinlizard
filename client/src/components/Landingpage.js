import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTwoWeekData } from '../actions/coinActions';
import lizard from '../images/lizard.png';
import coin from '../images/coin.png';
import google from '../images/google.png';
import CoinGecko from "coingecko-api";
import '../styles/landingpage.css';
import Graph from './Graph';


const coinGeckoClient = new CoinGecko();

const array = ['bitcoin', 'ethereum', 'dogecoin']

const Landingpage = () => {
    // const [coinData, setCoinData] = useState([]);
    const [coin, setCoin] = useState('')
    const history = useHistory();
    const dispatch = useDispatch()
    
    const toHome = () => {
        history.push('/home')
    }

    const loginWithGoogle = () => {
        history.push('/auth/google')
    }

    const changeGraph = (array) => {
        let i = 0
        setInterval(() => {
            if (i !== array.length) {
                setCoin(array[i])
            } else {
                i = 0
                setCoin(array[i])
            }
            
            i++
        }, 1000)
        
    }

    //changeGraph(array)
    
    return (
        <div className='landing-main'>
            <div className='landing-col-1'>
                <Graph 
                    coinId={coin}
                />
            </div>
            <div className='landing-col-2'>
                <div className='landing-button-1'>
                    <button className='btn' onClick={toHome}>
                        Enter site
                    </button>
                </div>
                <div className='landing-button-2'>
                    <a className='btn' href='/auth/google'>
                        Login with Google
                    </a>
                </div>
            </div>
            <div className='landing-col-3'>
                <div className='image-div'>
                    <img className='landing-lizard' src={lizard} />
                </div>
            </div>
        </div>
    )
}

export default Landingpage