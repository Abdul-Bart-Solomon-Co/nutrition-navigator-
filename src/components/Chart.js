import React from 'react';
import { Bar } from 'react-chartjs-2';
import { exchangeObject } from "../utils.js";

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

    // labels must be the same as key names in the incoming data
    const labels = ['Calories (kcal)', 'Dietary Fiber (grams)', 'Protein (grams)', 'Saturated Fat (grams)', 'Sodium (mg)', 'Sugars (grams)', 'Total Carbohydrates (grams)', 'Total Fat (grams)'];

    // colors we will be needing 
    const colors = ['rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(53, 162, 235)']

    // stack we will need
    const stack = ['Stack 0', 'Stack 1', 'Stack 0']

    // creating dynamic nutritions datasets array
    const newData = chartData.map((item, index) => {
      let newObj;
      newObj = exchangeObject(item);

      // we want an object returned that has a label property, data array, background color, and stack value
      let dataObject = {
        label: newObj.food_name,
        data: labels.map((label) => newObj[label]),
        backgroundColor: colors[index],
        stack: stack[index]
      }
      return dataObject;
    });

  console.log(newData)


    const data = {
        labels,
        datasets: newData,
};

  //   const mineralData = {
  //       labels,
  //       datasets: [        
  //           {
  //           label: newData[0].food_name,
  //           data: labels.map((label) => newData[0][label]),
  //           backgroundColor: 'rgb(255, 99, 132)',
  //           stack: 'Stack 0',
  //           },
  //           {
  //           label: newData[1].food_name,
  //           data: labels.map((label) => newData[1][label]),
  //           backgroundColor: 'rgb(75, 192, 192)',
  //           stack: 'Stack 0',
  //           },
  //           {
  //           label: newData[2].food_name,
  //           data: labels.map((label) => newData[2][label]),
  //           backgroundColor: 'rgb(53, 162, 235)',
  //           stack: 'Stack 1',
  //           }
  //       ],
  // };  
    return (
        <div>
           <Bar 
           data={data}
           options={options}
           />
        </div>
    )
}
