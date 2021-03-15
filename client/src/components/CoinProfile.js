import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData, fetchTwoWeekData } from "../actions/coinActions";
import { addFavorite } from "../actions/favoriteActions";
import { useDispatch, useSelector } from "react-redux";
import unfavorite from "../images/unfavorite.png";
import CanvasJSReact from "../canvasjs.react";
import "../styles/CoinProfile.css";
import Header from "./Header.js";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const points = [];

export default function CoinProfile() {
  const [showDevData, setShowDevData] = useState(true);
  const [showCommData, setShowCommData] = useState(true);
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.coinReducer);
  const user = useSelector((state) => state.authReducer);
  const prices = useSelector((state) => state.coinReducer.prices);

  function getGraphData(array) {
    for (let i = 0; i < array.length; i++) {
      if (i % 24 === 0) {
        const date = new Date(array[i][0]);
        points.push({
          x: new Date(date.toLocaleDateString("en-US")),
          y: array[i][1],
        });
      }
    }
  }
  useEffect(() => {
    dispatch(fetchData(params.coinId));
    dispatch(fetchTwoWeekData(params.coinId));
  }, [dispatch]);

  useEffect(() => {
    if (prices) {
      getGraphData(prices);
    }
  }, [prices]);

  const options = {
    title: {
      text: `Stock price of ${params.coinId}`,
    },
    axisY: {
      title: "Price in USD",
      prefix: "$",
    },
    data: [
      {
        type: "line",
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "$#,##0.000",
        dataPoints: points,
      },
    ],
  };

  const handleClick = (e) => {
    if (e.target.id === "dev-data") {
      setShowDevData(!showDevData);
    } else if (e.target.id === "comm-data") {
      setShowCommData(!showCommData);
    }
  };

  const addToFavorites = (e) => {
    e.preventDefault();

    const form = {
      coinName: data.id,
      _user: user._id,
    };
    dispatch(addFavorite(form));
  };

  if (Object.keys(data).length === 0) return null;
  console.log(data.market_data);
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <div>
          {data.image && <img src={data.image.large} alt="" />}
          <h1>
            {data.id}({data.symbol})
          </h1>
        </div>
        <div>
          <h5>Market Cap Rank: {data.market_cap_rank}</h5>
          <h5>Date Created: {data.genesis_date}</h5>
          {data.market_data && (
            <>
              <h5>Total Supply: {data.market_data.total_supply}</h5>
              <h5>Max Supply: {data.market_data.max_supply}</h5>
              <h5>Circulating Supply: {data.market_data.circulating_supply}</h5>
            </>
          )}
        </div>
        {/* Developer stats from coin gecko */}
        <div onClick={handleClick}>
          {showDevData ? (
            <button className="stats" id="dev-data">
              Show Dev Data
            </button>
          ) : (
            <div>
              <button className="stats" id="dev-data">
                Close Developer Data
              </button>
              <h5>Forks: {data.developer_data.forks}</h5>
              <h5>Stars: {data.developer_data.stars}</h5>
              <h5>Subscribers: {data.developer_data.subscribers}</h5>
              <h5>Total Issues: {data.developer_data.total_issues}</h5>
              <h5>Closed Issues: {data.developer_data.closed_issues}</h5>
              <h5>Total Issues: {data.developer_data.total_issues}</h5>
              <h5>
                Pull Request Merged: {data.developer_data.pull_requests_merged}
              </h5>
              <h5>
                Commit Count 4-weeks: {data.developer_data.commit_count_4_weeks}
              </h5>
            </div>
          )}
        </div>
        <div onClick={handleClick}>
          {showCommData ? (
            <button className="stats" id="comm-data">
              Show Comm Data
            </button>
          ) : (
            <div>
              <button className="stats" id="comm-data">
                Close Community Data
              </button>
              <h5>Facebook Likes: {data.community_data.facebook_likes}</h5>
              <h5>
                Twitter Followers: {data.community_data.twitter_followers}
              </h5>
              <h5>
                Reddit average posts 48h:
                {data.community_data.reddit_average_posts_48h}
              </h5>
              <h5>
                Reddit average comments 48h:
                {data.community_data.reddit_average_comments_48h}
              </h5>
              <h5>
                Reddit Subscribers:
                {data.community_data.reddit_subscribers}
              </h5>
              <h5>
                Telegram Channel User Count:{" "}
                {data.community_data.telegram_channel_user_count}
              </h5>
            </div>
          )}
        </div>

        {data.market_data && (
          <>
            <h2>{data.market_data.current_price.usd}</h2>
            <h2>{data.market_data.price_change_percentage_24h}</h2>
          </>
        )}
      </div>
      <img
        onClick={addToFavorites}
        style={{ height: 30, paddingLeft: 35 }}
        src={unfavorite}
      />
      {data.description && (
        <p dangerouslySetInnerHTML={{ __html: data.description.en }}></p>
      )}

      <div>
        <CanvasJSChart
          options={options}
          /* onRef = {ref => this.chart = ref} */
        />
      </div>
    </>
  );
}
