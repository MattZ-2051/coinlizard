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
      <div>
        <a href="/">Home Page</a>
        <img src={data.image.large} alt="" />
        <h1>
          {data.id}({data.symbol})
        </h1>
        <p>Symbol: {data.symbol}</p>
        <p>Market Cap Rank: {data.market_cap_rank}</p>
        <p>Date Created: {data.genesis_date}</p>
        <p>Developer Score: {data.developer_score}</p>
        <p>Community Score: {data.developer_score}</p>
        <p>Liquidity Score: {data.liquidity_score}</p>
        <p>Total Supply: {data.total_supply}</p>
        <p>Max Supply: {data.max_supply}</p>
        <p>Circulating Supply: {data.circulating_supply}</p>
        {data.description && <p>{data.description.en}</p>}
      </div>
    </>
  );
}
