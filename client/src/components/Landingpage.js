import React from 'react';
import lizard from '../images/lizard.png';
import coin from '../images/coin.png';
import google from '../images/google.png';
import '../styles/landingpage.css';

const Landingpage = () => {
    return (
        <div className='landing-main'>
            <div className='landing-col-1'>

            </div>
            <div className='landing-col-2'>
                <a href="/home" className="landing-button-coin">
                    <img style={{height: '50px'}}src={coin} />
                </a>
                <h2>Enter site</h2>
                <a href="/home" className="landing-button-google">
                    <img style={{height: '50px'}}src={google} />
                </a>
                <h2>Login with Google</h2>
            </div>
            <div className='landing-col-3'>
                <div className='image-div'>
                    <img className='landing-lizard' src={lizard}/>
                </div>
            </div>
        </div>
    )
}

export default Landingpage