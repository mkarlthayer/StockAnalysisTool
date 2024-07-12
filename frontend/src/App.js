import './App.css';
import React, { useState, useEffect } from 'react'; 
import axios from "axios"; 

import BarChart from './BarChart'
import LineChart from './LineChart';

function App() { 
  const [allStocks, setAllStocks] = useState([{
    "symbol": "NVDA",
    "data": {
    "Description": "Nvidia Corporation is an American multinational technology company incorporated in Delaware and based in Santa Clara, California. It designs graphics processing units (GPUs) for the gaming and professional markets, as well as system on a chip units (SoCs) for the mobile computing and automotive market.",
    "Exchange": "NASDAQ",
    "Country": "USA",
    "Sector": "MANUFACTURING",
    "Industry": "SEMICONDUCTORS & RELATED DEVICES",
    "LatestQuarter": "2024-04-30",
    "PERatio": "73.58",
    "PEGRatio": "1.501",
    "DividendPerShare": "0.016",
    "EPS": "1.71",
    "Beta": "1.68",
    "SharesOutstanding": "24598301000",
    "yearsOfData": 4,
    "dateYear0": "2024-01-28",
    "netIncomeYear0": "29760000000",
    "totalRevenueYear0": "60922000000",
    "totalAssetsYear0": "65728000000",
    "totalLiabilitiesYear0": "22750000000",
    "longTermDebtYear0": "9709000000",
    "totalEquityYear0": "42978000000",
    "operatingCashflowYear0": "28090000000",
    "dateYear1": "2023-01-29",
    "netIncomeYear1": "4368000000",
    "totalRevenueYear1": "26974000000",
    "totalAssetsYear1": "41182000000",
    "totalLiabilitiesYear1": "19081000000",
    "longTermDebtYear1": "10953000000",
    "totalEquityYear1": "22101000000",
    "operatingCashflowYear1": "5641000000",
    "dateYear2": "2022-01-30",
    "netIncomeYear2": "9752000000",
    "totalRevenueYear2": "26914000000",
    "totalAssetsYear2": "44187000000",
    "totalLiabilitiesYear2": "17575000000",
    "longTermDebtYear2": "10946000000",
    "totalEquityYear2": "26612000000",
    "operatingCashflowYear2": "9108000000",
    "dateYear3": "2021-01-31",
    "netIncomeYear3": "4332000000",
    "totalRevenueYear3": "16675000000",
    "totalAssetsYear3": "28791000000",
    "totalLiabilitiesYear3": "11898000000",
    "longTermDebtYear3": "6963000000",
    "totalEquityYear3": "16893000000",
    "operatingCashflowYear3": "5822000000",
    "dateYear4": "2020-01-26",
    "netIncomeYear4": "2796000000",
    "totalRevenueYear4": "10918000000",
    "totalAssetsYear4": "17315000000",
    "totalLiabilitiesYear4": "5111000000",
    "longTermDebtYear4": "1991000000",
    "totalEquityYear4": "12204000000",
    "operatingCashflowYear4": "4761000000"
    }
}])
  const [input, setInput] = useState('')
  const [submit, setSubmit] = useState('NVDA')

  const apiURL = process.env.REACT_APP_API_URL

  useEffect(() => {
    axios.get(apiURL) 
    .then(res => { 
        setAllStocks(res.data)
    }) 
    .catch(err => {}) 


  },[]);

  //show user typing
  const handleChange = (event) => {
    setInput(event.target.value)
  }

  //on submit check if stock is in existing database or update database with new stock
  const handleSubmit = (event) => {
    event.preventDefault()

    if (allStocks.some(stock => stock.symbol === input.toUpperCase())) {
      setSubmit(input.toUpperCase())
    } else {
      axios.post(apiURL, { symbol: input.toUpperCase() })
      .then((res) => {
        setAllStocks(exisistingStocks => [...exisistingStocks, res.data])
        setSubmit(input.toUpperCase())
      }) 
      .catch((err) => {}); 
    }

  }
  
  //variable for stock being analyzed
  let selectedStock = allStocks.filter((stock) => stock.symbol === submit)
  
  //Buy price calculations
  //let earningsGrowthRate  = (selectedStock[0].data.PEGRatio / selectedStock[0].data.PERatio)
  //let fairValue = (1+earningsGrowthRate)*selectedStock[0].data.EPS*selectedStock[0].data.PERatio
  //let dividendValuation = (selectedStock.data.asset - selectedStock.data.liabilities)/selectedStock.data.SharesOutstanding

  //store relevant data in arrays for visualization
  let dates = []
  let netIncome = []
  let totalRevenue = []
  let operatingCashflow = []
  let debtToEquity = []

  const yearsOfData = selectedStock[0].data.yearsOfData
  for (let i=yearsOfData; i>=0; i--) {
    dates.push(selectedStock[0].data[`dateYear${String(i)}`])
    netIncome.push(selectedStock[0].data[`netIncomeYear${String(i)}`])
    totalRevenue.push(selectedStock[0].data[`totalRevenueYear${String(i)}`])
    operatingCashflow.push(selectedStock[0].data[`operatingCashflowYear${String(i)}`])
    debtToEquity.push(selectedStock[0].data[`totalLiabilitiesYear${String(i)}`] / selectedStock[0].data[`totalEquityYear${String(i)}`])
  }

  //store data in variable for ChartJS
  const netIncomeData = {
    labels: dates,
    datasets: [
      {
        label: 'Net Income',
        data: netIncome,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const totalRevenueYearData = {
    labels: dates,
    datasets: [
      {
        label: 'Total Revenue',
        data: totalRevenue,
        backgroundColor: 'rgba(75, 192, 100, 0.2)',
        borderColor: 'rgba(75, 192, 100, 1)',
        borderWidth: 1,
      },
    ],
  }

  const operatingCashflowData = {
    labels: dates,
    datasets: [
      {
        label: 'Operating Cash Flow',
        data: operatingCashflow,
        backgroundColor: 'rgba(192, 192, 100, 0.2)',
        borderColor: 'rgba(192, 192, 100, 1)',
        borderWidth: 1,
      },
    ],
  }

  const debtToEquityData = {
    labels: dates,
    datasets: [
      {
        label: 'Total Debt',
        data: debtToEquity,
        backgroundColor: 'rgba(192, 100, 192, 0.2)',
        borderColor: 'rgba(192, 100, 192, 1)',
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  }


  return( 
      <div>
        {/*form for user to submit stock ticker*/}
        
        <div className='header'>
          <div className="input" >
          <form onSubmit={handleSubmit}>
            <input
              placeholder='Enter stock ticker'
              value={input}
              onChange={handleChange} />
            <button className='button' type='submit'>Enter</button>
          </form>
          </div>
          <h1 className='stockName'>Selected Stock: {selectedStock[0].symbol}</h1>
        </div>
        
        <div className = "container">
        <section className="text-section">
          <h2>Company Information</h2> 
          <br />
          <h4>Description</h4>
          <p>{selectedStock[0].data.Description}</p>
          <h4>Sector / Industry</h4>
          <p>{selectedStock[0].data.Sector} / {selectedStock[0].data.Industry}</p>
          <h4>Price-to-Earnings Ratio</h4>
          <p> {selectedStock[0].symbol} has a PE ratio of <em>{selectedStock[0].data.PERatio}</em> meaning it is {selectedStock[0].data.PERatio > 30 ? " more expensive than the market" : " less expensive than the market"} </p>
          <h4>Beta</h4>
          <p> {selectedStock[0].symbol} has a Beta of <em>{selectedStock[0].data.Beta}</em> meaning it is {selectedStock[0].data.Beta > 1 ? " more volatile than the market" : " less volatile than the market"} </p>
        </section>
        
        <section className="grid-section">
          <div className='graph-container'>
            <BarChart chartData={netIncomeData} title = "Yearly Net Income" />
          </div>
          <div className='graph-container'>
            <BarChart chartData={totalRevenueYearData} title = "Yearly Total Revenue" />
          </div>
          <div className='graph-container'>
            <BarChart chartData={operatingCashflowData} title = "Yearly Free Cash Flow" />
          </div>
          <div className='graph-container'>
            <LineChart chartData={debtToEquityData} title = "Yearly Debt to Equity Ration" />
          </div>
        </section>
        </div>
        

      </div>

    );
             
} 


export default App;
