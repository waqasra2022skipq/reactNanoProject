import "./App.css";
import ListBooks from "./components/ListBooks";
import SearchBook from "./components/SearchBook";
import { getAll, update, search } from "./BooksAPI"
import { useState,useEffect } from "react"

import {Routes, Route} from 'react-router-dom'
function App() {
  const [books, setBooks] = useState([]) 
    const [wantToRead, updateWantToRead] = useState([])
    const [currentlyReading, updateCurrentlyReading] = useState([])
    const [read, updateRead] = useState([])
    const [idHolder, updateIDHolder] = useState({})
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
        const obj = {}

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
            obj[book.id] = book.shelf
        })
        updateRead(reads)
        updateCurrentlyReading(currentlyReadings)
        updateWantToRead(wantToReads)
        updateIDHolder(obj)
    }

    const changeShelf = async (book)=>{
      await update(book, book.shelf)
      books.push(book)
      setBooks(books)
      updateCats(books)
    }
    const [searchedBooks, updateSearchedBooks] = useState([])
    const updateSearch = async(val)=>{
        
        let res = await search(val)
        if(res !== undefined && res.error !== 'empty query') {
          const syncedBooks = res.map((book)=>{
            if(book.id in idHolder) {
              book.shelf = idHolder[book.id]
            } else {
              book.shelf = 'none'
            }
            return book
          })
          updateSearchedBooks(syncedBooks)
        } else {
          updateSearchedBooks([])
        }
    }
  return (
    <div className="app">
        <Routes>
          <Route path="/" exact element={<ListBooks changeShelf={changeShelf} read={read} wantToRead={wantToRead} currentlyReading={currentlyReading} />} />
          <Route path="/search" exact element={<SearchBook onTextEntered={updateSearch} searchedBooks={searchedBooks} changeShelf={changeShelf} />} />
        </Routes>
    </div>
  );
}

export default App;
