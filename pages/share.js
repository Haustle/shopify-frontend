import MovieDetails from '@components/MovieDetails'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link"

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

    const mockImages = () => {
        var mock;
        for(let x = 0; x < 5; x++){
            mock += <div className="poster">loading...</div>
        }
        return(mock)
    }
    return(
        <>
            
            {movieWindow ? <MovieDetails passImdbID={movieImdbID} passInfo={currentInfo} setMovieWindow={setMovieWindow}/> : null}
            {ids.length == 5 ? allMovies.size == 5 ?
                (<>
                    <div className="space-between align-items">
                        <h2>Top Picks</h2>
                        <div><Link href="/"><a>← Make List</a></Link></div>

                    </div>
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
            
            <style jsx>{`
                .indi-poster{
                    display: inherit;
                    width: max-content;
                    max-width: 200px;
                    margin-bottom: 20px;
                    cursor: pointer;

                }
                .indi-poster:hover{
                    // opacity: .8;
                }
                .title{
                    text-align: center;
                    color: #637381;
                    font-size: .9rem;
                }
                .poster-container{
                    display: inline-table;
                }
                .poster{
                    border-radius: 5px;
                    height: 300px;
                    // border: 3px solid #47c1bf;
                    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
                                0 3px 6px rgba(0, 0, 0, 0.08);
                    margin: 1rem;

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