// Pagination component fomrat taken from https://academind.com/tutorials/reactjs-pagination
const Pagination = ({data, Component, title, pageLimit, dataLimit, handleClick}) => {
    const [pages] = useState(Math.round(data.length/data.limit))
    const [ currentPage, setCurrentPage ] =useState(1)

    const goToNextPage = () => {
        setCurrentPage((page) => page + 1)
    }

    const goToPreviousPage = () => {
        setCurrentPage((page) => page - 1)
    }

    const changePage = (event) => {
        //Turn the page number clicked to a number
        const pageNumber = parseInt(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const paginateData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    }

    const getPageNumbers = () => {
        const firstPage = Math.floor((currentPage -1)/pageLimit) * pageLimit
        const pageNumberArray = [];
        for (let i = firstPage; i < firstPage + pageLimit; i++){
            pageNumberArray.push(i);
        }
        return pageNumberArray
    }

    return(
        <div>
            <h2>{title}</h2>

            <div className="dataContainer">
                {
                    getPaginatedData().map((data, index) => {
                        <Component key={index} handleClick={handleClick} {...data}/>
                    })
                }
            </div>

            <div className="pagination">
                <button 
                onClick={goToPreviousPage}
                className={`prev ${currentPage === 1 ? "disabled" : ""}`}
                > &#60; 
                </button>

                {
                    getPageNumbers().map((number, index) => {
                        <button
                            key={index}
                            onClick={changePage}
                            className={`pageNumber ${currentPage === 1 ? "disabled" : ""}`}
                        > &#60;
                        </button>
                    })
                }

                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === pages ? "disabled" : ""}`}
                > &#62;
                </button>

            </div>

        </div>
    )
}

export default Pagination;
