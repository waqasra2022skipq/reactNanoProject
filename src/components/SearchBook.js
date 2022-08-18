import Book from "./Book"
import { Link } from "react-router-dom";
import { useState } from "react";

const SearchBook = (props)=>{
  const [query, setQuery] = useState("") 
    const getTheInput = (e)=>{
      setQuery(e.target.value)
      props.onTextEntered(e.target.value)
    }
    const books = props.searchedBooks
    return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search" onClick={getTheInput}>
            </Link>
            <div className="search-books-input-wrapper">
              <input
                onChange={getTheInput}
                type="text"
                value={query}
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