import copy from "copy-to-clipboard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const CompletionBar = ({current, limit, ids}) => {

    const [copied, setCopied] = useState("Share")

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
        setCopied("Copied");
    }

    // if the current amount drops or changes we need to make sure 
    // we change the string back to "Share" as there's been changes
    useEffect(() => {
        setCopied("Share");
    },[current])
    return(
        <>
            <div className="current">
                {
                    difffernece == 0  
                        ? <span className="share" onClick={() => shareLink()}>{copied} Link</span>
                        : <span className="difference">Add {difffernece} more!</span>
                }
            </div>
            <div className="completion-wrapper">
                <div className="completion"></div>
            </div>
            <style jsx>{`

                .share{
                    background-color: black;
                    padding: 5px 10px;
                    border-radius: 10px;
                    color: white;
                    cursor: pointer;
                }
                .current{
                    text-align: right;
                    font-weight: 600;
                    font-size: .8rem;
                    padding: 5px 10px;
                    font-weight: 600;
                    margin-bottom: 15px;

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