import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTwoWeekData } from '../actions/coinActions';
import CoinGecko from "coingecko-api";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';

const coinGeckoClient = new CoinGecko();


const Graph = ({coinId}) => {

    console.log('????', coinId)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTwoWeekData(coinId))
    }, [])

    

    // changeGraph()
    return (
        <div className='coin-graph-card'>
            {/* <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>Weekly Trend</h1>
            <ResponsiveContainer>
                <AreaChart data={points}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1" >
                            <stop offset='0%' stopColor='#2451b7' stopOpacity={0.4} />
                            <stop offset='75%' stopColor='#2451b7' stopOpacity={0.05} />
                        </linearGradient>
                    </defs>
                    <Area dataKey="value" stroke="#2451b7" fill="url(#color)" />
                    <XAxis dataKey="date"
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        dataKey="value"
                        axisLine={false}
                        tickLine={false}
                        tickCount={8}
                    />
                    <Tooltip />
                    <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
            </ResponsiveContainer> */}
        </div>
    )
}


export default Graph;
