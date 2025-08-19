import React, { useState } from "react";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
export default function Question({ index, handleSkipAnswer, handleAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleAnswer(answer) {
    setAnswer((prev) => ({
      ...prev,
      selectedAnswer: answer,
      isCorrect: null,
    }));
    setTimeout(() => {
      setAnswer((prev) => ({
        ...prev,
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      }));
      setTimeout(() => {
        handleAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer===""? handleSkipAnswer:null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}
