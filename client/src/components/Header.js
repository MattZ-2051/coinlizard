import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../actions/userActions.js';

import { connect } from 'react-redux';

const Header = () => {
    const user = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch]);

    console.log(user)
    console.log()
    return (
        <>
            <h2>Header</h2>
            {user ? ( 
                <div>
                    <a href='/api/logout'>Logout</a>
                </div>
            ) : (
                <div>
                    <a href='/auth/google'>Login With Google</a>
                </div> 
            )}
            
            
        </>
    )
}

export default Header;