export const filteredArray = (arrayToFilter) => {
    const tempArray = [];
    const filteredArray = arrayToFilter.filter((individualFood) => {

        if (!tempArray.includes(individualFood.tag_id)) {
            tempArray.push(individualFood.tag_id);
            return individualFood
        }

    })
    return filteredArray
}

// this is an array of the attr_id that we need
const attrObj = {
    318: "vitamin A - IU",
    324: "vitamin D - IU",
    415: "vitamin B-6 - mg",
    401: "vitamin C - mg",
    573: "vitamin E - mg",
    304: "Magnesium - mg",
    309: "Zinc - mg",
    303: "Iron - mg",
    320: "vitamin A - mcg"
}