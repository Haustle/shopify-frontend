import { createRef, useEffect, useState } from "react";
import fetch from 'node-fetch';

const MovieDetails = ({ movieObject, setMovieWindow, api_key, noms, ids, removeMovie, addMovie, passInfo = null}) => {

    const [moreInfo, setMoreInfo] = useState({});
    const [tomato, setTomato] = useState({});
    const mainDiv = createRef()

    // deconstructing the movie object
    const { Title, imdbID, Year, Type, Poster } = passInfo ?? movieObject;


    // Allowing for the use of the escape key when inside the window
    const escapeWatch = (e) => {
        if(e.key == 'Escape'){
            setMovieWindow(false);
        }
    }


    const getMoreInfo = async () => {
        if(ids.has(movieObject.imdbID)){
            return noms.filter(nomi => nomi.imdbID == movieObject.imdbID)[0]
        }
        const url = `https://www.omdbapi.com/?apikey=${api_key}&i=${passInfo ? passInfo.imdbID : imdbID}`
        const res = await fetch(url);
        const retJson = await res.json();
        return retJson;
    }

    // Make sure we're focusing the parent div so we exit on input 'Escape'
    useEffect(() => {
        mainDiv.current.focus();
       
        const getInfo = async () => {
            const searchData = passInfo ?? await getMoreInfo();
            const rottenTomatoes = searchData.Ratings.filter(rating => rating.Source == "Rotten Tomatoes")[0];
            setTomato(rottenTomatoes);
            setMoreInfo(searchData);
        }
        getInfo();
        
    },[])

    return(
        <>
            <div className="wrapper">
                <div className="container" onKeyDown={escapeWatch} tabIndex="-1" ref={mainDiv}>
                    <div className="esc">
                        <div className="close" onClick={() => setMovieWindow(false)}>Close</div>

                    </div>
                    <div className="information-container space-between ">
                        <div className="left-movie-details">
                            <img className="poster" src={Poster ?? moreInfo.Poster} />

                            <div className="title">{Title ?? moreInfo.Title}<span className="year">({Year ?? moreInfo.Year})</span></div>
                            <div className="type-and-rating">
                                <span className="details">{Type ?? moreInfo.Type}</span>
                                <span className="details">{moreInfo.Rated != "N/A" ? <span>Rated: <b>{moreInfo.Rated}</b> </span> : "No Rating"}</span>
                            </div>

                            {/* add ,remove, and nominate buttons */}
                            <div className="button-container">
                                {passInfo || (ids && ids.has(imdbID ?? moreInfo.imdbID))  ? <div className="button-base nominated">Nominated</div> : null}
                                {ids && ids.has(imdbID ?? moreInfo.imdbID) ? <div className="button-base remove" onClick={() => removeMovie(imdbID ?? moreInfo.imdbID)}>Remove</div>: null}
                                {!passInfo && !ids.has(imdbID ?? moreInfo.imdbID) && ids.size < 5 ? <div className="button-base add" onClick={() => addMovie(movieObject ?? moreInfo)}>add</div> : null}
                            </div>
                            


                        </div>
                        <div className="right-movie-details">
                            
                            <div className="summary">
                                <h2>Plot</h2>
                                <div>{moreInfo.Plot}</div>
                            </div>

                            <div className="director">
                                <div>
                                    <span>Director: </span>
                                    <b>{moreInfo.Director}</b>
                                </div>
                                <div>
                                    <span>Length: </span>
                                    <b>{moreInfo.Runtime}</b>
                                </div>
                                
                            </div>
                            {tomato ?
                                (<div className="align-items ratings-container">
                                    <img className="rotten" src="rotten.png" />
                                    <span>{tomato.Value}</span>
                                </div>)
                                :
                                null
                            }
                            <div className="button-base more-info">
                                <a href={`https://www.imdb.com/title/${imdbID}`} target="_blank">More info</a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            
            <style jsx>{`
                .remove{
                    background-color: #fead9a;
                    color: #de3618;
                    margin-left: 10px;
                    cursor: pointer;
                }
                .button-container{
                    display: flex;
                    justify-content: center;
                }
                .more-info{
                    background-color: black;
                    color: white;
                }
                .ratings-container{
                    margin-top: 25px;
                }
                .rotten{
                    height: 25px;
                    margin-right: 10px;
                }
                .director{
                    margin-top: 25px;
                    font-size: .9rem;
                }
                .year{
                    font-size: .8rem;
                    font-weight: 400;
                    margin-left: 10px;
                }
                .add {
                    background-color: #bbe5b3;
                    color: #50b83c;
                    cursor: pointer;
                }
                .button-base{
                    width: max-content;
                    border-radius: 5px;
                    padding: 5px;
                    font-size: .8rem;
                    height: max-content;
                    margin-top: 20px;
                }

                .nominated{
                    background-color: #ffea8a;
                    color: #8a6116;
                }
                .summary{
                    line-height: 1.8rem;
                    
                }
                .right-movie-details{
                    width: 50%;
                    padding-left: 20px;
                }
                .left-movie-details{
                    width: 50%;
                }
                .type-and-rating{
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                }
                .type-and-rating .details:not(:first-child){
                    margin-left: 10px;
                }
                .type-and-rating .details{
                    font-size: .9rem;
                    border: 1px solid black;
                    padding: 2px 5px;
                    border-radius: 5px;
                }
                .title{
                    font-size: 1.2rem;
                    font-weight: 700;
                    text-align: center;
                    margin-top: 15px;
                }
                .esc{
                    display: flex;
                    align-items: center;
                    height: max-content;
                    justify-content: flex-end;

                }
                .or-esc{
                    margin-left: 5px;
                    font-size: .8rem;
                }
                .poster{
                    border-radius: 10px;
                    height: 300px;
                    display: block;
                    margin: 0 auto;
                    border: 3px solid #47c1bf;
                    max-width: 200px;
                    cursor: pointer;
                }
                .close{
                    color: black;
                    padding: 5px 10px;
                    background-color: #e3d0ff;
                    color: #9c6ade;
                    border-radius: 5px;
                    width: max-content;
                    height: max-content;
                    cursor: pointer;
                    font-weight: 500;
                    font-size: .8rem;
                    margin-bottom: 10px;
                }
                .wrapper{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: rgba(249, 250, 251, .8);
                    z-index: 9999;

                }
                .container{
                    outline: none;
                    z-index: 9999;
                    position: absolute;

                    width: 80%;
                    background-color: rgba(250, 252, 255, .99);
                    box-shadow: 0 7px 14px rgba(50,50,93,0.1), 0 3px 6px rgba(0,0,0,0.08);
                    padding: 40px;
                    border-radius: 10px;

                }
                @media(max-width: 700px){
                    .wrapper{
                        position: fixed;

                    }
                    .container{
                        width: 100%;
                        bottom: 0;

                    }
                }
                @media(max-width: 580px){
                    
                    .information-container{
                        display: block;
                    }
                    .left-movie-details{
                        width: 100%;
                    }
                    .right-movie-details{
                        width: 100%;
                        padding-left: 0px;
                    }
                    .more-info{
                        margin: 0 auto;
                    }
                    .poster{
                        height: 150px;
                    }
                .director, rotten{
                    display: none;
                }

                }
            `}</style>
        </>
    )
}

export default MovieDetails;