import React from 'react';

import chartDown from "../../assets/chart-down.svg";
import chartUp from "../../assets/chart-up.svg";

import styles from "./CoinsTable.module.css"
import { RotatingLines } from 'react-loader-spinner';
import { marketChart } from '../../services/apiReq';

const CoinsTable = ({coins , isLoading , setChart}) => {
    
    return (
        <div className={styles.container}>
            {isLoading ?
            (<RotatingLines  strokeColor="grey" strokeWidth="4"  /> ) :       
              
            
            (
                <table>
                <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h</th>
                        <th>Total Volume</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin)=> 
                    <TableRow key={coin.id} coin={coin} setChart={setChart} />
                    )}
                </tbody>
            </table>
            )
            }
        </div>
    );
};

export default CoinsTable;

const TableRow = ({ coin ,   setChart}) => {
    const {id,
        name , 
        image , 
        symbol , 
        total_volume , 
        current_price , 
        price_change_percentage_24h : price_change,
    } = coin ;
    const showHandler = async () => {
        try {
            const res = await fetch(marketChart(id));
            const json = await res.json();
            
            setChart({...json, coin});
        } catch (error) {
            setChart(null)
        }
    }
    return (
        <tr>
        <td>
            <div className={styles.coin_logo} onClick={showHandler}>
                <img src={image} alt={symbol} />
                <p>{symbol.toUpperCase()}</p>
            </div>
        </td>
        <td>{name}</td>
        <td>$ {current_price.toLocaleString()}</td>
        <td>{price_change.toFixed(2)} %</td>
        <td>$ {total_volume.toLocaleString()}</td>
        <td>
            <img 
            src={
                price_change > 0 ? chartUp :  chartDown                              
                } 
            alt="chart" />
        </td>
    </tr>
    )
}