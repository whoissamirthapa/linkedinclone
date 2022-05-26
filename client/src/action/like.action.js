import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../axios';


export const toggleLikeAction = createAsyncThunk(
    "togglelikeaction",
    async(id)=>{
        const response = await api({
            method: "post",
            url: `/api/like/post/${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("linkedinToken")
            }
        })

        return response.data;
    }
)


export const getAllLikeAction = createAsyncThunk(
    "getalllikeaction",
    async(id)=>{
        const response = await api({
            method: "get",
            url: `/api/like/posts`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("linkedinToken")
            }
        })

        return response.data;
    }
)