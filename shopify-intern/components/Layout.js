const Layout = ({children}) => {

    return(
        <>
            
            <main>
                <div>
                    {children}
                </div>
            </main>

            <style jsx>{`
                main{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    width; 100%;
                }
                div{
                    height: 500px;
                    width: 800px;
                    // background-color: red;
                    // border: 1px solid black;
                    border-radius: 5px;

                }
            `}</style>
        </>
    )
}

export default Layout;