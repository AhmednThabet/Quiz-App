import { useState } from "react";

import Question from "./components/Question";
import "./App.css";
import MainScreen from "./components/MainScreen";
function App() {
  const [apiInfo, setapiInfo] = useState();

  if (apiInfo !== undefined) {
    var Qlist = apiInfo;
  }

  // console.log(apiInfo, 'InApp');

  return (
    <div className="App">
      {apiInfo === undefined ? (
        <MainScreen apiInfo={setapiInfo} />
      ) : (
        <Question questionList={Qlist} />
      )}
    </div>
  );
}

export default App;
