import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import CoinProfile from "./components/CoinProfile";
import Header from './components/Header.js';
import UserProfile from './components/UserProfile.js';
import Landingpage from './components/Landingpage.js';

function App() {
  return (
    <BrowserRouter>
      
      <Route exact path="/" component={Landingpage} />
      {/* <Header /> */}
      <Route exact path='/accounts/:id' component={UserProfile} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/coin-profile/:coinId" component={CoinProfile} />
    </BrowserRouter>
  );
}

export default App;
