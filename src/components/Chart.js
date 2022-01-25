import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const BarChart = ({ chartData }) => {
    console.log(chartData)

    const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

    const labels = ['Calories', 'Dietary Fiber', 'Protein', 'Saturated Fat', 'Sodium', 'Sugars', 'Total Carbohydrates', 'Total Fat'];

    const data = {
        labels,
        datasets: [
            {
            label: 'Burgers',
            data: labels.map(() => Math.floor(Math.random() * 50)),
            backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Stack 0',
            },
            {
            label: 'Fries',
            data: labels.map(() => 40),
            backgroundColor: 'rgb(75, 192, 192)',
            stack: 'Stack 0',
            },
            {
            label: 'Salad',
            data: labels.map(() => 60),
            backgroundColor: 'rgb(53, 162, 235)',
            stack: 'Stack 1',
            },
        ],
};
    return (
        <div>
           <Bar 
           data={data}
           options={options}
           />
        </div>
    )
}
