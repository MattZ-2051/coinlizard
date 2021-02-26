import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../actions/userActions.js';


const UserProfile = () => {
    const user = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch]);

    return (
        <>
            {user && (
                <h1>{user.name}</h1>
            )}
        </>
    )
}

export default UserProfile;