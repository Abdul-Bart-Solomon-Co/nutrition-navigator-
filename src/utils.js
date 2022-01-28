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
    318: "Vitamin A (IU)",
    324: "Vitamin D (IU)",
    415: "Vitamin B-6 (mg)",
    401: "Vitamin C (mg)",
    573: "Vitamin E (mg)",
    304: "Magnesium (mg)",
    309: "Zinc (mg)",
    303: "Iron (mg)",
    320: "Vitamin A (mcg)"
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

   

// const comparisonObj = { 
// brand_name: "N/A",
// food_name: "burger",
// full_nutrients: 'someArr',
// nf_calories: 540.14,
// nf_dietary_fiber: "N/A",
// nf_protein: 34.28,
// nf_saturated_fat: 10.52,
// nf_sodium: 791,
// nf_sugars: "N/A",
// nf_total_carbohydrate: 40.27,
// nf_total_fat: 26.56}
// a function to rename keys and add units (primarily for comparisons object to be used with chart.js)
export const exchangeObject = (comparisonObj) => {
    const newComparisonObj = {
        food_name: comparisonObj.food_name,
        'Full Nutrients': comparisonObj.full_nutrients,
        'Calories (kcal)': comparisonObj.nf_calories,
        'Dietary Fiber (grams)': comparisonObj.nf_dietary_fiber,
        'Protein (grams)': comparisonObj.nf_protein,
        'Saturated Fat (grams)': comparisonObj.nf_saturated_fat,
        'Sodium (mg)': comparisonObj.nf_sodium,
        'Sugars (grams)': comparisonObj.nf_sugars,
        'Total Carbohydrates (grams)': comparisonObj.nf_total_carbohydrate,
        'Total Fat (grams)': comparisonObj.nf_total_fat
    }

    return newComparisonObj;
}

// First we need to turn array to an object

// unfortunately we need to make a vitamins object
export const vitaminsExchange = (comparisonObj) => {
    const nutrientObjectFinal = {}
    comparisonObj.full_nutrients.forEach((nutrientObject) => {
        nutrientObjectFinal[nutrientObject['name']] = nutrientObject['value'];
    })

    const newComparisonObj = {
        food_name: comparisonObj.food_name,
        'Iron (mg)': nutrientObjectFinal['Iron (mg)'], 
        'Magnesium (mg)': nutrientObjectFinal['Magnesium (mg)'], 
        'Zinc (mg)': nutrientObjectFinal['Zinc (mg)'],
        'Vitamin A (mcg)': nutrientObjectFinal['Vitamin A (mcg)'], 
        'Vitamin C (mg)': nutrientObjectFinal['Vitamin C (mg)'], 
        'Vitamin B-6 (mg)': nutrientObjectFinal['Vitamin B-6 (mg)'], 
        'Vitamin D (IU)': nutrientObjectFinal['Vitamin D (IU)'],
        'Vitamin E (mg)': nutrientObjectFinal['Vitamin E (mg)'],
    }

    return newComparisonObj;

}

export const trimNumberToOneDecimal = (num) => {
    let rounded = Math.round(num * 10) / 10;
    let fixed = rounded.toFixed(1);
    return parseFloat(fixed)
}