import React from 'react';
import {Link} from "react-router-dom";

function Start() {
  return <div className="start-page">
  <h1>Rock, Paper, Scissor</h1>
  <Link to="/game">
    <button id="start-game-button">Start Game</button>
  </Link>
  </div>;
}

export default Start;
