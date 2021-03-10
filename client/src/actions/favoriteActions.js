import { favoriteConstant } from "../constants/favoriteConstant";
import axios from "axios";

export const addFavorite = (form) => async(dispatch) => {
    // console.log('this is the form', form)
    const res = await axios.post('/api/favorites', form);
}

export const removeFavorite = (coinId, form) => async(dispatch) => {
    console.log('==============', coinId, form)
    const res = await axios.delete(`/api/favorites/delete/${coinId}`, form);
    // if (res.status === 200) {
    //     dispatch({ type: favoriteConstant.FETCH_FAVORITE_DATA, payload: res.data });
    // }
}

export const getFavorites = (userId) => async(dispatch) => {
    const res = await axios.get(`/api/favorites/${userId}`);

    if (res.status === 200) {
        dispatch({ type: favoriteConstant.FETCH_FAVORITE_DATA, payload: res.data });
    }
}