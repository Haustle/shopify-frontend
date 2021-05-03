import fetch from 'node-fetch'
const Content = ({term=""}) => {

    return(
        <>
            <div className="some">
                <div className="wrapper">
                    {term}
                </div>
            </div>
            

            <style jsx>{`
            .some{
                padding: 10px;
                flex-grow: 1;
            }
                .wrapper{
                    width: 100%;
                    padding: 0px 10px;
                    margin-top: 25px;
                    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
                                0 3px 6px rgba(0, 0, 0, 0.08);
                    border-radius: 5px;
                    height: 100%;
                }
            `}</style>
        </>
    )
}

export default Content;