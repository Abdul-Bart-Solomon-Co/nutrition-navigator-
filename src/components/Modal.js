import { MdClose } from 'react-icons/md';
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
                                <p>Created by Abdul Abdi, Bart Batalinski and Solomon Serry @ Juno College</p>

                                <h3>About Us</h3>

                                <p>This is an app we created that will give you nutrient info about your favorite foods.</p>

                                <p>Type your favorite food(s) in the search menu and you will receive a list of food.  Choose one of those item and you will instatly get back all the nutrient info.</p>

                                <p>You also have the option to save or compare your favorite foods.  If you hit save that item will be saved in our "Saved Items Page".  For our compare option you can choose up to 3 food items per chart.  Once you finised choosing all your food options click on the compared page and you will see the chart(s) with all your food options.</p>

                                <p>Enjoy finding all the info on your favorite foods.</p>

                                <button onClick={ ()=> setShowModal(prev => !prev)} className='closeIcon'>
                                    <MdClose />
                                </button>
                        </div>
                    </animated.div>

            </div> : null}
        </div>
    )
}