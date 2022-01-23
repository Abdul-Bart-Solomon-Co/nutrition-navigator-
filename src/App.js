import './App.css';
import { filterByTagId, filteredNutrients } from "./utils.js";
import axios from "axios";
import { Route, Routes, Link } from "react-router-dom";


import { useState, useEffect } from 'react';
import Comparisons from './components/Comparisons';
import { FoodList } from './components/FoodList';
function App() {

  const [ userInput, setUserInput ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ foodArray, setFoodArray ] = useState([]);
  const [ foodItemName, setFoodItemName ] = useState("");
  // nutrition details
  const [ foodItemDetails, setFoodItemDetails ] = useState({});
  const [ comparisonsArray, setComparisonsArray ] = useState([]);

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
        const commonArray =res.data.common;
        setFoodArray(filterByTagId(commonArray))
      })
    }

  }, [searchTerm]);

  //Axios call for /v2/natural/nutrients endpoint

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
        for(let key in foodObj) {
          if(someArray.includes(key)){
            // error handling for null value in foodObj
            if(foodObj[key] === null) {
              nutritionObj[key] = 'N/A';
            } else {
              nutritionObj[key] = foodObj[key]
            }
          }
        }
        const renamedNutrients = filteredNutrients(nutritionObj.full_nutrients)
        nutritionObj.full_nutrients = renamedNutrients;

       setFoodItemDetails(nutritionObj);
      })
    }
  }, [foodItemName])

  

  //  axios({
  //   method: "GET",
  //   dataResponse: "json",
  //    url: `https://trackapi.nutritionix.com/v2/search/item`,
  //   headers: {
  //     "Content-Type": "application/json",
  //     "x-app-id": "081b5ced",
  //     "x-app-key": "424576e2352c2f4a8443cce73c99e5d7"
  //   },
  //   params: {
  //     nix_item_id: "513fc9e73fe3ffd40300109f"
  //   }
  // }).then((res) => {
  //   console.log(res.data)
  // })

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

  const handleCompare = () => {
    setComparisonsArray([...comparisonsArray, foodItemDetails])
  }


  return (
    <div>
      <header className='headerSection'>
            <h1>Nutrition Navigator</h1>
            <form action="#" onSubmit={handleSubmit}>
              <label htmlFor="searchInput">Enter a Food Item:</label>
              <input type='text' onChange={handleChange} value={userInput} />
            </form>
      </header>
      <main>
        <section>
          <div>
            <Link to="/">Find Items</Link>
            <button>Saved items</button>
          </div>
          {/* <FoodList foodArray={foodArray} handleDetailClick={handleDetailClick}/> */}

          
        </section>
        <Comparisons comparisonsArray={comparisonsArray}/>
      </main>

      <Routes>
        <Route path='/' element={ <FoodList foodArray={foodArray} handleDetailClick={handleDetailClick} foodItemDetails={foodItemDetails} handleCompare={handleCompare}/>}/>
      </Routes>
    </div>
  );
}



export default App;

// Have a form with 1 text input in it and a onSubmit attribute with a handleSubmit function
// Get user text input from search using onChange 
// wrap axios call in a useEffect() hook
// Make api call to Nutritionix (search instant endpoint)
// use state to hold response from axios 
// map through state and display on page 
// when user clicks food choice make second api call (nutrition endpoint)
// put response into nutritionDetails state 
// display information on page 
// if the comparison btn is clicked add current food choice to comparison useState 
// have the comparison component appear with the clicked food data item
// have the comparison component map over data in its state

// SAVED ITEMS PORTION
// add a save button in food items list
// if someone clicks button have it update firebase
// have savedItems state watch firebase and change its state based on what is in the database
// savedItems list items will have a compare and remove button
// the compare button will populate the compare component
// the remove button will call firebase and remove the item based on item id
// we need to tab between views savedItems and groceryItems
// use router somehow

// Technologies we need:
// axios
// loader-spinner 
// react-router-dom npm package (Router, Route, Link) (npm i react-router-dom)
// useEffect, useState hook
// React-icons package from npm (npm i react-icons --save)



