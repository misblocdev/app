const initialState = {
    account: [],
}

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ACCOUNT_LOGIN': {
            return {
                ...state,
                account: action.value
            }
        }
        case 'ACCOUNT_LOGOUT': {
            return {
                ...state,
                account: []
            }
        }
        default: {
            return state;
        }
    }
}

export default loginReducer;