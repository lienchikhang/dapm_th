const initialState = {
    shoeAddCart: {},
}

const shoeDetailReducer = (state = initialState, {type, payload}) => { 
    switch(type) {
        case 'ADD_TO_CART': {
            return {
                ...state,
                shoeAddCart: payload
            }
        }
        default: {
            return state;
        }
    }
 }

 export default shoeDetailReducer;