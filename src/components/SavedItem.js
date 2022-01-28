import NutrientsDetail from "./NutrientsDetails";
const SavedItem = (props) => {
    // Using spread operater when using this component doesn't work since react won't let you have a property called key in props. Since it thinks its the ley attribute
    const {handleRemove, handleNoteSubmit} = props.componentProps;
    const {key, foodDetails } = props.data;
    return (
        <div key={key} className='top-level-div'>
            <NutrientsDetail {...foodDetails} handleRemove={() => handleRemove(key)} handleNoteSubmit={(event, note) => handleNoteSubmit(event, note, key)} />
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