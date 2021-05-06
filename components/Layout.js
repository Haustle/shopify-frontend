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
                    position: relative;
                    width: 800px;
                    border-radius: 5px;

                }
            `}</style>
        </>
    )
}

export default Layout;