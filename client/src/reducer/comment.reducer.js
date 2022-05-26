import { createSlice } from "@reduxjs/toolkit"
import { 
    addCommentAction, 
    getCommentAction, 
    getAllCommentAction, 
    deleteCommentAction
} from "../action/comment.action";
const initialState = {
    message: "",
    loading: "",
    data: [],
}

const commentSlice = createSlice({
    name: "commentreducer",
    initialState,
    reducers: {
        removeMessage: (state,action)=>{
            state.message = ""
        }
    },
    extraReducers: {
        [addCommentAction.fulfilled]: (state, action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.data.unshift(action.payload.data);
        },
        [addCommentAction.pending]: (state, action)=>{
            state.loading = true;
        },
        [addCommentAction.rejected]: (state, action)=>{
           state.loading = false;
        },
        [getCommentAction.fulfilled]: (state, action)=>{
            state.loading = false;
            state.message = action.payload.message;
            const formattedComment = action.payload.data.reverse();
            state.data = [ ...formattedComment];
        },
        [getCommentAction.pending]: (state, action)=>{
            state.loading = true;
        },
        [getCommentAction.rejected]: (state, action)=>{
           state.loading = false;
        },
        [getAllCommentAction.fulfilled]: (state, action)=>{
            state.loading = false;
            state.message = action.payload.message;
            const formattedComment = action.payload.data.reverse();
            state.data = [ ...formattedComment];
        },
        [getAllCommentAction.pending]: (state, action)=>{
            state.loading = true;
        },
        [getAllCommentAction.rejected]: (state, action)=>{
           state.loading = false;
        },
        [deleteCommentAction.fulfilled]: (state, action)=>{
            state.loading = false;
            state.message = action.payload.message;
            const formattedComment = state.data.filter(item=> item._id !== action.payload.data._id);
            state.data = [ ...formattedComment];
        },
        [deleteCommentAction.pending]: (state, action)=>{
            state.loading = true;
        },
        [deleteCommentAction.rejected]: (state, action)=>{
           state.loading = false;
        },
    }
})

export const commentActions = commentSlice.actions;
export default commentSlice.reducer;