export const loginStart = () => { 
    return {
        type: 'LOGIN_START'
    }
 }

 export const loginFailure = () => { 
    return {
        type: 'LOGIN_FAILURE'
    }
 }

 export const loginSuccess = (data) => { 
    return {
        type: 'LOGIN_SUCCESS',
        payload: data,
    }
 }