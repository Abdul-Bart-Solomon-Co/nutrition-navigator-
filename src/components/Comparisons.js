import { BarChart } from '../components/Chart.js';


const Comparisons = (props) => {
    console.log(props.chartNumber);
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

    console.log(arrayOfCharts);


    return (
        <section className="comparisons">
            { props.comparisonsArray.length > 0 &&
                arrayOfCharts.map((chartGroup) => {
                    return (
                        <BarChart chartData={chartGroup}/>

                    )
                })
            
        }
            
        </section>
    )
}

export default Comparisons