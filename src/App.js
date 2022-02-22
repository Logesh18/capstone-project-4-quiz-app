import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import UserLogin from "./Pages/UserLogin/UserLogin";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";

const App=()=>{
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  };

  return (
    <BrowserRouter>
      <div className="app">
          <Header />
          <Routes>
              <Route path="/capstone-project-4-quiz-app" exact
                element={<UserLogin
              />}/>
              <Route path="/home/:token"
                element={<Home
                  fetchQuestions={fetchQuestions} 
              />}/>
              <Route path="/quiz/:token"
                element={<Quiz
                  questions={questions}
                  score={score}
                  setScore={setScore}
                  setQuestions={setQuestions}
              />}/>
              <Route path="/result/:token"
                element={<Result 
                  score={score} 
              />}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
