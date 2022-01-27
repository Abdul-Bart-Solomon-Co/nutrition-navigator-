import { MdClose } from 'react-icons/md';
import { GiFruitTree } from 'react-icons/gi';
import { useSpring, animated } from 'react-spring';


export const Modal = ({showModal, setShowModal}) => {
    
    const animate = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });

    return(
        <div>
            {showModal ? 
            
            <div className="modalContainer">
                    <animated.div style={animate}>
                        <div className="modalContentContainer">
                            <h2>Welcome To the Nutrition Navigator App</h2>

                                <h3>About Us</h3>

                                <p>This is an app we created that will give you nutritional info about your favorite foods.</p>

                                <p>Type your favorite food in the search bar and you will receive a list of food, both "common" and "branded".  Choose one of the food items from our list and you will instatly get back all the nutritional info.</p>

                                <p>You also have the option to "save" or "compare" your favorite foods.</p> 
                                
                                <p>If you hit the "save" button that item will be saved on our "Saved Items" Page.  For our "compare" option, simply hit the compare button and it will add it to the comparisons chart.  There is a maximum of 3 items per chart but you can have multiply charts at the same time.  Once you've finished choosing all the food options you'd like to compared, click on the "Comparisons" page and you will see the chart(s) with all your food choices.</p>

                                <p>Thanks for visting and enjoy finding all the info on your favorite foods.</p>

                                <button onClick={ ()=> setShowModal(prev => !prev)} className='closeIcon'>
                                    <MdClose />
                                </button>

                                <div className='logoContainer'>
                                    <GiFruitTree />
                                    <h4>NutriNav</h4>
                                </div>
                        </div>
                    </animated.div>

            </div> : null}
        </div>
    )
}