import NutrientsDetail from "./NutrientsDetails";
import { BarChart } from '../components/Chart.js';


const Comparisons = (props) => {


    console.log(props);
    return (
        <section className="comparisons">
            {
                props.comparisonsArray.map((individualFoodNutrients) => {
                    return(
                        <>
                            <NutrientsDetail {...individualFoodNutrients} />

                                <BarChart chartData={props.comparisonsArray} />
                        
                        </>
                    )
                    
                })
            
        }
            
        </section>
    )
}

export default Comparisons