import { createSlice } from "@reduxjs/toolkit"
import { addPostAction, deletePostAction, getPostAction } from "../action/post.action";


const initialState = {
    error: "",
    message: "",
    postDeleteMessage: "",
    loading: false,
    data: []
}
const postSlice = createSlice({
    name: "postreducer",
    initialState,
    reducers:{
        removeMessage: (state,action)=>{
            state.message = ""
        },
        removeDeleteMessage: (state,action)=>{
            state.postDeleteMessage = ""
        }, 
        removeError: (state,action)=>{
            state.error=""
        }
    },
    extraReducers: {
        [addPostAction.fulfilled]: (state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.data.unshift(action.payload.data);
        },
        [addPostAction.pending]: (state,action)=>{
            state.loading = true;
        },
        [addPostAction.rejected]: (state,action)=>{
            state.loading = false;
            state.error = "Error in uploading image! Please make sure you that are uploading image of jpeg/jpg/png/gif of maxsize 2MB"
        },
        [getPostAction.fulfilled]: (state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            if(action.payload.data){
                const datawithnewsorting = action.payload.data.reverse();
                state.data = [ ...datawithnewsorting]
            }
        },
        [getPostAction.pending]: (state,action)=>{
            state.loading = true;
        },
        [deletePostAction.fulfilled]: (state,action)=>{
            state.loading = false;
            state.postDeleteMessage = action.payload.message;
            const dataFilter = state.data.filter(item=> item._id !== action.payload.data._id)
            state.data = [ ...dataFilter]
        },
        [deletePostAction.pending]: (state,action)=>{
            state.loading = true;
        },
    }
})


export const postActions = postSlice.actions;
export default postSlice.reducer;