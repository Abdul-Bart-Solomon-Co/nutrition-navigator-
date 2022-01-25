import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import firebaseProject from './firebaseSetup.js';
import { getDatabase, ref, onValue } from 'firebase/database';
import { SavedList } from './components/SavedList';


import { useState, useEffect } from 'react';
import Comparisons from './components/Comparisons';
import { FoodList } from './components/FoodList';
function App() {


  const [ foodItemDetails, setFoodItemDetails ] = useState({});
  const [ comparisonsArray, setComparisonsArray ] = useState([]);

  // list of saved foods
  const [ savedFood, setSavedFood ] = useState([]);

  // brings up branded/common products
  // Axios call for search/instant endpoint
  // useEffect(() => {
  //   if(searchTerm.length > 0) {
  //     axios({
  //       method: "GET",
  //       dataResponse: "json",
  //       url: `https://trackapi.nutritionix.com/v2/search/instant`,
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-app-id": "081b5ced",
  //         "x-app-key": "424576e2352c2f4a8443cce73c99e5d7"
  //       },
  //       params: {
  //         "query": searchTerm
  //       }
  //     }).then((res) => {
  //       const commonArray =res.data.common;
  //       setFoodArray(filterByTagId(commonArray))
  //     })
  //   }

  // }, [searchTerm]);


  // use effect to handle firebase
    // get the data from firebase
  useEffect(() => {
    // setting up connection to database
    // our notes called FirebaseProject just firebase
    const database = getDatabase(firebaseProject);

    // this is dbRef in our notes, BUT, what it IS is the location of the root of our database! database root address! where our data goes to live a nice quiet life hopefully
    const dbRootAddress = ref(database);

    onValue(dbRootAddress, (response) => {
      // console.log(response.val());
      // format the data we get back first
      // our object from firebase looks like this
      // Object { Book1: "Catcher In the Rye", Book2: "To Kill A Mockingbird", Book3: "Clifford The Big Red Dog" }

      const newFood = [];

      // look through our data and put the data in the temp array
      // newBooks is called newState in our notes
      const data = response.val();

      for (let key in data) {
        // fill the array with { key: book1, name: "Title of the book"} type objects
        newFood.push({key: key, foodDetails: data[key]});
      }

      // put new books into books
      setSavedFood(newFood);

    })
  }, []);


  

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


  const handleCompare = () => {
    setComparisonsArray([...comparisonsArray, foodItemDetails])
  }



  return (
    <div>
      <header className='headerSection'>
            <nav>
              <ul>
                <li><Link to="/">Find Items</Link></li>
                <li><Link to="/saved" >Saved Items</Link></li>
                <li><Link to="/comparison">Comparisons</Link></li>
              </ul>
            </nav>
            
            <h1>Nutrition Navigator</h1>
    
      </header>
      <main>
       
        <Routes>
          <Route path='/' element={ <FoodList handleCompare={handleCompare} savedFood={savedFood} foodItemDetails={foodItemDetails} setFoodItemDetails={setFoodItemDetails}/>}/>

          <Route path='/saved' element={ <SavedList foodArray={savedFood} />}/>

          <Route path='/comparison' element={ <Comparisons comparisonsArray={comparisonsArray} />}/>
        </Routes>

      </main>

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



