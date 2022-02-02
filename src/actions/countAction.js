export const playerWinAction = () => {
    return {
        type: "ADD_PLAYER_WIN"
    }
}

export const playerWinStreakAction = () => {
    return {
        type: "ADD_PLAYER_STREAK_WIN"
    }
}

export const playerLossAction = () => {
    return {
        type: "ADD_PLAYER_LOSS"
    }
}

export const playerLossStreakAction = () => {
    return {
        type: "ADD_PLAYER_STREAK_LOSS"
    }
}

export const resetGame = () => {
    return {
        type: "RESET_GAME"
    }
}

export const resetRun = () => {
    return {
        type: "CLEAR_RUN"
    }
}