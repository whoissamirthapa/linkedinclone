import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentAction } from '../../action/comment.action';
import classes from './feed.module.css';
import { RiDeleteBin6Fill  } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';

const IndvComment = ({ item, postId }) => {
    
    const dispatch = useDispatch();
    const userData = useSelector(state=>state.auth.data);
    const localUser = JSON.parse(localStorage.getItem('linkedinUserData'));

    const handleDeleteComment = ()=>{
        dispatch(deleteCommentAction({ postId: postId, commentId: item._id}));
    }

    return (
        <section className={classes.indv_comment}>
            <section>
                <p>
                    <FaUserCircle/>
                </p>
                <div>
                    <p>{item?.commenterFirstName} {item?.commenterSecondName}</p>
                    <p>{item?.content}</p>
                </div>
            </section>
            <div className={classes.delete_commment_btn}>
                {/* { console.log((userData?._id === item?.commenterId) || (localUser?._id === item?.commenterId))} */}
                { (userData?._id === item?.commenterId) || (localUser?._id === item?.commenterId) && 
                <button onClick={handleDeleteComment}>
                    <RiDeleteBin6Fill />
                </button> }
            </div>
        </section> 
    )
}

export default IndvComment