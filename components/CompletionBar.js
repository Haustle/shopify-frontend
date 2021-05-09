import copy from "copy-to-clipboard";

const CompletionBar = ({current, limit, ids, notify}) => {
    const difffernece = limit - current;

    // logic to handle the share- link
    const shareLink = () => {
        // need to determine the environemtn of the project
        const envr = process.env.NODE_ENV;
        let url = "";

        if(envr == "development"){
            url = "localhost:3000/share?";
        }
        else if(envr == "production"){
            url = "shopify.tyrus.im/share?"
        }

        const listIds = [...ids];
        const listIdsString = listIds.map(id => `id=${id}`);
        let stringIds = listIdsString.join("&");
        copy(url+stringIds);
        notify("Copied share link!");

    }

    return(
        <>
            <div className="current">
                {
                    difffernece == 0  
                        ? <span className="share ani2ms" onClick={() => shareLink()}>Share Link</span>
                        : <span className="difference">Add {difffernece} more!</span>
                }
            </div>
            <div className="completion-wrapper">
                <div className="completion"></div>
            </div>
            <style jsx>{`

                .share{
                    background-color: var(--color-ink-lightest);
                    padding: 5px 10px;
                    border-radius: 10px;
                    color: white;
                    cursor: pointer;
                    font-weight: 500;

                }
                .share:hover{
                    opacity: .8;
                }
                .current{
                    text-align: right;
                    font-size: .9rem;
                    padding: 5px 10px;
                    margin-bottom: 15px;

                }
                .completion{
                    height: 10px;
                    width: ${current/limit*100}%;
                    background-color: var(--color-ink-lighter);
                    transition: all 0.3s;
                    border-radius: 5px;


                }
                .completion-wrapper{
                    width: 100%;
                    background-color: var(--color-sky);
                    border-radius: 5px;
                    margin-bottom: 50px;
                }

                @media(max-width: 500px){
                    .current{
                        text-align:center;
                        font-size: 1.1rem;
                    }
                }
            `}</style>
        </>
    )
}

export default CompletionBar;