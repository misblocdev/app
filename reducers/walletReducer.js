const initialState = {
    isLoggedIn: false,
}

const walletReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'WALLET_LOGIN': {
            return {
                ...state,
                isLoggedIn: action.value,
                account: action.account,
                permissions: action.permissions,
                balance: '-',
                points: '-',
            }
        }
        case 'REFRESH_TOKEN_BALANCE': {
            return {
                ...state,
                balance: action.balance,
            }
        }
        case 'REFRESH_POINT_BALANCE': {
            return {
                ...state,
                points: action.points,
                tier: action.tier,
                remainLike: action.remainLike,
                lastLikeTime: action.lastLikeTime,
                hospitals: action.hospitals,
            }
        }
        case 'WALLET_LOGOUT': {
            return {
                ...state,
                isLoggedIn: false,
                account: '',
                permissions: '',
            }
        }
        default: {
            return state;
        }
    }
}

export default walletReducer;