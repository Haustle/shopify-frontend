import { createRef, useEffect, useState } from "react";
import SearchResults from '@components/Content';
import Completionbar from '@components/CompletionBar';
import MovieDetails from '@components/MovieDetails';
import fetch from 'node-fetch';


const Home = ({ api_key}) => {
  const NUM_OF_MOVIES = 5;
  const STORAGE_KEY = "TYRUS_SHOPPIES_PROJECT"
  // ref used on search element
  const searchElement = createRef();
  const movieDetailDom = createRef();
  const [initialRender, setInitialRender] = useState(false);

  // maintain search data and search term / query
  const [term, setTerm] = useState("") // this is the search term from input
  const [data, setData] = useState([]) // returned search data
  const [noms, setNoms] = useState([]); // user nominations
  const [ids, setIds] = useState(new Set()); // set of the movie id's from nom

  // this is the popup display for movie details
  const [movieWindow, setMovieWindow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({})

  // grab the term the user searched and clear the box
  async function search(){
    const entry = searchElement.current.value;
    if(entry){
      searchElement.current.value = "";
      setTerm(entry);
    }
    
  }

  // fetch movie data by search term
  const movieSearch = async () => {
    // formmating url to get data
    const url = `https://www.omdbapi.com/?apikey=${api_key}&s=${term}`;
    const res = await fetch(url);
    const retJson = await res.json();
    return retJson;
  }
  
  useEffect(() => {
    // make sure there's no empty term
    
    if(term){
      const fetchData = async () => {
        var somedata = await movieSearch();
        var {Search} = (somedata)
        if(Search){
          Search = Search.filter(movie => movie.Type == "movie")
          setData(Search)
        }
        else{
          setData([])
        }
      }
      fetchData()
    }
  },[term])

  // allow for users to hit 'Enter' to search inside the search bar
  const inputMonitor = (e) => {
    if(e.key == 'Enter'){
      search();
    }

    // Allow users to reset the value by hitting 'Escape'
    else if(e.key == 'Escape'){
      searchElement.current.value = "";
    }
  }

  const addMovie = (movieDOM) => {
    console.log("Trying to add movie");
    // get the imdbID from data-id
    const id = movieDOM.target.dataset.id;
    if (noms.length < NUM_OF_MOVIES && !ids.has(id)) {
      let tempIds = ids;
      tempIds.add(id);
      setIds(tempIds);

      // filter movie from search
      const foundMovie = data.filter(movie => movie.imdbID == id)[0];

      setNoms([...noms, foundMovie])
      setData(data);
    }
  }
  const openMovie = (movieInfo) => {
    console.log(movieInfo)
    setSelectedMovie(movieInfo)
    setMovieWindow(true)
  }

  const removeMovie = (movieDOM) => {
    const id = movieDOM.target.dataset.id;

    let tempSet = ids;
    tempSet.delete(id);
    setIds(tempSet);
    // remove the move from nominations array state
    setNoms(noms.filter(movie => movie.imdbID != id))
  }

  const setSaveNoms = _ => {
    console.log('Just saved noms!')
    localStorage.setItem(STORAGE_KEY, JSON.stringify(noms));
  }

  const getSavedNoms = _ => {
    const nomString = localStorage.getItem(STORAGE_KEY);
    console.log(`nomString: ${nomString}`);
    return nomString
  }
  useEffect(() => {
    console.log("hello");
    if(!initialRender){
      setInitialRender(true);
    }
    else{
      setSaveNoms();
      if (noms.length === NUM_OF_MOVIES) {
        console.log("We have 5");
      }
    }
    
  },[noms])

  

  // Watch for mount to load in
  useEffect(() => {
    const savedNominationsString = getSavedNoms();
    const stringToObject = JSON.parse(savedNominationsString);
    console.log("below is saves")
    console.log(stringToObject)
    setNoms(stringToObject);
  },[])

  return(
    <>
      <div id="wrapper">
        {movieWindow ? <MovieDetails movieObject={selectedMovie} setMovieWindow={setMovieWindow} ref={movieDetailDom} /> : null}

        {/* Nav Bar */}
        <div id="nav">
          <div className="left-side">
            <img src="shopify.png" />
            <span>Shoppies</span>
          </div>

          <div className="search-container">
            <input id="search" type="text" ref={searchElement} placeholder="Enter movie name (Eg. Dune)" onKeyDown={inputMonitor}/>
            <div className="search" onClick={search}>Search</div>
          </div>
        </div>

        {/* Loading bar for tracking */}

        {/* Everything else */}
        <div className="all">
        <Completionbar current={noms.length} limit={NUM_OF_MOVIES}/>
          <div className="mainframe">
            <div className="nominees">

              <div>
                <h3 className="your-choices">Your Choices</h3>
                {noms && noms.length > 0 ? (
                  noms.map((movie, index) => (
                    <div className="nominee" onClick={() => openMovie(movie)} key={`${index}${movie.imdbID}`}>{movie.Title}</div>
                  ))
                ) : <div className="no-selection-made">No Selections</div>
                }
              </div>
              
              <div className="autosave">Autosave: On</div>
            </div>

              {/* <Content> is the search window */}
              <SearchResults data={data} query={term} addMovie={addMovie} ids={ids} removeMovie={removeMovie} openMovie={openMovie}/>
          </div>
        </div>
        
        
      </div>
      
      <style jsx>{`
        .no-selection-made{
          margin-top: 20px;
        }
        .your-choices{
          margin: 0;
          padding: 0;
        }
        .autosave{

          color: #637381;
          width: max-content;
          font-size: .9rem;
        }

        .all{
          margin-top: 100px;
          height: 100%;
        }
        .nominee:not(:first-child){
          margin-top: 15px;
        }
        .nominee{
          color: #637381;
          cursor: pointer;
          transition: all 0.2s;
          width: max-content;
          padding: 5px 10px;
          border-radius: 5px;
          background-color: #f4f6f8;


        }
        .nominee:hover{
          color: black;
          background-color: #dfe3e8;

        }
        
        .nominees{
          width: 35%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

        }
        .mainframe{
          display: flex;
          height: 100%;
        }
        input[type="text"]{
            font-size:15px;
        }

        #wrapper{
          display: flex;
          flex-direction: column;
          height: 700px;
        }
        .search-container{
          display: flex;
          align-items: center;

        }
        .search{
          transition: all 0.3s;
          cursor: pointer;
          color: #548687;
          background-color: #C5E99B;
          padding: 5px;
          height: max-content;
          border-radius: 5px;
          margin-left: 10px;
        }
        .search:hover{
          opacity: 0.7;
        }
        .left-side img{
          height: 1.2rem;
          margin-right: 10px;
        }
        .left-side{
          display: flex;
          align-items: center;
        }

        #nav{
          display: flex;
          margin: 0 auto;
          width: 100%;
          padding: 0 10px;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
        }
        #search{
          border: none;
          border: 1px solid #e4dede;
          padding: 10px 20px;
          border-radius: 5px;
          outline: none;

      `}</style>
    </>
  )
}


// Need to fetch my API key before hand
export async function getStaticProps(){
  const api_key = process.env.API_KEY;
  return {
    props: {
      api_key
    }
  }
}

export default Home;