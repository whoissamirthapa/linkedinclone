import express from "express";
import { registerController, loginController, getUser } from "../controller/user.controller.js";
import { isAdmin, isAuth } from "../middleware/user.middleware.js";

const router = express.Router();

router.get('/', (req, res)=>{
    res.send("hello from user router")
})

// api/users/register
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/all-user', isAuth, isAdmin, getUser);

export default router;


