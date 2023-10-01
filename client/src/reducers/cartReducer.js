const initialState = {
    cartUser: {},
}

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_CART_LIST': {
        return {
            ...state,
            cartUser: payload
        }
    }
  default:
    return state
  }
}

export default cartReducer;
