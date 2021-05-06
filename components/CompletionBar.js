const CompletionBar = ({current, limit}) => {
    return(
        <>
            {/* <div className="current">{current} of {limit}</div> */}
            <div className="completion-wrapper">
                <div className="completion"></div>
            </div>
            <style jsx>{`
                .current{
                    text-align: right;
                    margin-bottom: 5px;
                    font-size: .8rem;
                }
                .completion{
                    height: 10px;
                    width: ${current/limit*100}%;
                    // background-color: #006fbb;
                    background-color: #47c1bf;
                    transition: all 0.3s;
                    border-radius: 5px;


                }
                .completion-wrapper{
                    width: 100%;
                    background-color: #e0f5f5;
                    border-radius: 5px;
                    margin-bottom: 50px;
                }
            `}</style>
        </>
    )
}

export default CompletionBar;