import NutrientsDetail from "./NutrientsDetails"
import axios from "axios";
import { useState, useEffect } from 'react';
import { filterByTagId, makeNutritionObj } from "../utils.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "./Pagination.js";
import FoodListItem from "./FoodListItem.js";
import BrandedFoodListItem from "./BrandedFoodListItem";
import { Oval } from "react-loader-spinner";

// firebase imports
import firebaseProject from '../firebaseSetup.js';
import { getDatabase, ref, push } from 'firebase/database';
import { Modal } from "./Modal";


export const FoodList = ({ handleCompare, savedFood, foodItemDetails, setFoodItemDetails }) => {
    

    const [ commonFoodArray, setCommonFoodArray ] = useState([]);
    const [ brandedFoodArray, setBrandedFoodArray] = useState([]);
    const [ brandId, setBrandId ] = useState("");
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ userInput, setUserInput ] = useState('');
    const [ foodItemName, setFoodItemName ] = useState("");
    const [ foodTypeListed, setFoodTypeListed ] = useState("common");
    const [ queryLoading, setQueryLoading ] = useState(false);
    const [ detailLoading, setDetailLoading ] = useState(false);

    // const [ foodItemDetails, setFoodItemDetails ] = useState({});
    // const appId = "69faf9cb";
    // const apiKey = "90db89eddcef2e54eea4099c6ab38907";
    const appId = "081b5ced";
    const apiKey = "424576e2352c2f4a8443cce73c99e5d7";

    // state to disable button if clicked once
    const [ disabled, setDisabled ] = useState(false);


    const [showModal, setShowModal] = useState(false)

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
            setQueryLoading(false);
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
        } else {
            setQueryLoading(true);
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
        setDisabled(false);
    }

    const handleBrandedDetailClick = (nixId) => {
        setBrandId(nixId);
        setDisabled(false);
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

 //modalFeature
    const openModal = () => {
        setShowModal(prev => !prev)
    }


    const handleCommonType = () => {
        setFoodTypeListed("common");
    }

    const handleBrandedType = () => {
        setFoodTypeListed("branded");
    }
    // sets disabled class
    const setDisabledButton = () => {
        setDisabled(true);

    }

    return(
        <section>
            <div className="formContainer">
             <form action="#" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="searchInput">Enter a Food Item:</label>
              <input type='text' onChange={handleChange} value={userInput} placeholder="Enter Food Choice" />
            </form>
              {
                  <button className="modalButton" onClick={openModal}>?</button>
                }
                <Modal showModal={showModal} setShowModal={setShowModal}/>
            </div>
            
            <div className="foodResultsContainer wrapper">
                <div className="searchList">
                    {
                        //Shows either loader or the data depending on state
                    queryLoading 
                        ?
                        <div className="loader">
                            <Oval  color="#b20061" height={80} width={80} />
                        </div>
                        : <>
                                {/* Buttons that toggle common and branded foot lists */}

                                {commonFoodArray.length > 0 || brandedFoodArray.length > 0
                                    ? <div className="foodTypeButtonContainer">
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
                                            RenderedComponent={BrandedFoodListItem}
                                            title="Branded Food"
                                            pageLimit={5}
                                            dataLimit={5}
                                            componentProps={handleBrandedDetailClick}
                                        />
                                        : null
                                }
                          </>
                    }

                    
                    
                    {/* savedList ends here */}
                </div>
            {
            Object.keys(foodItemDetails).length > 0 && commonFoodArray.length > 0 &&
                <NutrientsDetail {...foodItemDetails} handleCompare={handleCompare} handleSave={handleSave} renderValue={disabled} setDisabledButton={setDisabledButton} />
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

