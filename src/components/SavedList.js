import NutrientsDetail from "./NutrientsDetails"
import firebaseProject from '../firebaseSetup';
import { getDatabase, ref, remove } from 'firebase/database';

export const SavedList = ({ foodArray }) => {

    const handleRemove = (foodId) => {
        const database = getDatabase(firebaseProject);

        const dbBookAddress = ref(database, `/${foodId}`);

        remove(dbBookAddress);
    }

    console.log(foodArray)
    return (
        <div className="savedList wrapper">
        {foodArray.length > 0 &&
        foodArray.map((item) => {
            return (
                <div key={item.key}>
                    <NutrientsDetail {...item.foodDetails} handleRemove={() => handleRemove(item.key)}  />
                </div>

            )
        })
    }
    </div>
    )
}