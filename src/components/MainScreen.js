import React, { useState, useEffect } from "react";
import { Audio } from "react-loader-spinner";
import "./main.css";
function MainScreen(props) {
  const [data, setData] = useState();
  const [loading, setloading] = useState(true);
  const [quizeInfo, setQuizeInfo] = useState({
    number: null,
    category: "",
    difficultiy: "",
  });

  const handleSubmite = (e) => {
    e.preventDefault();
    setQuizeInfo({
      number: e.target.amount.value,
      category: e.target.category.value,
      difficultiy: e.target.difficulty.value,
    });
  };

  useEffect(() => {
    props.apiInfo(data);
  }, [data]);

  useEffect(() => {
    if (quizeInfo.number === null) return console.log("Sth Wrong");
    fetch(
      `https://the-trivia-api.com/api/questions?categories=${quizeInfo.category}&limit=${quizeInfo.number}&difficulty=${quizeInfo.difficultiy}`
    )
      .then((response) => response.json())
      .then(setData)
      .then(() => setloading(false))
      .catch((e) => console.error(e));
  }, [quizeInfo]);

  return (
    <div className="main">
      {loading && quizeInfo.number !== null ? (
        <div className="audio">
          <Audio
            color="blue"
            height="80"
            width="80"
            radius="9"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
        <section className="quiz quiz-small">
          <form className="setup-form" onSubmit={handleSubmite}>
            <h2>setup quiz</h2>
            {/* amount */}
            <div className="form-control">
              <label htmlFor="amount">number of questions</label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="form-input"
                min={1}
                max={50}
              />
            </div>
            {/* category */}

            <div className="form-control">
              <label htmlFor="category">Category</label>
              <select name="category" id="category" className="form-input">
                <option value="sport_and_leisure">Sport</option>
                <option value="history">History</option>
                <option value="politics">Politics</option>
              </select>
            </div>
            {/* difficulty */}

            <div className="form-control">
              <label htmlFor="difficulty">select difficulty</label>
              <select name="difficulty" id="difficulty" className="form-input">
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>
            {/* {error && (
            <p className="error">
              can't generate questions, please try different options
            </p>
          )} */}
            <button type="submit" className="submit-btn">
              start
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default MainScreen;
