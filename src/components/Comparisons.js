import { BarChart } from '../components/Chart.js';


const Comparisons = (props) => {
      // if more than 3 items are in the chartData array then we need to make a new chart
    let arrayOfCharts;
    const splitArrayIntoChunksOfLen = (arr, len) => {
        let chunks = [], i = 0, n = arr.length;

        while (i < n) {
            chunks.push(arr.slice(i, i+= len));
        } 

        return chunks;
    }

    arrayOfCharts = (splitArrayIntoChunksOfLen(props.comparisonsArray, 3));

    // console.log(arrayOfCharts);

    // will mutate the top comparisons array by removing certain indexes of data, bringing back a new altered array and rerendering all charts
    const handleMutateChartsArray = (index) => {
        arrayOfCharts.splice(index, 1);


        let alteredComparisonsArray = arrayOfCharts.flat();
        props.setComparisonsArray(alteredComparisonsArray);
        // console.log(alteredComparisonsArray);

        // handling the chartNumber on app.js
        props.setChartNumber(Math.ceil(alteredComparisonsArray.length / 3));
    }

    return (
        <section className="comparisons wrapper">
            { props.comparisonsArray.length > 0 &&
                arrayOfCharts.map((chartGroup, index) => {
                    return (
                        <BarChart chartData={chartGroup} index={index} handleMutateChartsArray={handleMutateChartsArray} />

                    )
                })
            
        }
            
        </section>
    )
}

export default Comparisons