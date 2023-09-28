const initialState = {
    shoe: '650bf5597fc295678f32d27a'
}

const shoeReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case 'VIEW_SHOE': {
            return {
                ...state,
                shoe: payload
            }
        }
        default: {
            return state;
        }
    }
}

export default shoeReducer