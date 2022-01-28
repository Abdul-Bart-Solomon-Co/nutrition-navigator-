import { useState } from 'react';
import { trimNumberToOneDecimal } from '../utils';

const NutrientsDetail = (props) => {

    // state to check how many items you can click to compare
    const [ clicks, setClicks ] = useState(0);
    const [ charts, setCharts ] = useState(1);
    const [userInput, setUserInput] = useState('');

    const changeClicks = () => {
        if (clicks === 3) {
            setCharts(charts + 1);
            setClicks(0);
        } else {
            setClicks(clicks + 1);

        }

    }
    // Controlled input for note form
    const handleChange = (event) => {
        setUserInput(event.target.value);
    }
   
    return(
        <article className="nutrientsContainer">
            <div className='nutrients-header'>
                <div className='nutrient-image-container'> <img src={ props.photo.thumb } alt={`This is a ${props.food_name}`}></img></div>

                <div className='nutrient-header-text'>
                    <h2>{ props.food_name }</h2>
                    <h3><span className='bolded-values'>{ (props.brand_name !== "N/A") ? props.brand_name : null }</span></h3>
                </div>
            </div>
            <div className='nutrients-body'>
                <ul>
                    <li>{ 'Calories: '} <span className='bolded-values'>{ trimNumberToOneDecimal(props.nf_calories) } kcal</span></li>
                    <li>{'Fiber: '} <span className='bolded-values'>{ trimNumberToOneDecimal(props.nf_dietary_fiber) } g</span></li>
                    <li>{'Protein: '} <span className='bolded-values'>{ trimNumberToOneDecimal(props.nf_protein) } g</span></li>
                    <li>{'Saturated Fat: '} <span className='bolded-values'>{ trimNumberToOneDecimal(props.nf_saturated_fat) } g</span></li>
                    <li>{'Sugars: '} <span className='bolded-values'>{ trimNumberToOneDecimal(props.nf_sugars) } g</span></li>
                    <li>{'Carbohydrates: '} <span className='bolded-values'>{ trimNumberToOneDecimal(props.nf_total_carbohydrate)} g</span></li>
                    <li>{'Total Fat: '} <span className='bolded-values'>{ trimNumberToOneDecimal(props.nf_total_fat)} g</span></li>
                    <li>{'Sodium: '} <span className='bolded-values'>{ trimNumberToOneDecimal(props.nf_sodium) } mg</span></li>

                </ul>

                <ul>
                    {props.full_nutrients &&
                        props.full_nutrients.map((individualNutrient) => {
                            return (
                                <li key={individualNutrient.attr_id}>{individualNutrient.name + ': '} <span className='bolded-values'>{ trimNumberToOneDecimal(individualNutrient.value) + " " + individualNutrient.unit}</span></li>
                            )
                        })
                    }
                    
                </ul>
                    
            </div> {/* end of .nutrients-body */}
            {
                props.note
                    ? <div className="note">
                            <h3>Note</h3>
                            <p>{props.note}</p>
                        </div>
                    : null
            }

            {/* Note form */}
            {/* When the form is submitted it calls the handleNoteSubmit function from its props */}
            {/* This will pass it the event that triggered it, and the current value of userInput which is the note text */}

            { props.handleRemove ? 
                <form action="#" onSubmit={(event) => props.handleNoteSubmit(event, userInput)}>
                    <div className="labelButtonContainer">
                        <label htmlFor="note">Save a note</label>
                        <button type="submit">Save</button>
                    </div>
                    <textarea value={userInput} onChange={handleChange} name="note" id="note" placeholder="Enter note here"></textarea>
                    
                </form>
                : null
            }
            
            <div className='nutrients-buttons-container'>
                { props.handleCompare &&
                <button
                onClick={() => [props.handleCompare(), props.setDisabledButton(), changeClicks()]}
                disabled={props.renderValue ? true : false}
                >Compare</button>
                }

                { props.handleSave &&
                <button onClick={() => props.handleSave(props.food_name)}>Save</button>
                }

                {props.handleRemove &&
                <button onClick={props.handleRemove}>Remove</button>
                }


                { props.handleCompare ? 
                    <>
                        <p>Number of charts: {charts}</p>
                        <p>items in current chart: {clicks}</p>
                    </>
                    : null
                }

                

            </div>
        </article>
    )
}

export default NutrientsDetail;

// so I need to disable the compare button when its clicked and then enable it when the component is rendered again
// I will set up a use state in the nutrition detail to handle if the component has been clicked or not

