import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../actions/userActions.js";
import { NavLink, useHistory } from "react-router-dom";
import profileIcon from "../images/profile.png";
import logoutIcon from "../images/logout.png";
import logo from '../images/logo.png';
import "../styles/header.css";

const Header = () => {
  const user = useSelector((state) => state.authReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleClick = async (e) => {
    history.push(`/accounts/${user._id}`);
  };

  return (
    <div className="main">
      <div className="header-main">
        <div className="column-1">
            <a href='/'>
                <img className='logo' src={logo}></img>
            </a>
          
        </div>
        <div className="column-2"></div>
        <div className="column-3">
          {user ? (
            <>
              <img
                className="icons"
                src={profileIcon}
                onClick={handleClick}
              ></img>
              <a href="/api/logout">
                <img className="icons" src={logoutIcon} />
              </a>
            </>
          ) : (
            <div>
              <a style={{color: 'black'}} href="/auth/google">Login With Google</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
