import axios from "axios";
import { useState } from "react";
import "./Login.css";
const SignUp=()=>{
    const [username,setUserName] = useState("");
    const [email,setUserEmail] = useState("");
    const [password,setUserPassword] = useState("");
    
    const signUp=async ()=>{
        console.log("api:"+username,email,password);
        if(username!=="" && email!=="" && password!==""){
            await axios({
                method: 'post',
                url: 'http://localhost:8000/saveUser',
                headers: {
                    'Content-Type' : 'application/json'
                }, 
                data: JSON.stringify({
                    username:username,
                    email:email,
                    password:password
                })
            }).then((response)=>{
                document.getElementById("response").innerHTML=response.data;
                console.log(response.data);
            });
        }
        else{
            document.getElementById("response").innerHTML="User credentials are incorrect";
        }
        document.getElementById("username").value="";
        document.getElementById("email").value="";
        document.getElementById("password").value="";
        
    }

    return(
        <div className="inner_container">
            <br/>
            <input id="username" type="text" placeholder="Enter Username" onChange={(e)=>setUserName(e.target.value)} required/> <br/> <br/>
            <input id="email" type="email" placeholder="Enter Email" onChange={(e)=>setUserEmail(e.target.value)} required/>  <br/> <br/>
            <input id="password" type="password" placeholder="Enter Password" onChange={(e)=>setUserPassword(e.target.value)} required/>  <br/> <br/>
            <button className="signup" onClick={signUp}>SignUp</button>  <br/>
            <div id="response"></div>
        </div>
    );
}
export default SignUp;