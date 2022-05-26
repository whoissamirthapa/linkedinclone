import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const isAuth = async(req,res, next)=>{
    const { authorization } = req.headers;
    if(authorization){
        jwt.verify(
            authorization,
            process.env.JWT_SECRET || "fagheoisgshoghwoeifhd",
            (err, decode)=>{
                if(err){
                    res.send({ err })
                    return;
                }
                if(decode){
                    req.user = decode;
                    next();
                }
            }
        )
    }else return res.json({ message: "User must logged in!"});
}

export const isAdmin = async(req, res, next)=>{
    try {
        const user = await User.findOne({ _id: req.user.userId});
        if(user){
            if(user.role === "admin"){
                next();
            }else{
                return res.status(403).json({ message: "Forbidden"})
            }
        }
    } catch (error) {
        //console.log(error);
    }
}