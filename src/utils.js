export const filterByTagId = (arrayToFilter) => {
    const tempArray = [];
    const filteredArray = arrayToFilter.filter((individualFood) => {

        if (!tempArray.includes(individualFood.tag_id)) {
            tempArray.push(individualFood.tag_id);
            return individualFood
        }

        return false;

    })
    return filteredArray
}

// this is an array of the attr_id that we need
const attrObj = {
    318: "vitamin A",
    324: "vitamin D",
    415: "vitamin B-6",
    401: "vitamin C",
    573: "vitamin E",
    304: "Magnesium",
    309: "Zinc",
    303: "Iron",
    320: "vitamin A"
}

// This is an object of unit values that we need
const unitObj = {
    318: "IU",
    324: "IU",
    415: "mg",
    401: "mg",
    573: "mg",
    304: "mg",
    309: "mg",
    303: "mg",
    320: "mcg"
}

// A function that will return a new nutrients array with attribute id's changed to names
export const filteredNutrients = (nutrientsArray) => {
    const newArr = nutrientsArray.filter((individualNutrientAttribute) => {
        if(attrObj.hasOwnProperty(individualNutrientAttribute.attr_id)) {
            return true;
        }
        return false;
    }).map((individualNutrientObject) => {
        individualNutrientObject.name = attrObj[individualNutrientObject.attr_id];
        individualNutrientObject.unit = unitObj[individualNutrientObject.attr_id];

        return individualNutrientObject;
    })

    return newArr;

};

export const makeNutritionObj = (apiRes) => {

    const someArray = ["nf_calories", "nf_dietary_fiber", "nf_protein", "nf_saturated_fat", "nf_sugars", "nf_total_carbohydrate", "nf_total_fat", "nf_sodium", "full_nutrients", "food_name", "brand_name", "photo",]

    const nutritionObj = {}

    const foodObj = apiRes.data.foods[0]
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
        
    return nutritionObj;

   
}