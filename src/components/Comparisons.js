import NutrientsDetail from "./NutrientsDetails";


const Comparisons = (props) => {
    return (
        <section className="comparisons">
            {
                props.comparisonsArray.map((individualFoodNutrients) => {
                    return(
                        <NutrientsDetail {...individualFoodNutrients} />
                    )
                    
                })
            
        }
            
        </section>
    )
}

export default Comparisons