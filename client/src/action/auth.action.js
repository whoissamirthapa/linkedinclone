import { createAsyncThunk } from "@reduxjs/toolkit";

import api from '../axios';

export const registerAction = createAsyncThunk(
    "registeraction",
    async(data)=>{
        const res = await api.post('/api/user/register', 
        data,
        {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res.data;
    }
)



export const loginAction = createAsyncThunk(
    "loginaction",
    async(data)=>{
        const res = await api.post("/api/user/login", 
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res.data;
    }
)