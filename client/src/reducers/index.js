import {combineReducers} from 'redux'
import userReducer from './user'
import shoeReducer from './shoe'
import navbarReducer from './navbar'
const rootReducer = combineReducers({
    userReducer,
    shoeReducer,
    navbarReducer
})

export default rootReducer