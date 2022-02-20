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
  const [name, setName] = useState();
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
              <Route path="/" exact
                element={<UserLogin
              />}/>
              <Route path="/home/:token"
                element={<Home
                  name={name}
                  setName={setName}
                  fetchQuestions={fetchQuestions} 
              />}/>
              <Route path="/quiz/:token"
                element={<Quiz
                  name={name}
                  questions={questions}
                  score={score}
                  setScore={setScore}
                  setQuestions={setQuestions}
              />}/>
              <Route path="/result/:token"
                element={<Result name={name} score={score} 
              />}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
