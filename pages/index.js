import { createRef, useEffect, useState } from "react";
import SearchResults from '@components/SearchResults';
import Completionbar from '@components/CompletionBar';
import MovieDetails from '@components/MovieDetails';
import fetch from 'node-fetch';
import { ToastContainer, toast } from 'react-toastify';
import PosterList from '@components/PosterList';


const Home = ({ api_key}) => {
  const NUM_OF_MOVIES = 5; // number of nominations
  const STORAGE_KEY = "TYRUS_SHOPPIES_PROJECT" // key for retreiving saved items

  // Use this state to determine if the value of noms is from the intial load
  // this helps later on with loading saved data
  const [initialRender, setInitialRender] = useState(false);

  // ref used on search element
  const searchElement = createRef();

  // maintain search data and search term / query
  const [term, setTerm] = useState("") // this is the search term from input
  const [data, setData] = useState([]) // returned search data
  const [noms, setNoms] = useState([]); // user nominations
  const [ids, setIds] = useState(new Set()); // set of the movie id's from nom
  const [libView, setLibView] = useState(true)

  // this is the popup display for movie details
  const [movieWindow, setMovieWindow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({})


  // grab the term the user searched and clear the box
  async function search(){

    // grab value from input box
    const entry = searchElement.current.value;
    if(entry){ // make sure this isn't an empty string
      searchElement.current.value = "";
      setTerm(entry);
    }
    else{
      setLibView(true);
    }
    
  }

  // fetch movie data by search term
  const movieSearch = async () => {
    // formmating url to get data
    const url = `https://www.omdbapi.com/?apikey=${api_key}&s=${term}&type=movie`;
    const res = await fetch(url);
    const retJson = await res.json();
    return retJson;
  }

  const getMoreInfo = async (imdbID) => {
    const url = `https://www.omdbapi.com/?apikey=${api_key}&i=${imdbID}`
    const res = await fetch(url);
    const retJson = await res.json();
    return retJson;
  }
  
  // This handles the change in search terms
  useEffect(() => {
    // condition to prevent empty strings from being searched
    if(term){
      setLibView(false);
      // async function retreive search data and filtering
      const fetchData = async () => {
        var searchData = await movieSearch();
        var { Search } = searchData // get search data from obj

        if(Search){
          Search = removeSearchDuplicates(Search);
          setData(Search)
        }
        // if we get no search results back we're going to set search data to empty
        else{
          setData([])
        }
      }

      // call function
      fetchData()
    }

  },[term])

  
  // Key monitoring process to allow functionality of using the 'Enter' (to search)
  // and 'Esc' key to clear the search box
  const inputMonitor = (e) => {
    if(e.key == 'Enter'){
      search();
    }
    else if(e.key == 'Escape'){
      searchElement.current.value = "";
    }
  }

  // 
  const addMovie = async (movie) => {
    if (noms.length < NUM_OF_MOVIES && !ids.has(movie.imdbID)) {
      let tempIds = ids;
      tempIds.add(movie.imdbID);
      setIds(tempIds);

      const movieInfo = await getMoreInfo(movie.imdbID);
      setNoms([...noms, movieInfo])
    }
  }

  // this is a process to handle the logic behind opening
  // the movie details window
  const openMovie = (movieInfo) => {
    setSelectedMovie(movieInfo)
    setMovieWindow(true)
  }

  // process to remove a movie from nominations list
  const removeMovie = (id) => {
    let tempSet = ids;
    tempSet.delete(id);
    setIds(tempSet);
    // remove the move from nominations array state
    setNoms(noms.filter(movie => movie.imdbID != id))
  }

  // save our current list of nominations to local storage
  const setSaveNoms = _ => {
    const delim = "==+++==";
    const nomsString = JSON.stringify(noms); // array -> string
    const idsString = JSON.stringify([...ids]); // set -> array -> string
    const savedTerm = `${nomsString}${delim}${idsString}`
    localStorage.setItem(STORAGE_KEY, savedTerm);
  }

  // retrieve movies from localstorage
  const getSavedNoms = _ => {
    const nomString = localStorage.getItem(STORAGE_KEY);
    return nomString
  }

  const notify = (msg) => toast.dark(`${msg}`, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'notification'
  });;

  // monitor the value changes on noms (nominations)
  useEffect(() => {

    // we only want to save nominations when there's been changes
    // and not on the intial load of the state, thus it'd be empty
    // as our intial value is empty

    if(!initialRender){
      setInitialRender(true);
    }
    else{
      setSaveNoms();
      if (noms.length === NUM_OF_MOVIES) {

        notify("We have 5 nominations");
      }
    }
    
  },[noms])

  // When the index page and component mount
  // we need to check and see if there are any previously saved
  // nominations
  useEffect(() => {
    const savedNominationsString = getSavedNoms();
    if(savedNominationsString){
      const delim = "==+++==";

      // split the returned string based on the above delimiter
      const [nomsString, idsString] = savedNominationsString.split(delim)

      // set nominations state
      const nomStringToArray = JSON.parse(nomsString);
      setNoms(nomStringToArray);

      // set the movie ids
      const idsStringToArray = JSON.parse(idsString);
      const idsArrayToSet = new Set(idsStringToArray);
      setIds(idsArrayToSet)
    }
    
  },[])


  // When looking up movies like 'Soul' you're given back multiple movies that share the same
  // imdbID, so we need to filter these out as they're redundant and wasting space
  const removeSearchDuplicates = (searchList) => {
    let idset = new Set();
    let newList = []
    let tempList = searchList;
    for(var x = 0; x < tempList.length; x++){
      const movieObj = tempList[x];
      const movieId = movieObj.imdbID;
      if(idset.has(movieId)){
        continue;
      }
      else{
        newList.push(movieObj)
        idset.add(movieId);
      }
    }
    return newList
  }

  return(
    <>
      <ToastContainer/>

      {movieWindow ? <MovieDetails ids={ids} noms={noms} movieObject={selectedMovie} setMovieWindow={setMovieWindow} api_key={api_key} addMovie={addMovie} removeMovie={removeMovie} /> : null}

      <div id="wrapper">

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
        <Completionbar current={noms.length} limit={NUM_OF_MOVIES} ids={ids} notify={notify}/>
          <div className="mainframe">
            <div className="nominees">

              <div>
                <h3 className="your-choices">Your Choices</h3>
                {noms && noms.length > 0 ? (
                  noms.map((movie, index) => (
                    <div key={`nom${movie.Title}${index}`} className="nominee-container align-items">
                      <span className="remove-movie" onClick={() => removeMovie(movie.imdbID)}>x</span>
                      <div className="nominee" onClick={() => openMovie(movie)} key={`${index}${movie.imdbID}`}>{movie.Title}</div>
                    </div>
                    

                  ))
                ) : <div className="no-selection-made">No Selections</div>
                }
              </div>
              <div className="switch-view no-select" onClick={() => setLibView(!libView)}>Switch view</div>
              
            </div>

              {libView ? <PosterList noms={noms} openMovie={openMovie}/> :
              <SearchResults data={data} query={term} addMovie={addMovie} ids={ids} removeMovie={removeMovie} openMovie={openMovie} />}
              
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .switch-view{
          cursor: pointer;
          color: #637381;
          padding: 5px 10px;
          border-radius: 5px;
          border: 1px solid #637381;
          width: max-content; 
        }
        
        .pointer-events-none{
          pointer-events: none;
        }
        .remove-movie{
          position: relative;
          margin-right: 20px;
          cursor: pointer;
        }
        .no-selection-made{
          margin-top: 20px;
        }
        .your-choices{
          margin: 0;
          padding: 0;
          margin-bottom: 40px;
        }


        .all{
          margin-top: 100px;
          height: 100%;
        }
        .nominee-container:not(:first-child){
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
          opacity: .5;
        }
        
        .nominees{
          height: 400px;
          width: 35%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-right: 10px;

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
          margin: 1.5rem;
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
        }

        @media (max-width: 800px){

          .mainframe{
            display: block;
          }

          .nominees{
            margin: 0 auto;
            width: 80%;
          }
          .switch-view{
            margin: 0 auto;
          }
        }

        @media(max-width: 500px){
          #nav{
            display: block;
          }
          .left-side{
            margin-bottom: 25px;
          }
          .search-container{
            margin: 0 auto;
            width: max-content;
          }
          .left-side{
            justify-content: center;
            font-size: 1.2rem;
          }
        }

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