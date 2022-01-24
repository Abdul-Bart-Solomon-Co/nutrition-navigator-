export const SavedList = ({ foodArray }) => {

    return (
        <div>
        {
        foodArray.map((item) => {
            return (
                <div>
                    {item.key}
                </div>

            )
        })
    }
    </div>
    )
}