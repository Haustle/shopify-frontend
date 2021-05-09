import { useEffect, useState } from 'react';

const SearchResults = ({data, query, ids, addMovie, removeMovie, openMovie}) => {

    return(
        <>
            <div className="wrapper">
                {query ? (
                    <div className="results-title">
                        <div>Search for <span>`{query}`</span></div>
                        <div>{data.length} results</div>
                    </div>
                ) : null}

                <div className="content">
                    
                    <div id="results">
                        <div className="search-container">

                            
                            <div className="search-results-container">
                                {data && data.length ? (
                                    data.map((movie, index) => (

                                        <div key={`${index}${movie.Title}`} className='movie-card'>
                                            <div className={`details ${ids.has(movie.imdbID) ? 'fade' : null}`}>
                                                <div className="year">{movie.Year}</div>
                                                <div className="title">{movie.Title}</div>
                                            </div>
                                            <div className="movie-options">
                                                {ids.has(movie.imdbID) ? (

                                                    <div className="remove" onClick={() =>removeMovie(movie.imdbID)}>Remove</div>

                                                ) : ( <>
                                                    <div className="more" onClick={() => openMovie(movie)} data-id={movie.imdbID}>Details</div>
                                                    {ids.size < 5 ? <div className="add" onClick={() => addMovie(movie)} >Add</div> : null}
                                                    </>
                                                )

                                                }
                                                
                                            </div>
                                            
                                        </div>
                                    ))
                                ) : query ? <div className="none no-select">No results found</div> : <div className="none no-select">Search result box</div>}
                            </div>
                            

                        </div>
                    </div>
                    

                </div>
            </div>
            
            <style jsx>{`
                .none{
                    text-align: center;
                    color: #637381;
                }
                .movie-options{
                    display: flex;
                }
                .search-container{
                    width: 85%;
                }
                .search-results-container{
                    // margin-top: 50px;
                }
                .fade{
                    opacity: 0.4;
                    pointer-events: none;
                }

                .view{
                    margin-top: 50px;
                    padding: 0px 10px;
                }
                .movie-card .details{
                    display: flex;
                    align-items: center;
                    width: 70%;
                }
                .more{
                    margin-right: 5px;
                    background-color: #b4e1fa;
                    color: #006fbb;
                }
                .remove{
                    background-color: #fead9a;
                    color: #de3618;
                }
                .nominated{
                    background-color: #ffea8a;
                    color: #eec200;
                }
                .add{
                    background-color: #bbe5b3;
                    color: #50b83c;
                }
                .movie-options div{
                    border-radius: 5px;
                    padding: 5px;
                    font-size: .8rem;
                    height: max-content;


                }
                .results-title span{
                    font-weight: bold;
                    padding: 5px;
                    background-color: #dfe3e8;
                    border-radius: 5px;
                    margin-left: 10px;
                }
                .results-title{
                    margin-bottom: 25px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .movie-card .title{
                    padding: 0px 5px;
                }
                .movie-card .year{
                    margin-right: 10px;
                    border-radius: 5px;
                    font-size: .7rem;
                    font-weight: bold;
                    width: 15%;
                    text-align: center;
                    border: 1px solid black;
                    padding: 2px;

                }
                .movie-card:hover{
                    background-color: #f4f6f8;
                }
                .movie-card{
                    cursor: pointer;
                    padding: 5px 10px;
                    // border: 1px solid whitesmoke;
                    border-radius: 5px;
                    justify-content: space-between;
                    display: flex;
                }
                .movie-card:not(:first-child){
                    margin-top: 7px;
                }
                #results{
                    width: 100%;
                    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
                                0 3px 6px rgba(0, 0, 0, 0.08);
                    padding: 40px 20px;
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    border: 1px solid #e6e6e6;
                    height: max-content;
                }

                .poster-results{
                    height: 100px;
                    border-radius: 5px;
                }
                .poster-results:not(:first-child){
                    margin-left: 20px;
                }
                .wrapper{
                    padding: 10px;
                    width: 65%;
                    margin-bottom: 25px;
                }
                .content{
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    border-radius: 5px;

                }
                @media (max-width: 800px){
                    .wrapper{
                        margin: 50px auto 25px auto;
                        width: 100%;
                    }

                }
                @media(max-width: 500px){
                    .year{
                        display: none;
                    }
                }
            `}</style>
        </>
    )
}

export default SearchResults;