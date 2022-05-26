import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../axios';


export const addCommentAction = createAsyncThunk(
    "addcommentaction",
    async(dataa)=>{
        const response = await api({
            method: "post",
            url: `/api/comment/add/${dataa.id}`,
            data: dataa.content,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("linkedinToken")
            }
        })

        return response.data;
    }
)
export const getCommentAction = createAsyncThunk(
    "getcommentaction",
    async(id)=>{
        const response = await api({
            method: "get",
            url: `/api/comment/get/${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("linkedinToken")
            }
        })

        return response.data;
    }
)

export const getAllCommentAction = createAsyncThunk(
    "getallcommentaction",
    async()=>{
        const response = await api({
            method: "get",
            url: `/api/comment/get-all`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("linkedinToken")
            }
        })

        return response.data;
    }
)


export const deleteCommentAction = createAsyncThunk(
    "deletecommentaction",
    async(data)=>{
        const response = await api({
            method: "delete",
            url: `/api/comment/${data.postId}/delete/${data.commentId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("linkedinToken")
            }
        })

        return response.data;
    }
)