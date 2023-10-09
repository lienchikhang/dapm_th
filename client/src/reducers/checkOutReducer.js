import { createSlice } from "@reduxjs/toolkit";
const checkOutReducer = createSlice({
    name: "checkOutInfo",
    initialState: {
        Info: "unknow",
    },
    reducers:{
        saveInfo:(state,action)=>{
            state.Info=action.payload
        }
    },
})
export const {saveInfo}=checkOutReducer.actions
export default checkOutReducer.reducer