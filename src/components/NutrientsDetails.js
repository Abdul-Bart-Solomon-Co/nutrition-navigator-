const NutrientsDetail = (props) => {
    // const [ props.nf_calories, nf_dietary_fiber, nf_protein, nf_saturated_fat, nf_sugars, nf_total_carbohydrate, nf_total_fat, nf_sodium, full_nutrients, food_name, brand_name, photo ] = props;
    
    return(
        <div>
            <ul>
                <div className="flexContainer">
                    <li> <img src={props.photo.thumb} alt={`This is a ${props.food_name}`}></img></li>
                    <li><h2>{ props.food_name}</h2></li>
                </div>
                <li>{ props.brand_name + ' Brand Name'}</li>
                <li>{ props.nf_calories + ' Calories' }</li>
                <li>{ props.nf_dietary_fiber + ' Fiber' }</li>
                <li>{ props.nf_protein + ' Protein'}</li>
                <li>{ props.nf_saturated_fat + ' Saturated Fat'}</li>
                <li>{ props.nf_sugars + ' Sugars'}</li>
                <li>{ props.nf_total_carbohydrate + ' Carbohydrates'}</li>
                <li>{ props.nf_total_fat + ' Total Fat'}</li>
                <li>{ props.nf_sodium + ' Sodium'}</li>
                {props.full_nutrients &&
                    props.full_nutrients.map((individualNutrient) => {
                        return (
                            <li key={individualNutrient.attr_id}>{individualNutrient.name + ': ' + individualNutrient.value + " " + individualNutrient.unit}</li>
                        )
                    })
                }
            </ul>
            { props.handleCompare &&
            <button onClick={props.handleCompare}>Compare</button>
            }

            { props.handleSave &&
            <button onClick={() => props.handleSave(props.food_name)}>Save</button>
            }

            {props.handleRemove &&
            <button onClick={props.handleRemove}>Remove</button>
            }
        </div>
    )
}

export default NutrientsDetail