import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "./Result.css";

const Result = ({ name, score }) => {
  const navigate = useNavigate();
  const { token } = useParams();
  useEffect(() => {
    if(token!==undefined || token!==""|| localStorage.getItem(token)!==null){
      if (!name) {
        navigate(`/home/${token}`);
      }
    }
    else{
      localStorage.clear();
      navigate("/")
    }
  }, [name, navigate,token]);

  const redirect=()=>{
    if(token===undefined || token==="" || localStorage.getItem(token)===null){
      localStorage.clear();
      navigate("/");
    }
    else{
      navigate(`/home/${token}`);
    }  
  }

  return (
    <div className="result">
      <span className="title">Final Score : {score}</span>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20,fontWeight:"bold"
       }}
        onClick={redirect}
      >
        Go to homepage
      </Button>
    </div>
  );
};

export default Result;