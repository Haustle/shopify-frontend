import { createRef, useEffect, useState } from "react";
import fetch from 'node-fetch';

const MovieDetails = ({movieObject, setMovieWindow, api_key, ids, removeMovie, addMovie}) => {

    const [moreInfo, setMoreInfo] = useState({});
    const mainDiv = createRef()

    // deconstructing the movie object
    const { Title, imdbID, Year, Type, Poster } = movieObject;


    // Allowing for the use of the escape key when inside the window
    const escapeWatch = (e) => {
        if(e.key == 'Escape'){
            setMovieWindow(false);
        }
    }


    const getMoreInfo = async () => {
        const url = `https://www.omdbapi.com/?apikey=${api_key}&i=${imdbID}`
        const res = await fetch(url);
        const retJson = await res.json();
        return retJson;
    }

    // Make sure we're focusing the parent div so we exit on input 'Escape'
    useEffect(() => {
        mainDiv.current.focus();
        const getInfo = async () => {
            const searchData = await getMoreInfo();
            setMoreInfo(searchData);
        }

        getInfo();
    },[])

    return(
        <>
            <div className="container" onKeyDown={escapeWatch} tabIndex="-1" ref={mainDiv}>
                <div className="space-between ">
                    <div className="left-movie-details">
                        <img src={Poster} />
                        
                        <div className="title">{Title}<span className="year">({Year})</span></div>
                        <div className="type-and-rating">
                            <span>{Type}</span>
                            <span>{moreInfo.Rated != "N/A" ? moreInfo.Rated : "No Rating"}</span>
                        </div>
                        {ids.has(imdbID) ? <div className="nominated">Nominated</div> : null}
                        

                    </div>
                    <div className="right-movie-details">
                        <div className="esc">
                            <div className="close" onClick={() => setMovieWindow(false)}>Close</div>

                        </div>
                        <div className="summary">
                            <h2>Plot</h2>
                            <div>{moreInfo.Plot}</div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <style jsx>{`
                .year{
                    font-size: .8rem;
                    font-weight: 400;
                    margin-left: 10px;
                }
                .nominated{
                    width: max-content;
                    background-color: #ffea8a;
                    color: #8a6116;
                    border-radius: 5px;
                    padding: 5px;
                    font-size: .8rem;
                    height: max-content;
                    margin: 0 auto;
                    margin-top: 20px;
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
                .type-and-rating span:not(:first-child){
                    margin-left: 10px;
                }
                .type-and-rating span{
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
                    justify-content: end;

                }
                .or-esc{
                    margin-left: 5px;
                    font-size: .8rem;
                }
                img{
                    border-radius: 10px;
                    height: 300px;
                    display: block;
                    margin: 0 auto;
                    border: 3px solid #47c1bf;
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
                }
                .container{
                    outline: none;
                    z-index: 9999;
                    position: absolute;
                    min-height: 60%;
                    width: 80%;
                    background-color: rgba(250, 252, 255, .99);
                    // background-color: white;
                    box-shadow: 0 7px 14px rgba(50,50,93,0.1), 0 3px 6px rgba(0,0,0,0.08);
                    padding: 40px;
                    border-radius: 10px;

                }
            `}</style>
        </>
    )
}

export default MovieDetails;