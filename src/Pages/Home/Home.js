import { Button, MenuItem, TextField } from "@material-ui/core";
import { useState } from "react";
import { useNavigate,useParams } from "react-router";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Categories from "../../Data/Categories";
import "./Home.css";

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);

      if(token===undefined || token==="undefined" || token==="" || localStorage.getItem(token)===null){
        localStorage.clear();
        navigate("/");
      }
      else{
        setName(localStorage.getItem(token));
        navigate(`/quiz/${token}`);
      }
    }
  };

  return (
    <div className="content">

      <div className="settings">
      <span className="subtitle">Welcome, {name}</span>
        <span className="settings_title" >Quiz Settings</span>
        <div className="settings__select">
          {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}
          <TextField
            select
            label="Select Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <Button
            variant="contained"
            style={{backgroundColor:"rgb(15, 168, 15)",color:"#fff",paddingTop:"10px",paddingBottom:"10px",fontWeight:"bold",fontSize:"16px"}}
            size="large"
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;