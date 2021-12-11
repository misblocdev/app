const initialState = {
    actions: [],
    isPolling: false
}

const tokenActionReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_TOKEN_ACTIONS': {
            return {
                ...state,
                actions: action.value,
                isPolling: false,
            }
        }
        case 'CLEAR_TOKEN_ACTIONS': {
            return {
                ...state,
                actions: []
            }
        }
        case 'IS_POLLING_TOKEN_ACTIONS': {
            return {
                ...state,
                isPolling: action.value,
            }
        }
        default: {
            return state;
        }
    }
}

export default tokenActionReducer;