

import express from "express";
import { 
    addCommentController, 
    deleteCommentController, 
    getAllCommentController, 
    getCommentController 
} from "../controller/comment.controller.js";
import { isAuth } from "../middleware/user.middleware.js";
const router = express.Router();


// /api/comment/
router.post("/add/:postId", isAuth, addCommentController);
router.get("/get/:postId", isAuth, getCommentController);
router.get("/get-all", isAuth, getAllCommentController);
router.delete("/:postId/delete/:commentId", isAuth, deleteCommentController);



export default router;