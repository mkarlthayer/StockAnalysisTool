// src/LineChart.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement, scales } from 'chart.js';

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);


const LineChart = ({chartData, title}) => {

  const options = {
    maintainApectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
        y: {
            min: 0
        }
    }
  }

  return <Line data = {chartData} options={options} />

  
};

export default LineChart;