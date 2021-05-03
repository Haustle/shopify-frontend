import { createRef, useState } from "react";
import Content from '@components/Content'

const Home = () => {
  const searchElement = createRef();
  const [term, setTerm] = useState("")
  function search(){
    const entry = searchElement.current.value;
    setTerm(entry);
    console.log(entry);
  }
  return(
    <>
      <div id="wrapper">
        <div id="nav">
          <div className="left-side">
            <img src="shopify.png" />
            <span>The Shoppies</span>
          </div>
          <div className="search-container">
            <input id="search" type="text" ref={searchElement} />
            <div className="search" onClick={search}>Search</div>
          </div>
        </div>
        <Content term={term}/>
      </div>
      


      <style jsx>{`
        #wrapper{
          display: flex;
          flex-direction: column;
          height: 500px;
        }
        .search-container{
          display: flex;

        }
        .search{
          transition: all 0.1s;
          cursor: pointer;
          background-color: pink;
          padding: 5px;
          border-radius: 5px;
          margin-left: 5px;
        }
        .search:hover{
          Transform: scale(1.03);
        }
        .left-side img{
          height: 1.2rem;
          margin-right: 10px;
        }
        .left-side{
          display: flex;
          align-items: center;
        }
        
        #nav{
          display: flex;
          margin: 0 auto;
          width: 500px;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
        }
        #search{
          border: none;
          border: 3px solid black;
          padding: 5px 10px;
          border-radius: 5px;
          outline: none;
        }
      `}</style>
    </>
  )
}

export default Home;