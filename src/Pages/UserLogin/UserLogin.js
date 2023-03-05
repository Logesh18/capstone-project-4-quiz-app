import "./Login.css";
import reactDOM from "react-dom";
import {useEffect,useState} from "react";
import SignUp from "./SignUp";
import { useNavigate } from "react-router";
import axios from "axios";

const UserLogin=()=>{

    const navigate=useNavigate();
    const [username,setUserName] = useState("");
    const [password,setUserPassword] = useState("");

    useEffect(() => {
        handleLogin();
    });

    const login=async ()=>{
        var token="";
        if(username!=="" && password !==""){
            await axios({
                method: 'get',
                // url: `http://localhost:8000/getUser?username=${username}&&password=${password}`
                url: `https://react-quiz-app-server1.onrender.com/getUser?username=${username}&&password=${password}`
            }).then((response)=>{
                token=response.data.token;
                document.getElementById("username").value="";
                document.getElementById("password").value="";
                if(token!=="")
                {
                    localStorage.setItem(token,username);
                    navigate(`/home/${token}`);
                }
            }).catch((error)=>{
                console.log(error);
            })
        }
        else{
            document.getElementById("username").value="";
            document.getElementById("password").value="";
            document.getElementById("response").innerHTML="User credentials are incorrect";
        }
       
    }


    const handleLogin=()=>{
        reactDOM.render(
            <div className="inner_container"><br/>
                <input id="username" type="text" placeholder="Enter Username" onChange={(e)=>setUserName(e.target.value)} required/> <br/> <br/>
                <input id="password" type="password" placeholder="Enter Password" onChange={(e)=>setUserPassword(e.target.value)} required/> <br/> <br/>
                <button className="login" onClick={login}>Login</button> <br/>
                <div id="response"></div>
            </div>
            ,document.getElementById("container"));
        document.getElementById("login_button").style.backgroundColor="red";
        document.getElementById("signup_button").style.backgroundColor="gray";
    }

    const handleSignUp=()=>{
        reactDOM.render(<SignUp/>,document.getElementById("container"));
        document.getElementById("login_button").style.backgroundColor="gray";
        document.getElementById("signup_button").style.backgroundColor="red";
    }

    return(
        <center>
            <div className="body_container">
                <div className="header_content">
                    <div className="inner_header_content">
                        <button id="login_button" onClick={handleLogin}>Login</button>
                    </div>
                    <div className="inner_header_content">
                        <button id="signup_button" onClick={handleSignUp}>SignUp</button>
                    </div>
                </div>
                <div id="container"> 
                </div>
            </div>
        </center>
    );
}
export default UserLogin;