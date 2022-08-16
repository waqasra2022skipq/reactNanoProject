import "./App.css";
import { useState } from "react";
import ListBooks from "./components/ListBooks";
import SearchBook from "./components/SearchBook";
import { search } from "./BooksAPI"

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [searchedBooks, updateSearchedBooks] = useState([])
  let switchSearch = ()=>{
    setShowSearchpage(!showSearchPage)
  }
  const updateSearch = async(val)=>{
    let res = await search(val)
    
    if(res == undefined || res.error == '"empty query"') {
      updateSearchedBooks([])
    } else {
      updateSearchedBooks(res)
    }
  }

  return (
    <div className="app">
      {
        showSearchPage ? (
          <SearchBook showSearchPage={switchSearch} onTextEntered={updateSearch} searchedBooks={searchedBooks}/>
        ):
        (
          <ListBooks showSearchPage={switchSearch}/>
        )
      }
    </div>
  );
}

export default App;
