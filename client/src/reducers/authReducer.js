const initialState = {
    authLoading: true,
    isAuthenticated: false,
    user: null,
}

const authReducer = (state= initialState, { type, payload }) => {
  switch (type) {

  case 'SET_AUTH':
    return { ...state, user: payload.user,isAuthenticated: payload.isAuthenticated, authLoading: false }

  default:
    return state
  }
}

export default authReducer;