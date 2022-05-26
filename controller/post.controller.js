import User from '../model/user.model.js';
import Post from '../model/post.model.js';
import Comment from '../model/comment.model.js';
import Like from '../model/like.model.js';
import { unlinkAsync } from '../middleware/image.upload.js';

export const addPostController = async(req,res)=>{
    const { content }  = req.body;

    if(req.file !== undefined){
        const fileurl = req.file.path;
        const urll = fileurl.slice(6,fileurl.length);
    
        //console.log(url.format({ protocol: req.protocol, host: req.get('host') }));
    
        const userId = req.user.userId;
        if(!userId){
            await unlinkAsync(fileurl);
            return res.json({ message: "User must logged in!"});
        }
        const user = await User.findOne({ _id: userId });
    
        const post = await new Post({
            posterId: userId,
            posterFirstName: user.firstname,
            posterSecondName: user.lastname,
            content,
            url: urll
        }).save();
    
        if(post){
            return res.json({ message: "Post sucessfully posted!", data: post});
        }
        
        await unlinkAsync(fileurl);
        return res.json({ message: "Problems while it is posted"});
        
    }
    else{
        const userId = req.user.userId;
        if(!userId){
            await unlinkAsync(fileurl);
            return res.json({ message: "User must logged in!"});
        }
        const user = await User.findOne({ _id: userId });
    
        const post = await new Post({
            posterId: userId,
            posterFirstName: user.firstname,
            posterSecondName: user.lastname,
            content,
        }).save();
        if(post){
            return res.json({ message: "Post sucessfully posted!", data: post});
        }
        
        await unlinkAsync(fileurl);
        return res.json({ message: "Problems while it is posted"});
    }
}

export const getPostController = async(req,res)=>{
    try {
        const post = await Post.find();
        if(post){
            return res.json({ message: "post find successfully!", data: post});
        }
        return res.json({ message: "Post can not be found!"});
    } catch (error) {
        console.log(error);
    }
}

export const deletePostController = async(req, res)=>{
    try {
        const { id } = req.params;
        if(!id){
            return res.json({ message: "Post not found!"});
        }
        const post = await Post.findOneAndRemove(
            { $and:[
                { posterId: req.user.userId },
                { _id: id }
            ]
            }
        )
        if(post){
            const effUrl = `public${post.url}`;
            if(effUrl !== "publicundefined"){
                await unlinkAsync(effUrl);
            }

            const comment = await Comment.deleteMany({ postId: id});
            //console.log(comment);

            const like = await Like.deleteMany({ postId: id});
            //console.log(like);
        
            res.json({ message: "Sucessfully deleted!", data: post});
        }
    } catch (error) {
        console.log(error);
    }
}


export const getSinglePostCotroller = async(req,res)=>{
    const { id } = req.params;
    const userId = req.user.userId;
    if(!userId){
        return res.json({ message: "User must logged in!"});
    }

    const post = await Post.findOne(
        {
            $and: [
                { _id: id},
                { posterId: userId}
            ]
        }
    )

    if(post){
        return res.json({ message: "Post found Successfullly!", data: post});
    }

    res.json({ message: "Post not found"});
}

export const updatePostController = async(req,res)=>{
    const { content } = req.body;
    const { userId } = req.user;
    const { id } = req.params;
    const { path } = req.file;
    const filePath = path.slice(6, path.length);
    if(!userId){
        return res.json({ message: "User must logged in!"});
    }

    const user = await User.findOne({ _id: userId});
    const singlePost = await Post.findOne({
        $and: [
            { posterId: userId},
            { _id: id}
        ]
    });

    if(!singlePost){
        return res.json({ message: "Post not found"});
    }
    
    
    // if(filePath === singlePost.url){
    //     const updatedPost = await Post.findOneAndUpdate(
    //         { 
    //             $and: [
    //                 { posterId: userId},
    //                 { _id: id}
    //             ]
    //         },
    //         {
    //             content
    //         }
    //     )
    // }
}