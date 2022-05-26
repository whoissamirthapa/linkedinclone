import User from '../model/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerController = async(req,res)=>{
    const { email, password, firstname, lastname } = req.body;
    if( !email || !password || !firstname || !lastname){
        return res.json({ message: "Input must be filled up"});
    }
    try {
        const userExist = await User.findOne({ email });
        if(userExist){
            return res.json({ message: "User already exist!"});
        }
        
        const hashedPw = await bcryptjs.hash(password, 12);

        const user = await new User({
            firstname,
            lastname,
            email,
            password: hashedPw
        }).save();

        if(user){
            return res.json({ message: "User sucessfully registered!", data: user});
        }
        res.json({ message: "User registered failed!"});

    } catch (error) {
        console.log(error);
    }
}

export const loginController = async(req, res)=>{
    const { email, password } = req.body;
    if( !email || !password ){
        return res.json({ message: "Input must be filled up!"});
    }

    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.json({ message: "User not found!"});
        }

        const matching = bcryptjs.compare(password, user.password);
        if(matching){
            const token = jwt.sign(
                {userId: user._id},
                process.env.JWT_SECRET || "fagheoisgshoghwoeifhd",
                {
                    expiresIn: "30d"
                }
            );
            return res.json({ message: "User logged in successfully!", token, data: user});

        }else{
            return res.json({ message: "Invalid Credential!"});
        }

    } catch (error) {
        console.log(error)
    }
}

export const getUser = async(req,res)=>{

    try {        
        const user = await User.find();
        if(user){
            return res.json({data: user});
        }
        res.json({message: "user not found"});
    } catch (error) {
        console.log(error)
    }
}