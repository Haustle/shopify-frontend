import MovieDetails from '@components/MovieDetails'
import { useEffect, useState } from "react";
import Link from "next/link"

const share = ({name, ids, api_key}) => {
    const [movieWindow, setMovieWindow] = useState(false);
    const [movieImdbID, setmovieImdbID] = useState("")
    const [currentInfo, setCurrentInfo] = useState({})
    const [allMovies, setMovies] = useState(new Map());

    // open details window
    const openMovieModal = (id) => {
        const info = allMovies.get(id)
        setmovieImdbID(id)
        setCurrentInfo(info)
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

    // Onload, load each movie's details
    useEffect(() => {
        ids.forEach(id => loadMovie(id));
    }, [])

    // Some mock images when page isn't loading
    const mockImages = () => {
        var mock;
        for(let x = 0; x < 5; x++){
            mock += <div className="poster">loading...</div>
        }
        return(mock)
    }
    return(
        <>
            {movieWindow ? <MovieDetails passImdbID={movieImdbID} passInfo={currentInfo} setMovieWindow={setMovieWindow} /> : null}

            <div id="wrapper">
                <div className="space-between align-items" id="nav">
                    <h2>Top 5 Movie's</h2>
                    <div className="make-list ani2ms"><Link href="/"><a>Make a List</a></Link></div>

                </div>
                {ids.length == 5 ? allMovies.size == 5 ?
                    (<>

                        <div className="poster-container">
                            {[...allMovies.keys()].map(key => (
                                <div className="indi-poster ani2ms" onClick={() => openMovieModal(key)}>
                                    <img src={allMovies.get(key).Poster} className="poster" />
                                    <div className="title">{allMovies.get(key).Title} ({allMovies.get(key).Year})</div>
                                </div>
                            ))}
                        </div>
                    </>
                    ) : mockImages()
                    : 'Invalid URL'
                }
            </div>
            
            
            <style jsx>{`
                #nav{
                    margin-top: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 40px;
                }
                #wrapper{
                    margin: 1.5rem;
                }  
                .make-list{
                    font-size: 1rem;
                    padding: 5px 10px;
                    border: 1px solid var(--color-ink-lighter);
                    color: var(--color-ink-lighter);
                    border-radius: 5px;
                }
                .make-list:hover{
                    background-color: var(--color-ink-lighter);
                    color: white;
                }
                .indi-poster{
                    display: inherit;
                    width: max-content;
                    max-width: 200px;
                    margin-bottom: 20px;
                    cursor: pointer;

                }
                .indi-poster:hover{
                    opacity: .5;
                }
                .title{
                    text-align: center;
                    color: var(--color-ink-lighter);
                    font-size: .9rem;
                }
                .poster-container{
                    display: inline-table;
                }
                .poster{
                    border-radius: 5px;
                    height: 300px;
                    border: 1px solid whitesmoke;
                    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
                                0 3px 6px rgba(0, 0, 0, 0.08);
                    margin: 1rem;

                }
                .name{
                    text-transform: capitalize;
                }

                @media(max-width: 500px){
                    .indi-poster{
                        width: 100%;
                        margin: 1rem;
                    }
                    .title{
                        margin-top: 10px;
                    }
                    .poster{
                        display: block;
                        margin: 0 auto;
                    }
                    .poster-container{
                        display: grid;
                        justify-content: center;
                    }
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