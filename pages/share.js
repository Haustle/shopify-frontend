import MovieDetails from '@components/MovieDetails'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const share = ({name, ids, api_key}) => {
    const [movieWindow, setMovieWindow] = useState(false);
    const [movieImdbID, setmovieImdbID] = useState("")
    const [currentInfo, setCurrentInfo] = useState({})
    const [allMovies, setMovies] = useState(new Map());
    // http://localhost:3000/share?id=1234567&id=1234567&id=1234567&name=nick


    const openMovieModal = (id) => {
        const info = allMovies.get(id)
        setmovieImdbID(id)
        setCurrentInfo(allMovies.get(id))
        setMovieWindow(true);

    }



    const getMoreInfo = async (id) => {
        const url = `https://www.omdbapi.com/?apikey=${api_key}&i=${id}`
        const res = await fetch(url);
        const retJson = await res.json();
        return retJson;
    }

    // On page load we're going to fetch all movie information
    const loadMovie = async (imdbId) => {
        // we can load the info for the movie and then add it to a map
        // we can pass the value to MovieDetails
        // so there's no lag
        const info = await getMoreInfo(imdbId);
        setMovies(prev => new Map([...prev, [imdbId, info]]));

    }

    useEffect(() => {
        ids.forEach(id => loadMovie(id));
    }, [])
    return(
        <>

            {movieWindow ? <MovieDetails passImdbID={movieImdbID} passInfo={currentInfo} setMovieWindow={setMovieWindow}/> : null}
            {ids.length == 5 && allMovies.size == 5?
                (<div className="poster-container">
                    {[...allMovies.keys()].map(key => (
                        <img src={allMovies.get(key).Poster} className="poster" onClick={() => openMovieModal(key)}/>
                    ))}
                </div>   
            )
            : 'Incorrect URL'    
            }
            
            <style jsx>{`
                .poster-container{
                    display: inline-block;
                }
                .poster{
                    border-radius: 10px;
                    height: 300px;
                    border: 3px solid #47c1bf;
                    max-width: 200px;
                    margin: 1rem;
                    cursor: pointer;

                }
                .name{
                    text-transform: capitalize;
                }
            `}</style>
        </>
    )
}



// we need to access the url parameters
export async function getServerSideProps(ctx){

    const query = ctx.query
    const ids = query.id;

    const api_key = process.env.API_KEY;


    return{
        props: {
            ids,
            api_key
        }
    }
}

export default share;