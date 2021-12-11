const initialState = {
    data: ''
}

const socketReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_SOCKET_DATA': {
            return {
                ...state,
                data: action.value,
                success: action.success,
            }
        }
        case 'CLEAR_SOCKET_DATA': {
            return {
                ...state,
                data: ''
            }
        }
        default: {
            return state;
        }
    }
}

export default socketReducer;