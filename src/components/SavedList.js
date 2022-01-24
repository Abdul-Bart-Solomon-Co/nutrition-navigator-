// import NutrientsDetail from "./NutrientsDetails"

export const SavedList = ({ foodArray }) => {

    console.log(foodArray)
    return (
        <div>
        {foodArray.length > 0 &&
        foodArray.map((item) => {
            return (
                <div>
                    {/* <NutrientsDetail {...item.foodDetails}  /> */}
                    <h1>{item.foodDetails.food_name}</h1>
                </div>

            )
        })
    }
    </div>
    )
}