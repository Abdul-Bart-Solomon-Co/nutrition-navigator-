import { BarChart } from '../components/Chart.js';


const Comparisons = (props) => {


    return (
        <section className="comparisons">
            { props.comparisonsArray.length > 0 &&
                <BarChart chartData={props.comparisonsArray} />
            
        }
            
        </section>
    )
}

export default Comparisons