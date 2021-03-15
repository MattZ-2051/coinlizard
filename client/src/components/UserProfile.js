import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../actions/userActions.js';
import { getFavorites } from '../actions/favoriteActions';
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
        <>
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
                {/* {coinData ? (
                    coinData.map((coin) => {
                    return <Coin coin={coin} key={coin.id} />;
                    })
                ) : (
                    <h1>Loading...</h1>
                )} */}
                   {favorites && (
                        favorites.map((favorite) => (
                        <Favorite coin={favorite} key={favorite.coinName}/>
                    )))} 
                </tbody>
            </table>
            
        </>
    )
}

export default UserProfile;