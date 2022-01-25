import NutrientsDetail from "./NutrientsDetails"
import axios from "axios";
import { useState, useEffect } from 'react';
import { filterByTagId, filteredNutrients } from "../utils.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// firebase imports
import firebaseProject from '../firebaseSetup.js';
import { getDatabase, ref, push } from 'firebase/database';


export const FoodList = ({ handleCompare, savedFood, foodItemDetails, setFoodItemDetails }) => {
    

    const [ commonFoodArray, setCommonFoodArray ] = useState([]);
    const [ brandedFoodArray, setBrandedFoodArray] = useState([]);
    const [ brandId, setBrandId ] = useState("");
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ userInput, setUserInput ] = useState('');
    const [ foodItemName, setFoodItemName ] = useState("");
    // const [ foodItemDetails, setFoodItemDetails ] = useState({});

      // Axios call for search/instant endpoint
    useEffect(() => {
        if(searchTerm.length > 0) {
        axios({
            method: "GET",
            dataResponse: "json",
            url: `https://trackapi.nutritionix.com/v2/search/instant`,
            headers: {
            "Content-Type": "application/json",
            "x-app-id": "081b5ced",
            "x-app-key": "424576e2352c2f4a8443cce73c99e5d7"
            },
            params: {
            "query": searchTerm
            }
        }).then((res) => {
            if(res.data.common.length > 0 ){
                const commonArray = res.data.common;
                setCommonFoodArray(filterByTagId(commonArray))
            } else {
                toast.error("Sorry no common food results found")
            }

            if (res.data.branded.length > 0) {
                const brandedArray = res.data.branded;
                //Can't filtered by tag_id since branded results dont seem to come with it.
                setBrandedFoodArray(brandedArray)
            } else {
                toast.error("Sorry no common food results found")
            }
            
        }).catch((error) => {
            toast.error("Sorry there was a problem getting data from the API")
        })
        }

    }, [searchTerm]);

      useEffect( () => {
        if (foodItemName.length > 0){
        axios({
            method: "POST",
            dataResponse: "json",
            url: `https://trackapi.nutritionix.com/v2/natural/nutrients`,
            headers: {
            "Content-Type": "application/json",
            "x-app-id": "081b5ced",
            "x-app-key": "424576e2352c2f4a8443cce73c99e5d7"
            },
            data: {
            "query": foodItemName
            }
        }).then((res) => {
            // console.log(res.data)
        
            const someArray = ["nf_calories", "nf_dietary_fiber", "nf_protein", "nf_saturated_fat", "nf_sugars", "nf_total_carbohydrate", "nf_total_fat", "nf_sodium", "full_nutrients", "food_name", "brand_name", "photo",]

            const nutritionObj = {}

            const foodObj = res.data.foods[0]
            if(Object.keys(foodObj).length !== 0){
                for (let key in foodObj) {
                    if (someArray.includes(key)) {
                        // error handling for null value in foodObj
                        if (foodObj[key] === null) {
                            nutritionObj[key] = 'N/A';
                        } else {
                            nutritionObj[key] = foodObj[key]
                        }
                    }
                }
                const renamedNutrients = filteredNutrients(nutritionObj.full_nutrients)
                nutritionObj.full_nutrients = renamedNutrients;

                setFoodItemDetails(nutritionObj);
            } else{
                toast.error("Sorry, looks like there are no nutrient details")
            }
            
        }).catch((error) => {
            toast.error("Sorry there was trouble getting nutrient details from the API")
        })
        }
    }, [foodItemName])

    // useEffect to get nutrient details from branded items
    useEffect( () => {
        if (brandId.length > 0){
            axios({
                method: "GET",
                dataResponse: "json",
                url: ` https://trackapi.nutritionix.com/v2/search/item`,
                headers: {
                    "Content-Type": "application/json",
                    "x-app-id": "081b5ced",
                    "x-app-key": "424576e2352c2f4a8443cce73c99e5d7"
                },
                params: {
                    "nix_item_id": brandId
                }
            }).then((res) => {
                // console.log(res.data)

                const someArray = ["nf_calories", "nf_dietary_fiber", "nf_protein", "nf_saturated_fat", "nf_sugars", "nf_total_carbohydrate", "nf_total_fat", "nf_sodium", "full_nutrients", "food_name", "brand_name", "photo",]

                const nutritionObj = {}

                const foodObj = res.data.foods[0]
                if (Object.keys(foodObj).length !== 0) {
                    for (let key in foodObj) {
                        if (someArray.includes(key)) {
                            // error handling for null value in foodObj
                            if (foodObj[key] === null) {
                                nutritionObj[key] = 'N/A';
                            } else {
                                nutritionObj[key] = foodObj[key]
                            }
                        }
                    }
                    const renamedNutrients = filteredNutrients(nutritionObj.full_nutrients)
                    nutritionObj.full_nutrients = renamedNutrients;

                    setFoodItemDetails(nutritionObj);
                } else {
                    toast.error("Sorry, looks like there are no nutrient details")
                }

            }).catch((error) => {
                toast.error("Sorry there was trouble getting nutrient details from the API")
            })
        }
    }, [brandId])


      // handles the form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        setSearchTerm(userInput);
        setUserInput('');
    }

    // handles setting state based on user input
    const handleChange = (event) => {
        setUserInput(event.target.value);
    }

    const handleDetailClick = (foodName) => {
    setFoodItemName(foodName);
    }

    const handleBrandedDetailClick = (nixId) => {
        setBrandId(nixId);
    }

     // handles uploading data to firebase
    const handleSave = (foodName) => {
        let someBool = false;
        
        savedFood.forEach( (individualFood) => {
        if(individualFood.foodDetails.food_name === foodName){
            someBool = true;
        }
        })
        if(!someBool){
        // create a reference to our database
        const database = getDatabase(firebaseProject);
    
        const dbRootAddress = ref(database);
    
        // push the value from the user into the database
        push(dbRootAddress, foodItemDetails);

    }};

    return(
        <section>

             <form action="#" onSubmit={handleSubmit}>
              <label htmlFor="searchInput">Enter a Food Item:</label>
              <input type='text' onChange={handleChange} value={userInput} />
            </form>
            {
                commonFoodArray.map((foodItem) => {
                    return (
                        <div key={foodItem.tag_id + foodItem.food_name}>
                            <img src={foodItem.photo.thumb} alt={`This is ${foodItem.food_name}`} />
                            <h2>{foodItem.food_name}</h2>
                            <button onClick={() => handleDetailClick(foodItem.food_name)}>Details</button>
                        </div>
                    )
                })

                
            }
            <h2>Branded food</h2>
            {
                brandedFoodArray.map((foodItem) => {
                    return (
                        <div key={foodItem.tag_id + foodItem.food_name}>
                            <img src={foodItem.photo.thumb} alt={`This is ${foodItem.food_name}`} />
                            <h2>{foodItem.food_name}</h2>
                            <button onClick={() => handleBrandedDetailClick(foodItem.nix_item_id)}>Details</button>
                        </div>
                    )
                })


            }
            
            {
            Object.keys(foodItemDetails).length > 0 && commonFoodArray.length > 0 &&
                <NutrientsDetail {...foodItemDetails} handleCompare={handleCompare} handleSave={handleSave}/>
            }
            {/* Error messages show up here using react-toastify. props are just settings on how the alert will appear */}
            <ToastContainer
                theme="colored"
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </section>
        
    )
    
}

