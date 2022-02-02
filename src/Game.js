import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { playerLossAction, playerWinAction, resetGame, playerWinStreakAction, playerLossStreakAction, clearRun } from "./actions/countAction";

function Game( { playerWins, playerStreak, opponentWins, opponentStreak }) {  

    const dispatch = useDispatch();

    //Get current win/losses from redux store
    useSelector((state) => { 
        playerWins = state.playerWin; 
        playerStreak = state.playerWinStreak;
        opponentWins = state.playerLoose;
        opponentStreak = state.playerLooseStreak;
    });

    let opponentHand = 0;
    function GenerateOpponentHand() {
        opponentHand = Math.floor(Math.random() * (4 - 1) + 1);
        console.log("Opponent hand: ", opponentHand);
        //1 = rock
        //2 = paper
        //3 = scissor
    }
    
    function Rock() {
        GenerateOpponentHand()
        const rockBtn = document.getElementById("rock");
        const outcome = document.getElementById("tie");
        if (opponentHand === 1) {
            console.log("tie");
            rockBtn.style.backgroundColor = "yellow";
            outcome.style.display = "inline";
            setTimeout(() => {
                rockBtn.style.backgroundColor = "transparent"; 
                outcome.style.display = "none";
            }, 2000);
        }
        else if (opponentHand === 2) {
            console.log("player loose");
            dispatch(playerLossAction());
            rockBtn.style.backgroundColor = "red";
            setTimeout(() => {
                rockBtn.style.backgroundColor = "transparent"; 
            }, 500);
        }
        else {
            console.log("player win");
            dispatch(playerWinAction());
            rockBtn.style.backgroundColor = "green";
            setTimeout(() => {
                rockBtn.style.backgroundColor = "transparent"; 
            }, 500);
        }
    }

    function Paper() {
        const paperBtn = document.getElementById("paper");
        GenerateOpponentHand()
        if (opponentHand === 1) {
            console.log("player win");
            dispatch(playerWinAction());
            paperBtn.style.backgroundColor = "green";
            setTimeout(() => {
                paperBtn.style.backgroundColor = "transparent"; 
            }, 500);
        }
        else if (opponentHand === 2) {
            console.log("tie");
            paperBtn.style.backgroundColor = "yellow";
            setTimeout(() => {
                paperBtn.style.backgroundColor = "transparent"; 
            }, 500);
        }
        else {
            console.log("player loose");
            dispatch(playerLossAction());
            paperBtn.style.backgroundColor = "red";
            setTimeout(() => {
                paperBtn.style.backgroundColor = "transparent"; 
            }, 500);
        }
    }

    function Scissor() {
        GenerateOpponentHand()
        const scissorsBtn = document.getElementById("scissors");
        if (opponentHand === 1) {
            console.log("player loose");
            dispatch(playerLossAction());
            scissorsBtn.style.backgroundColor = "red";
            setTimeout(() => {
                scissorsBtn.style.backgroundColor = "transparent"; 
            }, 500);
        }
        else if (opponentHand === 2) {
            console.log("player win");
            dispatch(playerWinAction());
            scissorsBtn.style.backgroundColor = "green";
            setTimeout(() => {
                scissorsBtn.style.backgroundColor = "transparent"; 
            }, 500);
        }
        else {
            console.log("tie");
            scissorsBtn.style.backgroundColor = "yellow";
            setTimeout(() => {
                scissorsBtn.style.backgroundColor = "transparent"; 
            }, 500);
        }
    }

    if (opponentWins === 2) {
         //call dispatch, add player loss to current streak
         dispatch(playerLossStreakAction());   
         dispatch(resetGame());

        }
        else if (playerWins === 2) {
            //call dispatch, add player win to current streak
            dispatch(playerWinStreakAction());
            dispatch(resetGame());
        }

  return <div className="game-page">
  <h1 id="header">The game is "Rock, Paper, Scissors", and the rules are best out of three</h1>

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
  <h1 id="player-wins">Player Wins!</h1>
  <h1 id="tie">Tie!</h1>
  <h1 id="player-loose">Player Loose!</h1>
  </div>
 

  <div className="buttons">
  <button id="rock" onClick={Rock}></button>
  <button id="paper" onClick={Paper}></button>
  <button id="scissors" onClick={Scissor}></button>
  </div>
  
  <button id="restart-game" onClick={() => dispatch(clearRun())}>Restart Game</button>
  </div>
}

const mapStateToProps = (state) => {
    return {
        playerWins: state.playerWin,
        playerLoose: state.playerLoose,
        playerWinStreak: state.playerWinStreak,
        playerLooseStreak: state.playerLooseStreak,
    };
}

export default connect(mapStateToProps)(Game);
