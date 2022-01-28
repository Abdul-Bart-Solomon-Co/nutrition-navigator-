import { Route, Routes, Link } from "react-router-dom";
import firebaseProject from './firebaseSetup.js';
import { getDatabase, ref, onValue } from 'firebase/database';
import { SavedList } from './components/SavedList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GiHamburgerMenu, GiFruitTree } from 'react-icons/gi';
import { FaLinkedin, FaGithubSquare, FaCopyright } from 'react-icons/fa';



import { useState, useEffect } from 'react';
import Comparisons from './components/Comparisons';
import { FoodList } from './components/FoodList';
function App() {


  const [ foodItemDetails, setFoodItemDetails ] = useState({});
  const [ comparisonsArray, setComparisonsArray ] = useState([]);

  // keeps track of how many charts we have in the application
  const [ chartNumber, setChartNumber ] = useState(0);

  // list of saved foods
  const [ savedFood, setSavedFood ] = useState([]);

  // hamburger menu open/closed state
  const [ navOpen, setNavOpen ] = useState(false);


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

      const newFood = [];

      // look through our data and put the data in the temp array
      // newBooks is called newState in our notes
      const data = response.val();

      for (let key in data) {
        newFood.push({key: key, foodDetails: data[key]});

      }

      // put new books into books
      setSavedFood(newFood);

    })
  }, []);


  const handleCompare = () => {
    setComparisonsArray([...comparisonsArray, foodItemDetails])

    // checks if array has enough charts to start a new one
    if((comparisonsArray.length % 3 === 0 && comparisonsArray.length > 0) || (comparisonsArray.length === 0)) {
      setChartNumber(chartNumber + 1);

        // const clearWaitingQueue = () => {
        //   // Easy, right 😎
        //   toast.clearWaitingQueue();
        // }

        const currentChartNumber = chartNumber + 1;
        toast.success(`You have ${currentChartNumber} ${currentChartNumber > 1 ? 'charts' : 'chart'} stored in your comparisons`);

      }
    }

    // handles toggling hamburger menu
    const handleToggle = () => {
      setNavOpen(prev => !prev);
    }

    // nav links set menu to closed
    const closeMenu = () => {
      setNavOpen(false)
    }




  return (
    <div>
      <header className="headerSection">
        <nav className="wrapper navBar">
          <div className='logoContainer'>
            <GiFruitTree />
            <h4>NutriNav</h4>
          </div>
          <button className="hamburger-btn-container" onClick={handleToggle}>
            {((chartNumber > 0) && !navOpen) && (
              <div className='chart-notification-container'>
                <p className="chart-notification">{chartNumber}</p>
              </div>
              )}
            { navOpen ? (
              <GiHamburgerMenu style={{ color: "#b20061", fontSize: "1.2rem", transition: "color 0.1s ease-in-out" }} />
            ) : (
              <GiHamburgerMenu style={{ color: "#350482", fontSize: "1.2rem", transition: "color 0.1s ease-in-out" }}/>
            )

            }
          </button>
          <ul className={`nav-ul ${navOpen ? " showMenu" : ""}`}>
            <li className="navLink">
              <Link to="/" onClick={() => closeMenu()}>
                Find Items
              </Link>
            </li>
            <li className="navLink">
              <Link to="/saved" onClick={() => closeMenu()}>
                Saved Items
              </Link>
            </li>
            <li className="navLink">
              {chartNumber > 0 && (
                  <div className='chart-notification-container'>
                  <p className="chart-notification">{chartNumber}</p>
                </div>
              )}
              <Link to="/comparison" onClick={() => closeMenu()}>
                Comparisons
              </Link>
            </li>
          </ul>
        </nav>

        <h1>Nutrition Navigator</h1>
      </header>
      <main>

        <div className='mainBackground'>
            <Routes>
              <Route path='/' element={ <FoodList handleCompare={handleCompare} savedFood={savedFood} foodItemDetails={foodItemDetails} setFoodItemDetails={setFoodItemDetails}/>} />

              <Route path='/saved' element={ <SavedList foodArray={savedFood} />}/>

              <Route path='/comparison' element={ <Comparisons comparisonsArray={comparisonsArray} setComparisonsArray={setComparisonsArray} setChartNumber={setChartNumber} />}/>
            </Routes>
        </div>
      </main>

      <footer>
          <h2 className="footer-header"><FaCopyright /> 2022 Created @ <a href="https://junocollege.com/">Juno College by: </a>  </h2>
          <ul className="footer-name-container">
            <li className="footer-name">
              <p className="bolded-names">Abdul Abdi</p>
              <a href="https://www.linkedin.com/in/abdul-abdi-5321871b2/" target='_blank' rel="noreferrer"> <FaLinkedin /> </a>
              <a href="https://github.com/Abdul1Abdi" target='_blank' rel="noreferrer"> <FaGithubSquare />, </a>
            </li>
            <li className="footer-name">
                <p className="bolded-names">Bart Batalinski</p>
                <a href="https://www.linkedin.com/in/bart-batalinski/" target='_blank' rel="noreferrer"> <FaLinkedin /> </a>
                <a href="https://github.com/bbatal" target='_blank' rel="noreferrer"> <FaGithubSquare />, </a>
            </li>
            <li className="footer-name">
                <p className="bolded-names">and Solomon Serry</p>
                <a href="https://www.linkedin.com/in/solomon-serry-b931b3225" target='_blank' rel="noreferrer"> <FaLinkedin /> </a>
                <a href="https://github.com/SolomonSerry" target='_blank' rel="noreferrer"> <FaGithubSquare /> </a>
            </li>
          </ul>
           
      </footer>

      {chartNumber ? (
        <ToastContainer
          theme="colored"
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
      ) : null}
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



