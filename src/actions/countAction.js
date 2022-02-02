export const playerWinAction = () => {
    return {
        type: "ADD_PLAYER_WIN"
    }
}

export const opponentWinAction = () => {
    return {
        type: "ADD_OPPONENT_WIN"
    }
}

export const resetRun = () => {
    return {
        type: "CLEAR_RUN"
    }
}