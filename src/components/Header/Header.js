import { useNavigate, useParams } from "react-router";
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import "./Header.css";

const Header = () => {
  
  const {token}=useParams();
  const navigate=useNavigate();
  
  const [path,setPath] = useState(false);
  
  const location = useLocation();

  const [screenWidth, getScreenWidth] = useState(window.innerWidth);

  const setWidth = () => {
    getScreenWidth(
      window.innerWidth
    )
  }


  useEffect(() => {
    window.addEventListener('resize', setWidth);
    console.log(location.pathname,screenWidth);

    if(location.pathname!=='/'){
      setPath(true);
      if(screenWidth<600){
          document.getElementById("title").style.fontSize="4vh";
          document.getElementById("logout").style.fontSize="4vh";
      }
      else{
          document.getElementById("title").style.fontSize="5vh";
          document.getElementById("logout").style.fontSize="5vh";
      }
    }
    else{
      setPath(false);
    }
    return(() => {
      window.removeEventListener('resize', setWidth);
    })
  }, [location,screenWidth])


  const logout=()=>{
      localStorage.removeItem(token);
      navigate("/");
  }

  return (

    <>
      <div className="header">
          <div id="title">
            Quiz App
          </div>
          <div id="logout" onClick={logout} >{path && <span>LOGOUT</span>}</div>
      </div>
      <hr className="divider" />
    </>

  );
};

export default Header;