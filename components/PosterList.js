const PosterList = ({noms, openMovie}) => {
    return(
        <>
            <div className="poster-container">
                {noms.map(nomi => (
                    <div className="indi-poster ani2ms" onClick={() => openMovie(nomi)}>
                        <img src={nomi.Poster} className="poster" />
                        {/* <div className="title">{nomi.Title} ({nomi.Year})</div> */}
                    </div>
                ))}
            </div>

            <style jsx>{`
                 .indi-poster{
                    display: inline-grid;
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
                    color: #637381;
                    font-size: .9rem;
                }
                .poster-container{
                    margin-left: 50px;
                }
                .poster{
                    border-radius: 5px;
                    height: 200px;
                    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
                                0 3px 6px rgba(0, 0, 0, 0.08);
                    margin: 1rem;

                }
                .name{
                    text-transform: capitalize;
                }

                @media(max-width: 500px){
                    .indi-poster{
                        display: flex;
                        margin: 0 auto;
                    }
                    .poster-container{
                        margin-top: 50px;
                        margin-left: 0px;
                    }
                }
            `}</style>
        </>
    )
}

export default PosterList;