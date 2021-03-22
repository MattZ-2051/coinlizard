import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../actions/userActions.js';
import { getFavorites, removeFavorite } from '../actions/favoriteActions';
import Coin from './Coin.js';
import Favorite from './Favorite';
import Header from './Header.js';

import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
    const user = useSelector(state => state.authReducer);
    const favorites = useSelector(state => state.favoriteReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser())
        dispatch(getFavorites(user._id))
    }, [dispatch]);

   
    return (
        <div style={{ paddingLeft: "50px", paddingRight: "50px", paddingTop: "10px" }}>
            <Header />
            {user && (
                <h2>Hi {user.name}, these are the cryptos on your watchlist:</h2>
            )}
            <table className="table">
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>24H Change</th>
                    <th>Price</th>
                    <th>Market cap</th>
                    <th>Favorited</th>
                </tr>
                </thead>
                <tbody>
                   {favorites && (
                        favorites.map((favorite) => (
                        <Favorite coin={favorite} key={favorite.coinName}/>
                    )))} 
                </tbody>
            </table>
            
        </div>
    )
}

export default UserProfile;