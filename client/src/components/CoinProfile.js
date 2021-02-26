import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../actions/coinActions";
import { useDispatch, useSelector } from "react-redux";

export default function CoinProfile() {
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.coinReducer);
  console.log(data);

  useEffect(() => {
    dispatch(fetchData(params.coinId));
  }, [dispatch]);

  return (
    <>
      <h1>{data.id}</h1>
      {data.description && <p>{data.description.en}</p>}
    </>
  );
}
