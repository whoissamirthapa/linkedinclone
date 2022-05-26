import express from "express";
import { 
    addPostController, 
    getPostController, 
    deletePostController, 
    getSinglePostCotroller, 
    updatePostController 
} from "../controller/post.controller.js";
import { isAuth } from "../middleware/user.middleware.js";
import upload from "../middleware/image.upload.js";

const router = express.Router();

// /api/posts/add 
router.post("/add", isAuth, upload.single('image'), addPostController);
router.get("/get", isAuth, getPostController);
router.delete("/delete/:id", isAuth, deletePostController);
router.get("/get-post/:id", isAuth, getSinglePostCotroller);
router.post("/update/:id", isAuth, updatePostController);


export default router;