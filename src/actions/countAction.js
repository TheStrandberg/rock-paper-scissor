export const playerWinAction = () => {
    return {
        type: "ADD_PLAYER_WIN"
    }
}

export const playerLossAction = () => {
    return {
        type: "ADD_PLAYER_LOSS"
    }
}

export const resetRun = () => {
    return {
        type: "CLEAR_RUN"
    }
}