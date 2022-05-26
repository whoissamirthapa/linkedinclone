import express from "express";
import { addLikeController, getAllLikeController, getLikeController } from "../controller/like.controller.js";
import { isAuth } from "../middleware/user.middleware.js";

const router = express.Router();

router.post('/post/:postId', isAuth, addLikeController);
router.get('/post/:postId', isAuth, getLikeController);
router.get('/posts/', isAuth, getAllLikeController);


export default router;