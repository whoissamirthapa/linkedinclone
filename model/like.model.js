import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    likerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        Ref: "User",
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        Ref: "Post",
    },
    like: {
        type: Number,
    }
},
{
    timestamps: true
}
)

export default mongoose.model("Like", likeSchema);