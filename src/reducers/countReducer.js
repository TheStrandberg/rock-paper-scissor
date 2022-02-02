const initialState = {
    playerWinStreak: 0,
    playerLooseStreak: 0,
}

const countReducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_PLAYER_WIN":
            return {
                ...state,
                playerWinStreak: state.playerWinStreak + 1
            }
        case "ADD_PLAYER_LOSS":
            return {
                ...state,
                playerLooseStreak: state.playerLooseStreak + 1
            }
        case "CLEAR_RUN":
            return state = initialState
        
    default:
        return state
    }
}

export default countReducer;

