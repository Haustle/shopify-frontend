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
                    // align-items: center;
                    height: 100vh;
                    width; 100%;
                }
                div{
                    position: relative;
                    width: 900px;
                    border-radius: 5px;
                    margin-top: 50px

                }
            `}</style>
        </>
    )
}

export default Layout;