import './App.css';
import {Route, Routes} from "react-router-dom";
import Start from "./Start";
import Game from "./Game";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Start /> } exact/>
        <Route path="/game" element={ <Game /> } />
      </Routes>
    </div>
  );
}

export default App;
