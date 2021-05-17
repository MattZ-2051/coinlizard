import { favoriteConstant } from "../constants/favoriteConstant";
import axios from "axios";

export const addFavorite = (form) => async(dispatch) => {

    const res = await axios.post('/api/favorites', form);
    
}

export const removeFavorite = (coinId, form) => async(dispatch) => {

    const res = await axios.delete(`/api/favorites/delete/${coinId}`, form);
    
}

export const getFavorites = (userId) => async(dispatch) => {
    const res = await axios.get(`/api/favorites/${userId}`);

    if (res.status === 200) {
        dispatch({ type: favoriteConstant.FETCH_FAVORITE_DATA, payload: res.data });
    }
}