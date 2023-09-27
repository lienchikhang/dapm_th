import {combineReducers} from 'redux'
import userReducer from './user'
import shoeReducer from './shoe'
const rootReducer = combineReducers({
    userReducer,
    shoeReducer
})

export default rootReducer