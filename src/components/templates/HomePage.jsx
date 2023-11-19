import React, { useEffect, useState } from 'react';
// Function
import { coinsReq } from '../../services/apiReq';
// Module
import CoinsTable from '../modules/CoinsTable';
import Pagination from '../modules/Pagination';
import SearchBox from '../modules/SearchBox';
import Chart from '../modules/Chart';




const HomePage = () => {
    const [coins , setCoins] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [page , setPage] = useState(1);
    const [currency , setCurrency] = useState("usd");
    const [chart , setChart] = useState(null);

    useEffect(()=>{
            setIsLoading(true);
        const fetchData = async () => {
            try {
                const res = await fetch(coinsReq(page , currency));
                const json = await res.json();
                setCoins(json);
                setIsLoading(false)
                
            } catch (error) {
                console.log(error);
            }
            
        };

        fetchData()
        
    },[page , currency])
    return (
        <div>
            <SearchBox currency={currency} setCurrency={setCurrency} />
            <CoinsTable coins={coins} isLoading={isLoading} setChart={setChart} />
           <Pagination page={page} setPage={setPage} />
            { !!chart && <Chart chart={chart} setChart={setChart} />}
         
        </div>
    );
};

export default HomePage;