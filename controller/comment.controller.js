
import User from '../model/user.model.js';
import Comment from '../model/comment.model.js';

export const addCommentController = async(req,res)=>{
    const { userId } = req.user;
    const { postId } = req.params;
    const { content } = req.body;
    if(!userId){
        return res.json({ message: "User must be logged in!"});
    }
    if(!content){
        return res.json({ message: "Comment should not be empty!"});
    }

    const user = await User.findOne({ _id: userId});

    const comment = await new Comment({
        commenterId: userId,
        commenterFirstName: user.firstname,
        commenterSecondName: user.lastname,
        postId,
        content
    }).save();

    if(comment){
        return res.json({ message: "Comment is added successfully!", data:comment});
    }
    res.json({ message: "Comment can not added!"});
    
}


export const getCommentController = async(req,res)=>{
    const { postId } = req.params;
    
    const comment = await Comment.find({ postId });
    if(comment){
        return res.json({ message: "Comment found!", data: comment});
    }
    res.json({ message: "Comment can not found!"});
}


export const getAllCommentController = async(req,res)=>{
    
    const comment = await Comment.find();
    if(comment){
        return res.json({ message: "Comment found!", data: comment});
    }
    res.json({ message: "Comment can not found!"});
}


export const deleteCommentController = async(req,res)=>{
    const { userId } = req.user;
    const { postId, commentId } = req.params;
    if(!userId){
        return res.json({ message: "User must logged in!"});
    }

    //console.log(userId, postId, commentId);
    const comment = await Comment.findOneAndRemove(
        {
            $and: [
                { commenterId: userId},
                { postId: postId},
                { _id: commentId}
            ]
        }
    )

    if(comment){
        return res.json({ message: "Comment deleted successfully!", data: comment});
    }
    return res.json({ message: "Can not delete!"});
}