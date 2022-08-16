import BookShelf from "./BookShelf"
import { getAll, update, search } from "../BooksAPI"
import { useState,useEffect } from "react"
import SearchBook from "./SearchBook";


const ListBooks = (props)=>{
    const [books, setBooks] = useState([]) 
    const [wantToRead, updateWantToRead] = useState([])
    const [currentlyReading, updateCurrentlyReading] = useState([])
    const [read, updateRead] = useState([])
    useEffect(()=>{
        async function fetchBooks(){
            let reBooks = await getAll()
            setBooks(reBooks)
            updateCats(reBooks)
        }
        fetchBooks()
    },[])
    
    const updateCats = (books)=>{
        const reads = []
        const wantToReads = []
        const currentlyReadings = []

        books.forEach((book)=>{
            if(book.shelf === 'read') {
                reads.push(book)
            }
            if(book.shelf === 'wantToRead') {
                wantToReads.push(book)
            }
            if(book.shelf === 'currentlyReading') {
                currentlyReadings.push(book)
            }
        })
        updateRead(reads)
        updateCurrentlyReading(currentlyReadings)
        updateWantToRead(wantToReads)
    }

    const changeShelf = (book)=>{
        update(book, book.shelf) 
        updateCats(books)
    }

    const [showSearchPage, setShowSearchpage] = useState(false);
    const [searchedBooks, updateSearchedBooks] = useState([])
    let switchSearch = ()=>{
        setShowSearchpage(!showSearchPage)
    }
    const updateSearch = async(val)=>{
        let res = await search(val)
        
        if(res === undefined || res.error === 'empty query') {
            updateSearchedBooks([])
        } else {
            updateSearchedBooks(res)
        }
    }
    return(
        <div>
        {
            !showSearchPage ? (<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  <BookShelf title="Currently Reading" books={currentlyReading} changeShelf={changeShelf}/>
                  <BookShelf title="Want To Read" books={wantToRead} changeShelf={changeShelf}/>
                  <BookShelf title="Read" books={read} changeShelf={changeShelf}/>
              </div>
            </div>
            <div className="open-search">
              <a href="#" onClick={switchSearch}>Add a book</a>
            </div>
          </div>):(
            <SearchBook showSearchPage={switchSearch} onTextEntered={updateSearch} searchedBooks={searchedBooks} changeShelf={changeShelf}/>
          )
        }
        </div> 
        
    )
}
export default ListBooks