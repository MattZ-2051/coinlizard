import { favoriteConstant } from "../constants/favoriteConstant";
import axios from "axios";

export const addFavorite = (form) => async(dispatch) => {
    console.log('hellooooooooo', form)
    const res = await axios.post('/api/favorites', form);
    
    // console.log('im here', res)
    // if (res.ok) {
    //   dispatch({ type: favoriteConstant.FETCH_FAVORITE_DATA, payload: res.data })
    // }
  }


export const getFavorites = (userId) => async(dispatch) => {
    const res = await axios.get(`/api/favorites/${userId}`);

    
    if (res.status === 200) {
        console.log('=====', res.data)
        dispatch({ type: favoriteConstant.FETCH_FAVORITE_DATA, payload: res.data });
    }
}