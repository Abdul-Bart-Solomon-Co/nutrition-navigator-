// import NutrientsDetail from "./NutrientsDetails"
import firebaseProject from '../firebaseSetup';
import { getDatabase, ref, remove, update } from 'firebase/database';
import SavedItem from "./SavedItem.js"
import Pagination from "./Pagination.js";


export const SavedList = ({ foodArray }) => {

    const handleRemove = (foodId) => {
        const database = getDatabase(firebaseProject);

        const dbFoodAddress = ref(database, `/${foodId}`);

        remove(dbFoodAddress);
    }

    // Takes event note and key to save note to database
    // This is passed into pagination which passes it to saved items, this is where the key is passed into it.
    // This is then passed into NutrientsDetails which will give it the event and note.
    const handleNoteSubmit = (event, note, foodKey) => {
        event.preventDefault();
        const database = getDatabase(firebaseProject);
        const dbFoodAddress = ref(database, `/${foodKey}`);
        const noteObj = {
            note: note
        }
        update(dbFoodAddress, noteObj)
    }

    return (
        <div className="savedList wrapper">
        {foodArray.length > 0 &&

        // foodArray.map((item) => {
        //     return (
        //         <div key={item.key}>
        //             <NutrientsDetail {...item.foodDetails} handleRemove={() => handleRemove(item.key)}  />
        //         </div>

//         foodArray.map((item) => {
//             return (
//                 <div className="savedFood" key={item.key}>
//                     <NutrientsDetail {...item.foodDetails} handleRemove={() => handleRemove(item.key)}  />
//                 </div>


        //     )
        // })
        <Pagination 
            data={foodArray}
            RenderedComponent={SavedItem}
            title="Saved Items"
            pageLimit={5}
            dataLimit={2}
            componentProps={{handleRemove, handleNoteSubmit}}
        />
    }
    </div>
    )
}