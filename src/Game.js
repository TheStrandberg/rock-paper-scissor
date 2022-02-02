import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { opponentWinAction, playerWinAction } from "./actions/countAction";

function Game() {  

    const [playerWin, setPlayerWin] = useState(0);
    const [opponentWin, setOpponentWin] = useState(0);
    const dispatch = useDispatch();

    const playerStreak = useSelector((state) => { return state.playerWinStreak });
    console.log(playerStreak);
    
    let number = 0;

    
    useEffect(() => {
        GenerateOpponentHand();
    }, [])

    function GenerateOpponentHand() {
        number = Math.floor(Math.random() * (4 - 1) + 1);
        console.log(number);
        //1 = rock
        //2 = paper
        //3 = scissor
    }
    
    function Rock() {
        if (number === 1) {
            console.log("opponent = rock");
            console.log("tie");
        }
        else if (number === 2) {
            console.log("opponent = paper");
            console.log("player loose");
            setOpponentWin(opponentWin + 1);
        }
        else {
            console.log("player wins");
            console.log("opponent = scissor");
            setPlayerWin(playerWin + 1);
        }
        GenerateOpponentHand()
    }

    function Paper() {
        if (number === 1) {
            console.log("player wins");
            setPlayerWin(playerWin + 1);
        }
        else if (number === 2) {
            console.log("tie");
        }
        else {
            console.log("player loose");
            setOpponentWin(opponentWin + 1);
        }
        GenerateOpponentHand()
    }

    function Scissor() {
        if (number === 1) {
            console.log("player loose");
            setOpponentWin(opponentWin + 1);
        }
        else if (number === 2) {
            console.log("player win");
            setPlayerWin(playerWin + 1);
        }
        else {
            console.log("tie");
        }
        GenerateOpponentHand()

        if (opponentWin === 2) {
            setPlayerWin(0);
            setOpponentWin(0);

            //call dispatch, add opponent win to current streak
            dispatch(opponentWinAction());

        }
        else if (playerWin === 2) {
            setPlayerWin(0);
            setOpponentWin(0);

            //call dispatch, add player win to current streak
            dispatch(playerWinAction());
            
        }
    }

  return <div className="game-page">

  <div className="current-score">
  <h1>Player Win: {playerWin}</h1>
  <h1>Opponent Win: {opponentWin}</h1>
  <h2>Choose!</h2>
  </div>

  <div className="current-streak">
    <h1>Current Streak</h1>
    {/* <h2>Wins: {playerStreak}</h2> */}
    <h2>Losses: {}</h2>
  </div>

  <div className="buttons">
    <button id="rock" onClick={Rock}>Rock</button>
    <button id="paper" onClick={Paper}>Paper</button>
    <button id="scissor" onClick={Scissor}>Scissor</button>
  </div>
  </div>;
}

export default Game;
