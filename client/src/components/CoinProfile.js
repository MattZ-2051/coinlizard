import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData, fetchTwoWeekData } from "../actions/coinActions";
import { useDispatch, useSelector } from "react-redux";
import CanvasJSReact from '../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const points = [];

export default function CoinProfile() {
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.coinReducer);
  const prices = useSelector((state) => state.coinReducer.prices)

  function getGraphData(array) {
    for (let i = 0; i < array.length; i++) {
      if (i % 24 === 0) {
        const date = new Date(array[i][0])
        // console.log(date.toLocaleDateString('en-US'));
        points.push({ x: new Date(date.toLocaleDateString('en-US')), y:array[i][1] })
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
      //console.log(points)
    }
  }, [prices])


  const options = {
    title: {
      text: `Stock price of ${params.coinId}`
    },
    axisY: {
      title: "Price in USD",
      prefix: "$"
    },
    data: [{				
              type: "line",
              xValueFormatString: 'MMM YYYY',
              yValueFormatString: "$#,##0.000",
              dataPoints: points
     }]
  }
  
  return (
    <>
      <h1>{data.id}</h1>
      {data.description && <p>{data.description.en}</p>}

      <div>
        <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
        />
      </div>
    </>
  );
}
