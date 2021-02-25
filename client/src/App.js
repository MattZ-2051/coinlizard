import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import CoinProfile from "./components/CoinProfile";
import Header from './components/Header.js';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/coin-profile/:coinId" component={CoinProfile} />
    </BrowserRouter>
  );
}

export default App;
