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
        if (opponentHand === 1) {
            const outcomeTie = document.getElementById("tie");
            rockBtn.style.backgroundColor = "yellow";
            rockBtn.style.pointerEvents = "none"
            outcomeTie.style.display = "inline";
            setTimeout(() => {
                rockBtn.style.backgroundColor = "transparent"; 
                outcomeTie.style.display = "none";
                rockBtn.style.pointerEvents = "auto";
            }, 2000);
        }
        else if (opponentHand === 2) {
            const outcomeLoose = document.getElementById("player-loose");
            dispatch(playerLossAction());
            rockBtn.style.backgroundColor = "red";
            rockBtn.style.pointerEvents = "none"
            outcomeLoose.style.display = "inline";
            setTimeout(() => {
                rockBtn.style.backgroundColor = "transparent"; 
                rockBtn.style.pointerEvents = "auto";
                outcomeLoose.style.display = "none";
            }, 2000);
        }
        else {
            const outcomeWin = document.getElementById("player-wins");
            dispatch(playerWinAction());
            rockBtn.style.backgroundColor = "green";
            rockBtn.style.pointerEvents = "none"
            outcomeWin.style.display = "inline";
            setTimeout(() => {
                rockBtn.style.backgroundColor = "transparent"; 
                rockBtn.style.pointerEvents = "auto";
                outcomeWin.style.display = "none";
            }, 2000);
        }
    }

    function Paper() {
        const paperBtn = document.getElementById("paper");
        GenerateOpponentHand()
        if (opponentHand === 1) {
            const outcomeWin = document.getElementById("player-wins");
            dispatch(playerWinAction());
            paperBtn.style.backgroundColor = "green";
            paperBtn.style.pointerEvents = "none"
            outcomeWin.style.display = "inline";
            setTimeout(() => {
                paperBtn.style.backgroundColor = "transparent"; 
                paperBtn.style.pointerEvents = "auto";
                outcomeWin.style.display = "none";
            }, 2000);
        }
        else if (opponentHand === 2) {
            const outcomeTie = document.getElementById("tie");
            paperBtn.style.backgroundColor = "yellow";
            paperBtn.style.pointerEvents = "none"
            outcomeTie.style.display = "inline";
            setTimeout(() => {
                paperBtn.style.backgroundColor = "transparent";
                paperBtn.style.pointerEvents = "auto"; 
                outcomeTie.style.display = "none";
            }, 2000);
        }
        else {
            const outcomeLoose = document.getElementById("player-loose");
            dispatch(playerLossAction());
            paperBtn.style.backgroundColor = "red";
            paperBtn.style.pointerEvents = "none"
            outcomeLoose.style.display = "inline";
            setTimeout(() => {
                paperBtn.style.backgroundColor = "transparent"; 
                paperBtn.style.pointerEvents = "auto";
                outcomeLoose.style.display = "none";
            }, 2000);
        }
    }

    function Scissor() {
        GenerateOpponentHand()
        const scissorsBtn = document.getElementById("scissors");
        if (opponentHand === 1) {
            const outcomeLoose = document.getElementById("player-loose");
            dispatch(playerLossAction());
            scissorsBtn.style.backgroundColor = "red";
            scissorsBtn.style.pointerEvents = "none"
            outcomeLoose.style.display = "inline";
            setTimeout(() => {
                scissorsBtn.style.backgroundColor = "transparent"; 
                scissorsBtn.style.pointerEvents = "auto";
                outcomeLoose.style.display = "none";
            }, 2000);
        }
        else if (opponentHand === 2) {
            const outcomeWin = document.getElementById("player-wins");
            dispatch(playerWinAction());
            scissorsBtn.style.backgroundColor = "green";
            scissorsBtn.style.pointerEvents = "none"
            outcomeWin.style.display = "inline";
            setTimeout(() => {
                scissorsBtn.style.backgroundColor = "transparent"; 
                scissorsBtn.style.pointerEvents = "auto";
                outcomeWin.style.display = "none";
            }, 2000);
        }
        else {
            const outcomeTie = document.getElementById("tie");
            scissorsBtn.style.backgroundColor = "yellow";
            scissorsBtn.style.pointerEvents = "none"
            outcomeTie.style.display = "inline";
            setTimeout(() => {
                scissorsBtn.style.backgroundColor = "transparent";
                scissorsBtn.style.pointerEvents = "auto"; 
                outcomeTie.style.display = "none";
            }, 2000);
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
        opponentWins: state.playerLoose,
        playerStreak: state.playerWinStreak,
        opponentStreak: state.playerLooseStreak,
    };
}

export default connect(mapStateToProps)(Game);
