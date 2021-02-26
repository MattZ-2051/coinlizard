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
  }, [dispatch]);

  console.log("data", data);
  if (data === undefined || {}) return null;
  return (
    <>
      <div>
        <img src={data.image.large} alt="" />
        <h1>{data.id}</h1>
        <p>Symbol: {data.symbol}</p>
        <p>Market Cap Rank: {data.market_cap_rank}</p>
        <p>Date Created: {data.genesis_date}</p>
        <p>Developer Score: {data.developer_score}</p>
        <p>Community Score: {data.developer_score}</p>
        <p>Liquidity Score: {data.liquidity_score}</p>
        {data.description && <p>{data.description.en}</p>}
      </div>
    </>
  );
}
