const Book = (props)=>{
    const book = props.book
    console.log()
    const authors = (book.authors == undefined) ? []:book.authors 
    const imageLinks = (book.imageLinks == undefined) ? {thumbnail:''}:book.imageLinks
    const changeShelf = (e)=>{
        if(e.target.value === 'none') return
        book.shelf = e.target.value
        props.changeShelf(book)
    }
    return(
        <div className="book">
            <div className="book-top">
                <div
                className="book-cover"
                style={{
                    width: 128,
                    height: 193,
                    backgroundImage:
                    'url("'+ imageLinks.thumbnail+'")',
                }}
                ></div>
                <div className="book-shelf-changer">
                <select onChange={changeShelf}>
                    <option value="none">
                    Move to...
                    </option>
                    <option value="currentlyReading" disabled={"currentlyReading" == book.shelf}>
                    Currently Reading
                    </option>
                    <option value="wantToRead" disabled={"wantToRead" == book.shelf}>Want to Read</option>
                    <option value="read" disabled={"read" == book.shelf}>Read</option>
                </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{authors.join(', ')}</div>
            </div>
    )
}
export default Book