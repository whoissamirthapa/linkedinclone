import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    commenterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    commenterFirstName: {
        type: String,
        required: true,
        ref: "User"
    },
    commenterSecondName: {
        type: String,
        required: true,
        ref: "User"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Post"  
    },
    content: {
        type: String,
        required: [true, "Comment is required"]
    }
},
{
    timestamps: true,
}
)


export default mongoose.model("Comment", commentSchema);