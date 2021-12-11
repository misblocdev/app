const initialState = {
    actions: [],
    isPolling: false
}

const pointActionReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_POINT_ACTIONS': {
            return {
                ...state,
                actions: action.value,
                isPolling: false,
            }
        }
        case 'CLEAR_POINT_ACTIONS': {
            return {
                ...state,
                actions: []
            }
        }
        case 'IS_POLLING_POINT_ACTIONS': {
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

export default pointActionReducer;