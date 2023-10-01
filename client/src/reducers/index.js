import {combineReducers} from 'redux'
import userReducer from './user'
import shoeReducer from './shoe'
import navbarReducer from './navbar'
import shoeDetailReducer from './shoeDetail_Khang'
import cartReducer from './cartReducer'
const rootReducer = combineReducers({
    userReducer,
    shoeReducer,
    navbarReducer,
    shoeDetailReducer,
    cartReducer
})

export default rootReducer