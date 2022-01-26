const NutrientsDetail = (props) => {
    

    return(
        <div className="nutrientsContainer">
            <ul>
                <div>
                    <li><h2>{ props.food_name }</h2></li>
                    <li> <img src={ props.photo.thumb } alt={`This is a ${props.food_name}`}></img></li>
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
            <button
            onClick={() => [props.handleCompare(), props.setDisabledButton()]}
            disabled={props.renderValue ? true : false}
            >Compare</button>
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

export default NutrientsDetail;

// so I need to disable the compare button when its clicked and then enable it when the component is rendered again
// I will set up a use state in the nutrition detail to handle if the component has been clicked or not

