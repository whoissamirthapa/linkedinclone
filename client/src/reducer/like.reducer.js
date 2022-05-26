import { createSlice } from "@reduxjs/toolkit";
import { getAllLikeAction, toggleLikeAction } from "../action/like.action";

const initialState = {
    loading: false,
    message: "",
    data: []
}

const likeSlice = createSlice({
    name: "likereducer",
    initialState,
    reducers: {},
    extraReducers: {
        [toggleLikeAction.fulfilled]: (state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            if(action.payload.message === "Liked!"){
                state.data.push(action.payload.data);
            }

            if(action.payload.message === "Like removed!"){
                const filteredItem = state.data.filter(item=> {
                    return (
                        item.likerId !== action.payload.data.likerId || item.postId !== action.payload.data.postId
                    )
                })
                
                state.data = [ ...filteredItem];
            }
        },
        [toggleLikeAction.pending]: (state, action)=>{
            state.loading = true;
        },
        [getAllLikeAction.fulfilled]: (state, action)=>{
            state.loading = false;
            state.data = [ ...action.payload.data]
        },
        [getAllLikeAction.pending]: (state, action)=>{
            state.loading = true;
        },

    }
})


export const likeActions = likeSlice.actions;
export default likeSlice.reducer;