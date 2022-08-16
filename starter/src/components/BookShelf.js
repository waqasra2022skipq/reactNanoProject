import Book from "./Book"
import SearchBook from "./SearchBook";

const BookShelf = (props)=>{
    const books = props.books
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {
                    books.map((book, key)=>{
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
export default BookShelf