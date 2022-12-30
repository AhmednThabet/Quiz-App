import React, { useState, useEffect } from "react";
import "./question.css";

export default function Question(props) {
  const ids = props.questionList.map((item) => item.id);
  const [index, setIndex] = useState(0);
  const [questionID, setQuestionID] = useState(ids[index]);
  const [corectCount, setcorrectCount] = useState(0);
  const deepClone = JSON.parse(JSON.stringify(props.questionList));

  const correct = deepClone.map((item) => item.correctAnswer);
  // console.log(correct, "correct");
  const inCorrect = deepClone.map((item) => item.incorrectAnswers);
  // console.log(inCorrect, "inCorrect");
  const newArray = inCorrect.map((element, index) => {
    return element.splice(Math.floor(Math.random() * 3), 0, correct[index]);
  });
  // console.log(newArray, "newArray");
  console.log(corectCount);
  const handleClick = () => {
    if (index < ids.length - 1) {
      setIndex(index + 1);
    } else {
      alert(`No More Questions \n Your result is${corectCount}`);
    }
    setQuestionID(() => ids[index + 1]);
  };

  const handleAnswer = (e) => {
    /* incorrect logic  try to attach each question with its correct answer
  then link them to gather 
  try more efficient code  

  Next thing to do is to allow the user to grt the next question
   even if its not the correct one 

   reviw the logic of correct answer counter
  */
    if (correct.includes(e.target.value)) {
      correct.filter((item) => item !== e.target.value);
      console.log("Trueeee answer");
      setcorrectCount((prev) => prev + 1);
      handleClick();
    }
    handleClick();
  };

  return (
    <div className="question">
      <section className="question-contanier">
        <div className="scoar">
          Correct Answers : {corectCount} / {index + 1}
        </div>
        <div className="question-header">
          {/* component for handling questions  */}
          {props.questionList.map((item) => {
            return (
              item.id === questionID && <h2 key={item.id}>{item.question}</h2>
            );
          })}
        </div>
        <div className="question-answers">
          {/* compo to handle answers */}
          {inCorrect[index].map((item, index) => (
            <button onClick={handleAnswer} value={item} key={index}>
              {item}
            </button>
          ))}
        </div>
        <div className="next-btn" onClick={handleClick}>
          <p>Next Question</p>
        </div>
      </section>
    </div>
  );
}
