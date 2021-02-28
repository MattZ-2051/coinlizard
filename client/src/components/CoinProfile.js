import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../actions/coinActions";
import { useDispatch, useSelector } from "react-redux";

export default function CoinProfile() {
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.coinReducer);
  const [showDevData, setShowDevData] = useState(true);
  const [showCommData, setShowCommData] = useState(true);

  useEffect(() => {
    dispatch(fetchData(params.coinId));
  }, [params]);

  const handleClick = (e) => {
    if (e.target.id === "dev-data") {
      setShowDevData(!showDevData);
    } else if (e.target.id === "comm-data") {
      setShowCommData(!showCommData);
    }
  };

  if (Object.keys(data).length === 0) return null;
  return (
    <>
      <a href="/">Home Page</a>

      <div style={{ display: "flex" }}>
        <div>
          <img src={data.image.large} alt="" />
          <h1>
            {data.id}({data.symbol})
          </h1>
        </div>
        <div>
          <h5>Market Cap Rank: {data.market_cap_rank}</h5>
          <h5>Date Created: {data.genesis_date}</h5>
          <h5>Total Supply: {data.total_supply}</h5>
          <h5>Max Supply: {data.max_supply}</h5>
          <h5>Circulating Supply: {data.circulating_supply}</h5>
        </div>
        {/* Developer stats from coin gecko */}
        <div onClick={handleClick}>
          {showDevData ? (
            <h3 id="dev-data">Show Dev Data</h3>
          ) : (
            <div>
              <h3 id="dev-data">Developer Data</h3>
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
            <h3 id="comm-data">Show Comm Data</h3>
          ) : (
            <div>
              <h3 id="comm-data">Community Data</h3>
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
      </div>

      {data.description && <p>{data.description.en}</p>}
    </>
  );
}
