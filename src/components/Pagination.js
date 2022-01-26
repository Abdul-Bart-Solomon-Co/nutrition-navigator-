import { useState } from 'react';
// Pagination component format taken from https://academind.com/tutorials/reactjs-pagination
// Must pass component props under the componentProps object and then descructure them out in the component

const Pagination = (props) => {
    const { data, RenderedComponent, title, dataLimit, componentProps } = props;
    let pageLimit = props.pageLimit;
    const [pages] = useState(Math.round(data.length/dataLimit))
    const [ currentPage, setCurrentPage ] =useState(1)

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

            <div className="dataContainer">
                {
                    paginateData().map((data, index) => {
                        return(
                            <RenderedComponent key={index} data={data} componentProps={componentProps} />
                        )
                        
                    })
                }
            </div>

            <div className="pagination">
                <button 
                onClick={goToPreviousPage}
                className={`prev ${currentPage === 1 ? "disabled" : ""}`}
                disabled={currentPage === 1 ? true : false}
                > &#60; 
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
                > &#62;
                </button>

            </div>

        </div>
    )
}

export default Pagination;
