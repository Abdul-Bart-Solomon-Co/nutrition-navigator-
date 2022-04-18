import { useState } from 'react';
// Pagination component format taken from https://academind.com/tutorials/reactjs-pagination
// Requires data as an array or info you want to render
// Requires a component that will be used to render that data
// Requires a title
// data limit which will dictate how much data can be in each page
// and a componentProps object with all the other necessary props for the rendered component in it
// Must pass component props under the componentProps object and then descructure them out in the component

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Pagination = (props) => {
    const { data, RenderedComponent, title, dataLimit, componentProps } = props;
    let pageLimit = props.pageLimit;
    const pages = Math.round(data.length/dataLimit)
    const [ currentPage, setCurrentPage ] = useState(1)
    //If the maximum number of pages possible based on the data limit is less then the set page limit
    // This will reduce the page limit to that. eg if page limit is set to 5 when pagination is called
    // But there is only enough data for 3 pages based on the datalimit per page then it will only show 3 pages
    if (pages < pageLimit){
        pageLimit = pages;
    }

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const goToPreviousPage = () => {
        setCurrentPage(currentPage -1)
    }

    const changePage = (event) => {
        //Turn the page number clicked to a number
        const pageNumber = parseInt(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    // Cuts data into portion based off of current page and the data limit
    const paginateData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    }

    //Gets page numbers to be displayed
    //Returns array of page numbers based on current page and page limit
    const getPageNumbers = () => {
        const firstPage = Math.floor((currentPage -1)/pageLimit) * pageLimit
        const pageNumberArray = [];
        for (let i = firstPage + 1; i <= firstPage + pageLimit ; i++){
            pageNumberArray.push(i);
        }
        return pageNumberArray
    }

    return(
        <div>
            <h2>{title}</h2>

            {/* This is the portion the paginated data will be rendered using the passed in component */}
            <div className="dataContainer">
                {
                    paginateData().map((data, index) => {
                        return(
                            <RenderedComponent key={index} data={data} componentProps={componentProps} />
                        )
                        
                    })
                }
            </div>
            {/* This is the page selector buttons at the bottom */}
            {/* Current page button will be disabled along with the change to prev button on page 1 and change to next button on the last page */}
            <div className="pagination">
                <button 
                onClick={goToPreviousPage}
                className={`prev ${currentPage === 1 ? "disabled" : ""}`}
                disabled={currentPage === 1 ? true : false}
                > <FaChevronLeft /> 
                </button>

                {
                    getPageNumbers().map((number, index) => {
                        return (
                            <button
                                key={index}
                                onClick={changePage}
                                className={`pageNumber ${currentPage === number ? "active" : ""}`}
                                disabled={currentPage === number ? true : false}
                            > {number}
                            </button>
                        )
                        
                    })
                }

                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === pages ? "disabled" : ""}`}
                    disabled={currentPage === pages ? true : false}
                > <FaChevronRight />
                </button>

            </div>

        </div>
    )
}

export default Pagination;
