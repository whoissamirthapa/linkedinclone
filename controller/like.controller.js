import Like from "../model/like.model.js";

export const addLikeController = async(req,res)=>{
    const { userId } = req.user;
    const { postId } = req.params;

    if(!userId){
        return res.json({ message: "User must logged in!"});
    }

    const existLike = await Like.findOne({
        $and: [
            { likerId: userId},
            { postId }
        ]
    });


    //console.log("exist like "+existLike);
    if(existLike){
        const removeExistLike = await Like.findOneAndRemove({
            $and:[
                { likerId: userId},
                { postId }
            ]
        });
        //console.log("remove exist like "+removeExistLike);
        res.json({ message: "Like removed!", data: removeExistLike});
    }
    else{
        const addedLike = await new Like({
            likerId: userId,
            postId,
            like: 1
        }).save();

        //console.log("added like "+addedLike);
        res.json( { message:"Liked!", data: addedLike })
    }
}

//get likes of a post
export const getLikeController = async(req,res)=>{
    const { userId } = req.user;
    const { postId } = req.params;

    if(!userId){
        return res.json({ message: "User must be logged in!"});
    }

    const like = await Like.find({
        postId
    })
    if(!like){
        return res.json({ message: "Like not found",});
    }

    res.json({ message: "Like found", data: like});
}

// get likes of all posts
export const getAllLikeController = async(req,res)=>{
    const { userId } = req.user;

    if(!userId){
        return res.json({ message: "User must be logged in!"});
    }

    const like = await Like.find();
    if(!like){
        return res.json({ message: "Like not found",});
    }

    res.json({ message: "Like found", data: like});
}

