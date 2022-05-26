import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../axios';

export const addPostAction = createAsyncThunk(
    "addpostaction",
    async(data)=>{
        const response = await api.post("/api/posts/add", data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.getItem("linkedinToken")
            }
        });

        return response.data;
    }
)

export const getPostAction = createAsyncThunk(
    "getpostaction",
    async()=>{
        const response = await api.get("/api/posts/get",{
            headers: {
                "Authorization": localStorage.getItem("linkedinToken")
            }
        });
        return response.data;
    }
)

export const deletePostAction = createAsyncThunk(
    "deletepostaction",
    async(data)=>{
        const response = await api.delete(`/api/posts/delete/${data}`,{
            headers: {
                "Authorization": localStorage.getItem("linkedinToken")
            }
        });
        return response.data;
    }
)