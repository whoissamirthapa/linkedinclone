import React, { useEffect, useState } from 'react';
import classes from './feed.module.css';
import IndvComment from './indvComment';
import { deletePostAction } from '../../action/post.action';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getAllLikeAction, 
    toggleLikeAction 
} from '../../action/like.action';
import { 
    addCommentAction, 
    getAllCommentAction, 
    getCommentAction 
} from '../../action/comment.action';
import { postActions } from '../../reducer/post.reducer';
import { commentActions } from '../../reducer/comment.reducer';
import './feedStyle.css';
import {
    FaUserFriends, 
    FaEllipsisH, 
    FaRegEdit, 
    FaRegCommentDots, 
    FaUserCircle 
} from 'react-icons/fa';
import { 
    RiShareForwardLine, 
    RiSendPlaneFill,
    RiDeleteBin6Line, 
    RiDeleteBin6Fill 
} from 'react-icons/ri';
import { BiLike } from 'react-icons/bi';
import { AiTwotoneLike } from 'react-icons/ai';


const IndvPost = ({ data, Img }) => {

    const dispatch = useDispatch();
    const deletemessage = useSelector(state=>state.post.postDeleteMessage)
    const errormessage = useSelector(state=>state.post.error);
    const allLike = useSelector(state=>state.like.data);
    const commentmessage = useSelector(state=>state.comment.message);
    const allcomment = useSelector(state=>state.comment.data); 
    const userData = useSelector(state=>state.auth.data);

    const [editShow, setEditShow] = useState(false);
    // to give acess of delete 
    const [menuEdit, setMenuEdit] = useState(false);
    //get like of this post
    const [like, setLike] = useState([]);
    const [meLike, setMelike] = useState(false);
    //comment
    const [commentShow, setCommentShow] = useState(false);
    const [comment, setComment] = useState("");
    const [indvComment, setIndvComment] = useState([]);

    
    const localUser = JSON.parse(localStorage.getItem("linkedinUserData"));

    useEffect(()=>{
        if(localUser._id === data.posterId){
            setMenuEdit(true);
        }
    },[localUser, data]);


    const handleDelete = (id)=>{
        dispatch(deletePostAction(id));
    }

    useEffect(()=>{
        if(deletemessage){
            dispatch(postActions.removeDeleteMessage());
            setEditShow(false);
        }
    },[deletemessage, dispatch])

    useEffect(()=>{
        if(errormessage){
            alert(errormessage)
            dispatch(postActions.removeError());
        }
    },[errormessage, dispatch])


    const handleLike = (id)=>{
        if(meLike){
            setMelike(false)
            //console.log("clicked set "+meLike)
        }
        if(!meLike){
            setMelike(true)
            //console.log("uncliked "+meLike)
        }
        dispatch(toggleLikeAction(id));
    }
    
    useEffect(()=>{
        dispatch(getAllLikeAction());

    },[dispatch])

    useEffect(()=>{
        const thisLike = allLike.filter(like=> like.postId === data?._id);
        if(thisLike){
            setLike(prevState=>{
                return [ ...thisLike]
            })
        
            const meroLike = thisLike.filter(like=> like.likerId === localUser._id);
            if(meroLike.length > 0){
                setMelike(true);
            }
        }
    },[allLike])


    //comment section
    const handleSubmitComment = (e)=>{
        e.preventDefault();
        dispatch(addCommentAction({ id: data._id, content: { content: comment}}))
    }

    useEffect(()=>{
        if(commentmessage){
            //alert(commentmessage);
            dispatch(commentActions.removeMessage());
            setComment("")
        }
    },[commentmessage]);

    const handleGetComment = ()=>{
        //dispatch(getCommentAction(data._id));
        setCommentShow(!commentShow)
    }

    useEffect(()=>{
        dispatch(getAllCommentAction());

    },[dispatch])

    useEffect(()=>{
        const thisComment = allcomment.filter(item=> item.postId === data?._id)
        if(thisComment.length > 0){
            setIndvComment(()=>[...thisComment])
        }else{
            setIndvComment([])
        }
    },[allcomment])

    return (
        <section className={classes.indv_post} >
            <header className={classes.indv_post_header}>
                <div>
                    <img src={Img} alt="" />
                    <div>
                        <span>{data?.posterFirstName} {data?.posterSecondName}</span>
                        <p><FaUserFriends /> Shared with friends</p>
                    </div>
                </div>
                <div className={classes.indv_edit_div}>
                    { menuEdit && 
                    <button className={classes.edit_btn} onClick={()=>setEditShow(!editShow)}>
                    <FaEllipsisH className={classes.post_opt_icon} />
                    </button> }

                    { !menuEdit && 
                    <button className={classes.edit_btn}>
                    <FaEllipsisH className={classes.post_opt_icon} />
                    </button> }
                    { editShow && 
                    <span>
                        <button><FaRegEdit /> Edit</button>
                        <button onClick={()=>handleDelete(data._id)}> <RiDeleteBin6Line/> Delete</button>
                    </span> }
                </div>
            </header>
            <section className={classes.indv_post_body}>
                <p className={classes.indv_post_desc}>
                    {data?.content}
                </p>
                <div className={classes.indv_post_img}>
                    <img src={`${data.url && data.url}`} alt='' />
                    {/* <img src={`http://localhost:5000${data.url && data.url}`} alt='' /> */}
                </div>
                <div className={classes.like_count}>
                
                <p>
                <AiTwotoneLike /> {like && like.length} Likes
                </p>
                <p>
                    { indvComment && indvComment.length} comments
                </p>
                 
                </div>
            </section>
            <footer className={classes.indv_post_footer}>
                <section>
                    {
                        !meLike &&
                    <button onClick={()=>handleLike(data._id)}>
                        <BiLike className={classes.post_footer_icon} /> Like
                    </button>
                    }
                    {
                        meLike && 
                        <button onClick={()=>handleLike(data._id)}>
                        <AiTwotoneLike className={classes.post_footer_icon} /> Liked
                        </button>
                    }
                    <button onClick={handleGetComment}>
                        <FaRegCommentDots className={classes.post_footer_icon} /> Comment
                    </button>
                    <button>
                        <RiShareForwardLine className={classes.post_footer_icon} /> Share
                    </button>
                    <button>
                        <RiSendPlaneFill className={classes.post_footer_icon} /> Send
                    </button>
                </section>
            </footer>
            { commentShow && 
            <section className={classes.comment_container}>
                <form onSubmit={handleSubmitComment}>
                    <input 
                        type={"text"} 
                        name="comment" 
                        id='comment' 
                        placeholder='Add a comment...' 
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                    />
                    <button>Post</button>
                </form>
                <section className={classes.comments_}>
                    { indvComment && indvComment.map((item,key)=>{return(
                        <IndvComment item={item} postId={data._id} key={key}/>
                   )})}

                    {/* <section className={classes.indv_comment}>
                        <section>
                            <p>
                                <FaUserCircle/>
                            </p>
                            <div>
                                <p>Samir Thapa</p>
                                <p>Test comment</p>
                            </div>
                        </section>
                        <div className={classes.delete_commment_btn}>
                            <button>
                                <RiDeleteBin6Fill />
                            </button>
                        </div>
                    </section>
                    <section className={classes.indv_comment}>
                        <section>
                            <p>
                                <FaUserCircle/>
                            </p>
                            <div>
                                <p>Samir Thapa</p>
                                <p>Clap Clap</p>
                            </div>
                        </section>
                        <div className={classes.delete_commment_btn}>
                            <button>
                                <RiDeleteBin6Fill />
                            </button>
                        </div>
                    </section> */}
                </section>
            </section> }
        </section>
    )
}

export default IndvPost