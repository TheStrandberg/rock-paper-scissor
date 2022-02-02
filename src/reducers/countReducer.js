const initialState = {
    playerWin: 0,
    playerLoose: 0,
    playerWinStreak: 0,
    playerLooseStreak: 0,
}

const countReducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_PLAYER_WIN":
            return {
                ...state,
                playerWin: state.playerWin + 1
            }
        case "ADD_PLAYER_LOSS":
            return {
                ...state,
                playerLoose: state.playerLoose + 1
            }
        case "ADD_PLAYER_STREAK_WIN":
            return {
                ...state,
                playerWinStreak: state.playerWinStreak + 1
            }
        case "ADD_PLAYER_STREAK_LOSS":
            return {
                ...state,
                playerLooseStreak: state.playerLooseStreak + 1
            }
        case "RESET_GAME": 
        return {
            ...state,
            playerWin: 0,
            playerLoose: 0
        }
        case "CLEAR_RUN":
            return state = initialState
        
    default:
        return state
    }
}

export default countReducer;

