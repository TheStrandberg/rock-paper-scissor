import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playerLossAction, playerWinAction, resetGame, playerWinStreakAction, playerLossStreakAction } from "./actions/countAction";
import {connect} from "react-redux";

function Game( { playerWins, playerStreak, opponentWins, opponentStreak }) {  

    const dispatch = useDispatch();

    //Get current streak from redux store
    useSelector((state) => { 
        playerWins = state.playerWin; 
        playerStreak = state.playerWinStreak;
        opponentWins = state.playerLoose;
        opponentStreak = state.playerLooseStreak;
    });
    
    useEffect(() => {
        GenerateOpponentHand();
    }, [])

    let opponentHand = 0;
    function GenerateOpponentHand() {
        opponentHand = Math.floor(Math.random() * (4 - 1) + 1);
        console.log("Opponent hand: ", opponentHand);
        //1 = rock
        //2 = paper
        //3 = scissor
    }
    
    // function Rock() {
    //     if (opponentHand === 1) {
    //         console.log("opponent = rock");
    //         console.log("tie");
    //     }
    //     else if (opponentHand === 2) {
    //         console.log("opponent = paper");
    //         console.log("player loose");
    //         setOpponentWin(opponentWin + 1);
    //     }
    //     else {
    //         console.log("player wins");
    //         console.log("opponent = scissor");
    //         setPlayerWin(playerWin + 1);
    //     }
    //     GenerateOpponentHand()
    // }

    // function Paper() {
    //     if (opponentHand === 1) {
    //         console.log("player wins");
    //         setPlayerWin(playerWin + 1);
    //     }
    //     else if (opponentHand === 2) {
    //         console.log("tie");
    //     }
    //     else {
    //         console.log("player loose");
    //         setOpponentWin(opponentWin + 1);
    //     }
    //     GenerateOpponentHand()
    // }

    function Scissor() {
        if (opponentHand === 1) {
            console.log("player loose");
            dispatch(playerLossAction());
        }
        else if (opponentHand === 2) {
            console.log("player win");
            dispatch(playerWinAction());
        }
        else {
            console.log("tie");
        }
        GenerateOpponentHand()
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

  <div className="current-score">
  <h1>Player Win: {playerWins}</h1>
  <h1>Opponent Win: {opponentWins}</h1>
  <h2>Choose!</h2>
  </div>

  <div className="current-streak">
    <h1>Current Streak</h1>
    <h2>Wins: {playerStreak}</h2>
    <h2>Losses: {opponentStreak}</h2>
  </div>

  <div className="buttons">
    {/* <button id="rock" onClick={Rock}>Rock</button>
    <button id="paper" onClick={Paper}>Paper</button> */}
    <button id="scissor" onClick={Scissor}>Scissor</button>
  </div>
  </div>;
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
