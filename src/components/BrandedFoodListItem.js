const BrandedFoodListItem = (props) => {
    const foodItem = props.data;
    const handleBrandedDetailClick = props.componentProps;
    return (
        <div className="searchFlexContainer" key={foodItem.tag_id + foodItem.food_name}>
            <img className="listImg" src={foodItem.photo.thumb} alt={`This is ${foodItem.food_name}`} />
            <p>{foodItem.brand_name_item_name}</p>
            <button onClick={() => handleBrandedDetailClick(foodItem.nix_item_id)}>Details</button>
        </div>
    )
}

export default BrandedFoodListItem;