const initialState = {
    myReviews: 0,
    myReservations: 0,
    myEvents: 0,
    myHospitals: 0,
    myMessages: 0,
}

const unreadReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_MY_EVENT_UNREAD': {
            return {
                ...state,
                myEvents: action.value
            }
        }
        case 'SET_MY_HOSPITAL_UNREAD': {
            return {
                ...state,
                myHospitals: action.value
            }
        }
        default: {
            return state;
        }
    }
}

export default unreadReducer;