import React, { useRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  playerLossAction,
  playerWinAction,
  resetGame,
  playerWinStreakAction,
  playerLossStreakAction,
  clearRun,
} from "./actions/countAction";

function Game({ playerWins, playerStreak, opponentWins, opponentStreak }) {
  const dispatch = useDispatch();
  const rockBtn = useRef();
  const paperBtn = useRef();
  const scissorsBtn = useRef();
  const playerLoose = useRef();
  const playerWin = useRef();
  const tie = useRef();

  //Get current win/losses from redux store
  //Code below stops program from running streak x2 in case of loss/win
  useSelector((state) => {
    playerWins = state.playerWin;
    playerStreak = state.playerWinStreak;
    opponentWins = state.playerLoose;
    opponentStreak = state.playerLooseStreak;
  });

  let opponentHand = 0;
  function GenerateOpponentHand() {
    opponentHand = Math.floor(Math.random() * (4 - 1) + 1);
    //1 = rock
    //2 = paper
    //3 = scissor
  }

  //functions to handle pointerevents
  function PointerEventsNone() {
    rockBtn.current.style.pointerEvents = "none";
    paperBtn.current.style.pointerEvents = "none";
    scissorsBtn.current.style.pointerEvents = "none";
  }

  function PointerEventsAuto() {
    rockBtn.current.style.pointerEvents = "auto";
    paperBtn.current.style.pointerEvents = "auto";
    scissorsBtn.current.style.pointerEvents = "auto";
  }

  function Rock() {
    GenerateOpponentHand();
    if (opponentHand === 1) {
      rockBtn.current.style.backgroundColor = "yellow";
      tie.current.style.display = "inline";
      PointerEventsNone();

      setTimeout(() => {
        rockBtn.current.style.backgroundColor = "transparent";
        tie.current.style.display = "none";
        PointerEventsAuto();
      }, 2000);
    } 
    else if (opponentHand === 2) {
      dispatch(playerLossAction());
      rockBtn.current.style.backgroundColor = "red";
      playerLoose.current.style.display = "inline";
      PointerEventsNone();

      setTimeout(() => {
        rockBtn.current.style.backgroundColor = "transparent";
        playerLoose.current.style.display = "none";
        PointerEventsAuto();
      }, 2000);

    }
    else {
      dispatch(playerWinAction());
      rockBtn.current.style.backgroundColor = "green";
      playerWin.current.style.display = "inline";
      PointerEventsNone();
      
      setTimeout(() => {
        rockBtn.current.style.backgroundColor = "transparent";
        playerWin.current.style.display = "none";
        PointerEventsAuto();
      }, 2000);
    }
  }

  function Paper() {
    GenerateOpponentHand();
    if (opponentHand === 1) {
      dispatch(playerWinAction());
      paperBtn.current.style.backgroundColor = "green";
      playerWin.current.style.display = "inline";
      PointerEventsNone();
      setTimeout(() => {
        paperBtn.current.style.backgroundColor = "transparent";
        playerWin.current.style.display = "none";
        PointerEventsAuto();
      }, 2000);
    } else if (opponentHand === 2) {
      paperBtn.current.style.backgroundColor = "yellow";
      tie.current.style.display = "inline";
      PointerEventsNone();
      setTimeout(() => {
        paperBtn.current.style.backgroundColor = "transparent";
        tie.current.style.display = "none";
        PointerEventsAuto();
      }, 2000);
    } else {
      dispatch(playerLossAction());
      paperBtn.current.style.backgroundColor = "red";
      playerLoose.current.style.display = "inline";
      PointerEventsNone();
      setTimeout(() => {
        paperBtn.current.style.backgroundColor = "transparent";
        playerLoose.current.style.display = "none";
        PointerEventsAuto();
      }, 2000);
    }
  }

  function Scissor() {
    GenerateOpponentHand();
    if (opponentHand === 1) {
      dispatch(playerLossAction());
      scissorsBtn.current.style.backgroundColor = "red";
      playerLoose.current.style.display = "inline";
      PointerEventsNone();
      setTimeout(() => {
        scissorsBtn.current.style.backgroundColor = "transparent";
        playerLoose.current.style.display = "none";
        PointerEventsAuto();
      }, 2000);
    } else if (opponentHand === 2) {
      dispatch(playerWinAction());
      scissorsBtn.current.style.backgroundColor = "green";
      playerWin.current.style.display = "inline";
      PointerEventsNone();
      setTimeout(() => {
        scissorsBtn.current.style.backgroundColor = "transparent";
        playerWin.current.style.display = "none";
        PointerEventsAuto();
      }, 2000);
    } else {
      scissorsBtn.current.style.backgroundColor = "yellow";
      tie.current.style.display = "inline";
      PointerEventsNone();
      setTimeout(() => {
        scissorsBtn.current.style.backgroundColor = "transparent";
        tie.current.style.display = "none";
        PointerEventsAuto();
      }, 2000);
    }
  }

  if (opponentWins === 2) {
    //call dispatch, add player loss to current streak
    dispatch(playerLossStreakAction());
    dispatch(resetGame());
  } else if (playerWins === 2) {
    //call dispatch, add player win to current streak
    dispatch(playerWinStreakAction());
    dispatch(resetGame());
  }

  return (
    <div className="game-page">
      <h1 id="header">
        The game is "Rock, Paper, Scissors", and the rules are best out of three
      </h1>

      <div className="current-score">
        <h1>Current Game</h1>
        <h2>Player Wins: {playerWins}</h2>
        <h2>Opponent Wins: {opponentWins}</h2>
      </div>

      <div className="current-streak">
        <h1>Current Streak</h1>
        <h2>Wins: {playerStreak}</h2>
        <h2>Losses: {opponentStreak}</h2>
      </div>

      <div className="outcome">
        <h1 ref={playerWin} id="player-wins">Player Wins!</h1>
        <h1 ref={tie} id="tie">Tie!</h1>
        <h1 ref={playerLoose} id="player-loose">Player Loose!</h1>
      </div>

      <div className="buttons">
        <button ref={rockBtn} id="rock" onClick={Rock}></button>
        <button ref={paperBtn} id="paper" onClick={Paper}></button>
        <button ref={scissorsBtn} id="scissors" onClick={Scissor}></button>
      </div>

      <button id="restart-game" onClick={() => dispatch(clearRun())}>
        Restart Game
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    playerWins: state.playerWin,
    opponentWins: state.playerLoose,
    playerStreak: state.playerWinStreak,
    opponentStreak: state.playerLooseStreak,
  };
};

export default connect(mapStateToProps)(Game);
