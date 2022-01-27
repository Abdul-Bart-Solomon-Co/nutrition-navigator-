import React from 'react';
import { Bar } from 'react-chartjs-2';
import { exchangeObject, vitaminsExchange } from "../utils.js";
import { useState } from 'react';

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


export const BarChart = ({ chartData, index, handleMutateChartsArray }) => {

    const [ toggle, setToggle ] = useState(false);

    const nutritionOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Nutrition Data',
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

const vitaminOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Vitamins/Minerals Data',
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

    // labels for vitamin section
    const vitaminLabels = ['Iron (mg)', 'Magnesium (mg)', 'Zinc (mg)', 'Vitamin A (IU)', 'Vitamin A (mcg)', 'Vitamin C (mg)', 'Vitamin B-6 (mg)',  'Vitamin D (IU)', 'Vitamin E (mg)'];

    // colors we will be needing 
    const colors = ['rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(53, 162, 235)']

    // stack we will need
    const stack = ['Stack 0', 'Stack 1', 'Stack 2']

    // creating dynamic nutritions datasets array
    const newNutritionData = chartData.map((item, index) => {
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

  // creating a dynamic vitamins/minerals datasets array
  const newVitaminData = chartData.map((item, index) => {
    let newObj;
    newObj = vitaminsExchange(item);
    // we want an object returned that has a label property, data array, background color, and stack value
    let dataObject = {
        label: newObj.food_name,
        data: vitaminLabels.map((label) => newObj[label]),
        backgroundColor: colors[index],
        stack: stack[index]
      }
      return dataObject;
  })


    const nutritionData = {
        labels,
        datasets: newNutritionData,
    };

    const vitaminsData = {
        labels: vitaminLabels,
        datasets: newVitaminData,
    };

    const handleClick = (boolean) => {
      setToggle(boolean);
    }


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
      <div className='chartBtn'>
        <button onClick={() => handleClick(false)}>Nutrition Data</button>
        <button onClick={() => handleClick(true)}>Vitamin Data</button>
        <button onClick={() => handleMutateChartsArray(index)}>Remove</button>
        {
          !toggle ?
          <>
              <Bar 
              data={nutritionData}
              options={nutritionOptions}
              />
          </>
          : 
          <>
              <Bar 
              data={vitaminsData}
              options={vitaminOptions}
              />
          
          </>
        }

      </div>
    )
}
