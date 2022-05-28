import express from 'express';
import 'dotenv/config'
import cors from "cors"; 
import path from 'path';
import './config.js';
import userRouter from './router/user.router.js';
import postRouter from './router/post.router.js';
import commentRouter from './router/comment.router.js';
import likeRouter from './router/like.router.js';

const app = express();
// development (cross origin)
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use("/", (req,res)=>{
//     res.send("Hello from server");
// })


app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);


if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve('client','build','index.html'));
    })
}


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log("Server is running at "+PORT);
})