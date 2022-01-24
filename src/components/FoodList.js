import NutrientsDetail from "./NutrientsDetails"


export const FoodList = ({ foodArray, handleDetailClick, foodItemDetails, handleCompare, handleSave }) => {
    

    return(
        <section>
            {
                foodArray.map((foodItem) => {
                    return (
                        <div key={foodItem.tag_id + foodItem.food_name}>
                            <img src={foodItem.photo.thumb} alt={`This is ${foodItem.food_name}`} />
                            <h2>{foodItem.food_name}</h2>
                            <button onClick={() => handleDetailClick(foodItem.food_name)}>Details</button>
                        </div>
                    )
                })

                
            }
            
            {
            Object.keys(foodItemDetails).length > 0 &&
                <NutrientsDetail {...foodItemDetails} handleCompare={handleCompare} handleSave={handleSave}/>
            }
        </section>
    )
    
}

