import BookShelf from "./BookShelf"

import { Link } from "react-router-dom";

const ListBooks = (props)=>{
    
    return(
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  <BookShelf title="Currently Reading" books={props.currentlyReading} changeShelf={props.changeShelf}/>
                  <BookShelf title="Want To Read" books={props.wantToRead} changeShelf={props.changeShelf}/>
                  <BookShelf title="Read" books={props.read} changeShelf={props.changeShelf}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">
                Add a book
              </Link>
            </div>
          </div>
        
    )
}
export default ListBooks
