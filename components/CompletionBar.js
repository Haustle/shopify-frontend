import copy from "copy-to-clipboard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const CompletionBar = ({current, limit, ids, notify}) => {



    const difffernece = limit - current;


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

    // if the current amount drops or changes we need to make sure 
    // we change the string back to "Share" as there's been changes

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
                    background-color: #637381;
                    padding: 5px 10px;
                    border-radius: 10px;
                    color: white;
                    cursor: pointer;
                    font-weight: 500;

                }
                .share:hover{
                    // background-color: #637381;
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
                    background-color: #637381;
                    // background-color: #47c1bf;
                    transition: all 0.3s;
                    border-radius: 5px;


                }
                .completion-wrapper{
                    width: 100%;
                    background-color: #dfe3e8;
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