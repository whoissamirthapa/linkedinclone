import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/auth.reducer';
import commentReducer from '../reducer/comment.reducer';
import likeReducer from '../reducer/like.reducer';
import postReducer from '../reducer/post.reducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        like: likeReducer,
        comment: commentReducer
    }
})