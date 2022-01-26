import NutrientsDetail from "./NutrientsDetails"
import axios from "axios";
import { useState, useEffect } from 'react';
import { filterByTagId, makeNutritionObj } from "../utils.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "./Pagination.js";
import FoodListItem from "./FoodListItem.js";

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
    const [ foodTypeListed, setFoodTypeListed ] = useState("common");
    // const [ foodItemDetails, setFoodItemDetails ] = useState({});
    const appId = "69faf9cb";
    const apiKey = "90db89eddcef2e54eea4099c6ab38907";

      // Axios call for search/instant endpoint
    useEffect(() => {
        if(searchTerm.length > 0) {
        axios({
            method: "GET",
            dataResponse: "json",
            url: `https://trackapi.nutritionix.com/v2/search/instant`,
            headers: {
            "Content-Type": "application/json",
            "x-app-id": appId,
            "x-app-key": apiKey
            },
            params: {
            "query": searchTerm
            }
        }).then((res) => {
            if(res.data.common.length > 0 ){
                const commonArray = res.data.common;
                setCommonFoodArray(filterByTagId(commonArray))
            } 

            if (res.data.branded.length > 0) {
                const brandedArray = res.data.branded;
                //Can't filtered by tag_id since branded results dont seem to come with it.
                setBrandedFoodArray(brandedArray)
            } 

            if (res.data.common.length === 0 && res.data.branded.length === 0){
                toast.error("Sorry no food results found")
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
            "x-app-id": appId,
            "x-app-key": apiKey
            },
            data: {
            "query": foodItemName
            }
        }).then((res) => {
            const foodObj = res.data.foods[0]
            if (Object.keys(foodObj).length !== 0) {
                setFoodItemDetails(makeNutritionObj(res));
            } else {
                toast.error("Sorry, looks like there are no nutrient details")
            }
            
        }).catch((error) => {
            toast.error("Sorry there was trouble getting nutrient details from the API")
        })
        }
    }, [foodItemName, setFoodItemDetails])

    // useEffect to get nutrient details from branded items
    useEffect( () => {
        if (brandId.length > 0){
            axios({
                method: "GET",
                dataResponse: "json",
                url: ` https://trackapi.nutritionix.com/v2/search/item`,
                headers: {
                    "Content-Type": "application/json",
                    "x-app-id": appId,
                    "x-app-key": apiKey
                },
                params: {
                    "nix_item_id": brandId
                }
            }).then((res) => {

                const foodObj = res.data.foods[0]
                if (Object.keys(foodObj).length !== 0) {
                    setFoodItemDetails(makeNutritionObj(res));
                } else {
                    toast.error("Sorry, looks like there are no nutrient details")
                }

            }).catch((error) => {
                toast.error("Sorry there was trouble getting nutrient details from the API")
            })
        }
    }, [brandId, setFoodItemDetails])


      // handles the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (userInput === ""){
            toast.warn("Please enter a food name");
        }
        setSearchTerm(userInput);
        setUserInput('');
    }

    // handles setting state based npm start
    // on user input
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

    const handleCommonType = () => {
        setFoodTypeListed("common");
    }

    const handleBrandedType = () => {
        setFoodTypeListed("branded");
    }

    return(
        <section>

             <form action="#" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="searchInput">Enter a Food Item:</label>
              <input type='text' onChange={handleChange} value={userInput} placeholder="Enter Food Choice" />
            </form>

            <div className="foodResultsContainer wrapper">
                <div className="searchList">

                    {/* <div className="commonFoodList">
                        <h2>Common Food</h2>
                        {
                            commonFoodArray.map((foodItem) => {
                                return (
                                    <div className="searchFlexContainer" key={foodItem.tag_id + foodItem.food_name}>
                                        <img className="listImg" src={foodItem.photo.thumb} alt={`This is ${foodItem.food_name}`} />
                                        <p>{foodItem.food_name}</p>
                                        <button onClick={() => handleDetailClick(foodItem.food_name)}>Details</button>
                                    </div>
                                )
                            })   
                        }
                    </div> */}

                    {/* Buttons that toggle common and branded foot lists */}

                    {commonFoodArray.length > 0 || brandedFoodArray.length > 0
                    ?<div className="foodTypeButtonContainer">
                        <button
                            onClick={handleCommonType}
                            disabled={
                                foodTypeListed === "common"
                                    ? true
                                    : false
                            }>Common Foods</button>

                        <button
                            onClick={handleBrandedType}
                            disabled={
                                foodTypeListed === "branded"
                                    ? true
                                    : false
                            }>Branded Foods</button>
                    </div>
                    : null
                    }
                    
                    

                    {
                    // Ternary changes which food list type is displayed depending on button selected
                    commonFoodArray.length > 0 && foodTypeListed === "common"
                        ? <Pagination
                            data={commonFoodArray}
                            RenderedComponent={FoodListItem}
                            title="Common Food"
                            pageLimit={5}
                            dataLimit={5}
                            componentProps={handleDetailClick}
                        />
                        : null
                    }
                    {
                        // Ternary changes which food list type is displayed depending on button selected
                        brandedFoodArray.length > 0 && foodTypeListed === "branded"
                            ? <Pagination
                                data={brandedFoodArray}
                                RenderedComponent={FoodListItem}
                                title="Branded Food"
                                pageLimit={5}
                                dataLimit={5}
                                componentProps={handleDetailClick}
                            />
                            : null
                    }
                    

                    {/* <div className="brandedFoodList">
                        <h2>Branded Food</h2>
                        {
                            brandedFoodArray.map((foodItem) => {
                                return (
                                    <div className="searchFlexContainer" key={foodItem.tag_id + foodItem.food_name}>
                                        <img className="listImg" src={foodItem.photo.thumb} alt={`This is ${foodItem.food_name}`} />
                                        <p>{foodItem.food_name}</p>
                                        <button onClick={() => handleBrandedDetailClick(foodItem.nix_item_id)}>Details</button>
                                    </div>
                                )
                            })
                        }

                    </div> */}

                </div>
            {
            Object.keys(foodItemDetails).length > 0 && commonFoodArray.length > 0 &&
                <NutrientsDetail {...foodItemDetails} handleCompare={handleCompare} handleSave={handleSave}/>
            }

            </div>
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

