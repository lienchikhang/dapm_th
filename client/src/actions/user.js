//các action creators
export const uploadUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}