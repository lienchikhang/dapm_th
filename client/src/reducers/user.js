const initialState = {
    user: {}
}

const userReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case 'SET_USER': {
            return {
                ...state,
                user: {...payload}
            }
        }
        default: {
            return state;
        }
    }
}

export default userReducer