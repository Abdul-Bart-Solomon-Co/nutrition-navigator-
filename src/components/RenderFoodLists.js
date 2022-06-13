import React, {useState} from 'react';
import Pagination from "./Pagination.js";
import FoodListItem from "./FoodListItem.js";
import BrandedFoodListItem from "./BrandedFoodListItem";

export default function RenderFoodLists({
    commonFoodArray,
    brandedFoodArray,
    setFoodItemName,
    setDisabled,
    setBrandId 
}) {

    const [ foodTypeListed, setFoodTypeListed ] = useState("common");

    const handleCommonType = () => {
        setFoodTypeListed("common");
    }

    const handleBrandedType = () => {
        setFoodTypeListed("branded");
    }

    const handleDetailClick = (foodName) => {
        setFoodItemName(foodName);
        setDisabled(false);
    }

    const handleBrandedDetailClick = (nixId) => {
        setBrandId(nixId);
        setDisabled(false);
    }

  return (
    <>
                                {/* Buttons that toggle common and branded foot lists */}

                                {(commonFoodArray.length > 0 || brandedFoodArray.length > 0)
                                    && <div className="foodTypeButtonContainer">
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
                                }



                                {
                                    // Ternary changes which food list type is displayed depending on button selected
                                    (commonFoodArray.length > 0 && foodTypeListed === "common")
                                        && <Pagination
                                            data={commonFoodArray}
                                            RenderedComponent={FoodListItem}
                                            title="Common Food"
                                            pageLimit={5}
                                            dataLimit={5}
                                            componentProps={handleDetailClick}
                                        />
                                }
                                {
                                    // Ternary changes which food list type is displayed depending on button selected
                                    (brandedFoodArray.length > 0 && foodTypeListed === "branded")
                                        && <Pagination
                                            data={brandedFoodArray}
                                            RenderedComponent={BrandedFoodListItem}
                                            title="Branded Food"
                                            pageLimit={5}
                                            dataLimit={5}
                                            componentProps={handleBrandedDetailClick}
                                        />
                                }
                          </>
  )
}
