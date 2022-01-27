const FoodListItem = (props) => {
    const  foodItem  = props.data;
    const handleDetailClick = props.componentProps;
    return (
        <div className="searchFlexContainer" key={foodItem.tag_id + foodItem.food_name}>
            <img className="listImg" src={foodItem.photo.thumb} alt={`This is ${foodItem.food_name}`} />
            <p>{foodItem.food_name}</p>
            <button onClick={() => handleDetailClick(foodItem.food_name)}>Details</button>
        </div>
    )
}

export default FoodListItem;


