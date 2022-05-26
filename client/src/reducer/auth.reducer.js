import { createSlice } from "@reduxjs/toolkit";
import { loginAction, registerAction } from "../action/auth.action";

const initialState = {
    message: "",
    loading: false,
    data: [],
    token: ""
}

const authSlice = createSlice({
    name: "authreducer",
    initialState,
    reducers:{
        removeMessage: (state,action)=>{
            state.message = "";
        },
        removeToken: (state, action)=>{
            state.token = "";
        }
    },
    extraReducers:{
        [registerAction.fulfilled]: (state, action) =>{
            state.loading = false;
            state.message = action.payload.message;
        },
        [registerAction.pending]: (state, action)=>{
            state.loading = true;
        },
        [loginAction.fulfilled]: (state, action) =>{
            state.loading = false;
            state.message = action.payload.message;
            state.token = action.payload.token;
            state.data.push(action.payload.data);

            const linkedinUserData = { ...action.payload.data, password: ""}
            localStorage.setItem("linkedinToken", action.payload.token);
            localStorage.setItem("linkedinUserData", JSON.stringify(linkedinUserData));
        },
        [loginAction.pending]: (state, action)=>{
            state.loading = true;
        }
    }
});


export const authActions = authSlice.actions;
export default authSlice.reducer;