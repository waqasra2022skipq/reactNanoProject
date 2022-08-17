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

    const changeShelf = async (book)=>{
      await update(book, book.shelf)
      updateCats(books)
    }
    const [searchedBooks, updateSearchedBooks] = useState([])
    const updateSearch = async(val)=>{
        if(val === "") return
        let res = await search(val)
        if(res !== undefined && res.error !== 'empty query') {
          updateSearchedBooks(res)
        }
    }
  return (
    <div className="app">
        <Routes>
          <Route path="/" exact element={<ListBooks changeShelf={changeShelf} read={read} wantToRead={wantToRead} currentlyReading={currentlyReading} />} />
          <Route path="/search" exact element={<SearchBook onTextEntered={updateSearch} searchedBooks={searchedBooks} changeShelf={changeShelf}/>} />
        </Routes>
    </div>
  );
}

export default App;
