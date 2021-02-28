import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../actions/coinActions";
import { useDispatch, useSelector } from "react-redux";

export default function CoinProfile() {
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.coinReducer);

  useEffect(() => {
    dispatch(fetchData(params.coinId));
  }, [params]);

  if (Object.keys(data).length === 0) return null;
  console.log("data", data);
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
        <div>
          <h3>Developer Data</h3>
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
        <div>
          <h3>Community Data</h3>
          <h5>Facebook Likes: {data.community_data.facebook_likes}</h5>
          <h5>Twitter Followers: {data.community_data.twitter_followers}</h5>
          <h5>
            Reddit average posts 48h:{" "}
            {data.community_data.reddit_average_posts_48h}
          </h5>
        </div>
      </div>

      {data.description && <p>{data.description.en}</p>}
    </>
  );
}
