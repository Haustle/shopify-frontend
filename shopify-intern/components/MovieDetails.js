import { createRef, useEffect, useState } from "react";

const MovieDetails = ({movieObject, setMovieWindow}) => {

    const [moreInfo, setMoreInfo] = useState({});
    const mainDiv = createRef()

    // Allowing for the use of the escape key when inside the window
    const escapeWatch = (e) => {
        if(e.key == 'Escape'){
            setMovieWindow(false);
        }
    }

    // Make sure we're focusing the parent div so we exit on input 'Escape'
    useEffect(() => {
        mainDiv.current.focus();
    },[])

    return(
        <>
            <div className="container" onKeyDown={escapeWatch} tabIndex="-1" ref={mainDiv}>
                <div className="space-between ">
                    <img src={movieObject.Poster} />
                    <div className="align-items height-max">
                        <div className="close" onClick={() => setMovieWindow(false)}>close</div><span className="or-esc">(or Esc)</span>

                    </div>
                </div>
                
            </div>
            <style jsx>{`
                .height-max{
                    height: max-content;
                }
                .or-esc{
                    margin-left: 5px;
                    font-size: .8rem;
                }
                img{
                    border-radius: 10px;
                    height: 300px;
                }
                .close{
                    color: black;
                    padding: 5px 10px;
                    background-color: black;
                    border-radius: 5px;
                    color: white;
                    width: max-content;
                    height: max-content;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: .8rem;
                }
                .container{
                    outline: none;
                    z-index: 9999;
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    background-color: rgba(249, 250, 251, .9)

                }
            `}</style>
        </>
    )
}

export default MovieDetails;