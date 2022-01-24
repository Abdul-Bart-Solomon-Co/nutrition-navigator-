const NutrientsDetail = (props) => {
    // const [ props.nf_calories, nf_dietary_fiber, nf_protein, nf_saturated_fat, nf_sugars, nf_total_carbohydrate, nf_total_fat, nf_sodium, full_nutrients, food_name, brand_name, photo ] = props;
    
    // console.log(props)
    return(
        <div>
            <ul>
                <li>{ props.nf_calories + ' Calories' }</li>
                <li>{ props.nf_dietary_fiber + ' Fiber' }</li>
                <li>{ props.nf_protein + ' Protein'}</li>
                <li>{ props.nf_saturated_fat + ' Saturated Fat'}</li>
                <li>{ props.nf_sugars + ' Sugars'}</li>
                <li>{ props.nf_total_carbohydrate + ' Carbohydrates'}</li>
                <li>{ props.nf_total_fat + ' Total Fat'}</li>
                <li>{ props.nf_sodium + ' Sodium'}</li>
                <li>{ props.food_name}</li>
                <li>{ props.brand_name + ' Brand Name'}</li>
                <li> <img src={props.photo.thumb} alt={`This is a ${props.food_name}`}></img></li>
                {
                    props.full_nutrients.map((individualNutrient) => {
                        return (
                            <li key={individualNutrient.attr_id}>{individualNutrient.name + ': ' + individualNutrient.value + " " + individualNutrient.unit}</li>
                        )
                    })
                }
            </ul>
            <button onClick={props.handleCompare}>Compare</button>
            <button onClick={props.handleSave}>Save</button>
        </div>
    )
}

export default NutrientsDetail