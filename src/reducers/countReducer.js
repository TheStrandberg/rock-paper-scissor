const initialState = {
    playerWinStreak: 0,
    opponentWinStreak: 0
}

const countReducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_PLAYER_WIN":
            return {
                ...state,
                ...state.playerWinStreak + 1
            }
        case "ADD_OPPONENT_WIN":
            return {
                ...state,
                ...state.opponentWinStreak + 1
            }
        case "CLEAR_RUN":
            return state = initialState
    }
}

export default countReducer;

