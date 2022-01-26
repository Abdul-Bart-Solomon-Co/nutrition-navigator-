import NutrientsDetail from "./NutrientsDetails";
const SavedItem = (props) => {
    console.log(props.componentProps)
    const handleRemove = props.componentProps;
    const {key, foodDetails } = props.data;
    return (
        <div key={key}>
            <NutrientsDetail {...foodDetails} handleRemove={() => handleRemove(key)}  />
        </div>
    )
}

export default SavedItem;









// foodArray.map((item) => {
        //     return (
        //         <div key={item.key}>
        //             <NutrientsDetail {...item.foodDetails} handleRemove={() => handleRemove(item.key)}  />
        //         </div>

        //     )
        // })