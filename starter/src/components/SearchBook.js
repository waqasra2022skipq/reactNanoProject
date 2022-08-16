import Book from "./Book"

const SearchBook = (props)=>{
    const getTheInput = (e)=>{
      props.onTextEntered(e.target.value)
    }
    const books = props.searchedBooks
    return(
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => props.showSearchPage()}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                onKeyDown={getTheInput}
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                books && books.map((book, key)=>{
                        return(
                            <li key={key}>
                                <Book book={book} changeShelf={props.changeShelf}/>
                            </li>
                        )
                    })
                }
            </ol>
          </div>
        </div>
    )
}
export default SearchBook