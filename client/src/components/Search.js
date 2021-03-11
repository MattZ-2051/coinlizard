import React, { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useHistory } from "react-router-dom";
import CoinGecko from "coingecko-api";

const coinGeckoClient = new CoinGecko();


const Search = () => {
    const [coinData, setCoinData] = useState([]);
    const history = useHistory()

    useEffect(() => {
        // function making calls to Coin Gecko API, results are ordered by market cap
        async function fetchData() {
            const params = {
                order: CoinGecko.ORDER.MARKET_CAP_DESC,
            };
            const result = await coinGeckoClient.coins.markets({ params });
            setCoinData(result.data)
        }
        fetchData();
    }, []);

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
        // return (
        //     <a href={`/coin-profile/${results.id}`}className='header'>
        //         {results.id}
        //     </a>
        
        // )
    }

    const handleOnSelect = (item) => {
        // the item selected
        history.push(`/coin-profile/${item.id}`);
        window.location.reload(false);
    }
    
    return (
        <div style={{width: '100%'}}>
            <ReactSearchAutocomplete
                items={coinData}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                autoFocus
                styling={{fontWeight: 'bold'}}
                placeholder={'Search for a currency'}
            />
        </div>
    )
}

export default Search;