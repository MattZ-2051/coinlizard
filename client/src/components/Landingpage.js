import React from 'react';
import { useHistory } from "react-router-dom";
import lizard from '../images/lizard.png';
import coin from '../images/coin.png';
import google from '../images/google.png';
import '../styles/landingpage.css';

const Landingpage = () => {
    const history = useHistory();

    const toHome = () => {
        history.push('/home')
    }

    const loginWithGoogle = () => {
        history.push('/auth/google')
    }

    return (
        <div className='landing-main'>
            <div className='landing-col-1'>

            </div>
            <div className='landing-col-2'>
                <div className="landing-button-coin">
                    <img style={{ height: '50px' }} src={coin} />
                </div>
                <div className='landing-button-1'>
                    <button className='btn' onClick={toHome}>
                        Enter site
                    </button>
                </div>

                <div className="landing-button-google">
                    <img style={{ height: '50px' }} src={google} />
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