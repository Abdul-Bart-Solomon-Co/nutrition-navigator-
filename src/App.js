import './App.css';

function App() {
  return (
    <div>
      
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



