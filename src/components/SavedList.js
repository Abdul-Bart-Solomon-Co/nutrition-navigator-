// import NutrientsDetail from "./NutrientsDetails"
import firebaseProject from '../firebaseSetup';
import { getDatabase, ref, remove } from 'firebase/database';
import SavedItem from "./SavedItem.js"
import Pagination from "./Pagination.js";


export const SavedList = ({ foodArray }) => {

    const handleRemove = (foodId) => {
        const database = getDatabase(firebaseProject);

        const dbBookAddress = ref(database, `/${foodId}`);

        remove(dbBookAddress);
    }

    return (
        <div className="savedList wrapper">
        {foodArray.length > 0 &&
        // foodArray.map((item) => {
        //     return (
        //         <div key={item.key}>
        //             <NutrientsDetail {...item.foodDetails} handleRemove={() => handleRemove(item.key)}  />
        //         </div>

        //     )
        // })
        <Pagination 
            data={foodArray}
            RenderedComponent={SavedItem}
            title="Saved Items"
            pageLimit={5}
            dataLimit={2}
            componentProps={handleRemove}
        />
    }
    </div>
    )
}