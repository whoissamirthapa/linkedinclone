import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    posterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    posterFirstName: {
        type: String,
        required: true,
        ref: "User"
    },
    posterSecondName:{
        type: String,
        required: true,
        ref: "User"
    },
    content: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    }
},
{
    timestamps: true,
})

export default mongoose.model("Post", postSchema);