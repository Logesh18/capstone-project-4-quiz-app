import { Button } from "@material-ui/core";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = () => {
        if (currQues > 8) {
            navigate(`/result/${token}`);
        } else if (selected) {
          setCurrQues(currQues + 1);
          setSelected();
        } else setError("Please select any of the option");
  };

  return (
    <div className="question">
      <h2>Question {currQues + 1}</h2>

      <div className="singleQuestion">
        <h3>{questions[currQues].question}</h3>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            size="large"
            style={{ width: 185,backgroundColor:"rgb(15, 168, 15)",color:"#fff",fontWeight:"bold" }}
            onClick={handleNext}
          >
            {currQues > 8 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;