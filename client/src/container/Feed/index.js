import React, { useEffect, useState, Suspense } from 'react'
import LayoutFeed from '../../component/layout'
import classes from './feed.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addPostAction, getPostAction } from '../../action/post.action';
import { postActions } from '../../reducer/post.reducer';

import Img from '../../assets/sideProfileImage.jpg';
import './feedStyle.css';
import { 
    FaUserFriends, 
    FaEllipsisH, 
    FaRegCommentDots, 
    FaUserCircle 
} from 'react-icons/fa';
import { 
    RiShareForwardLine, 
    RiSendPlaneFill, 
    RiDeleteBin6Fill 
} from 'react-icons/ri';
import { BiLike } from 'react-icons/bi';
import Modal from 'react-modal';
import Loading from '../../component/loading';

const IndvPost = React.lazy(() => import('./indvPost'));

const Feed = () => {


    const dispatch  = useDispatch();
    const message = useSelector(state=>state.post.message);
    const postData = useSelector(state=>state.post.data);
    const userData = useSelector(state=>state.auth.data);

    const [content, setContent] = useState("");
    const [image, setImage] = useState();

    //Modal form
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!content){
            return alert("Please write some post");
        }
        dispatch(addPostAction({ content, image}));

    }

    useEffect(()=>{
        if(message){
            // alert(message);
            dispatch(postActions.removeMessage());
            setIsOpen(false);
            setContent("");
            setImage();
        }
    },[message, dispatch])
  


    // get all posts
    useEffect(()=>{
        dispatch(getPostAction());

    },[dispatch])

    //console.log(postData);
    const localUserData = JSON.parse(localStorage.getItem("linkedinUserData"));


    return (
        <>
            <LayoutFeed>
                <section className={classes.main_section_here}>
                    <section className={classes.child}>
                        <section className={classes.submit_post_here_info}>
                             <div className={classes.img_submit_post}>
                                  <img src={Img} alt="" />
                             </div>
                             <div className={classes.active_submit_post_form}>
                                <button onClick={()=>setIsOpen(true)}>
                                    Start a post
                                </button>
                                <div>
                                    <Modal
                                       isOpen={modalIsOpen}
                                       onRequestClose={()=>setIsOpen(false)}
                                       contentLabel="Submit Post Modal"
                                       ariaHideApp={false}
                                    >
                                        <header className={classes.modal_header}>
                                           <p>Create a post</p>
                                           <button onClick={()=>setIsOpen(false)}>&#10006;</button>
                                        </header>
                                        <section className={classes.indv_post_name}>
                                            <div>
                                                <img src={Img} alt="" />
                                            </div>
                                            <div>
                                                <p>{userData[0]?userData[0]?.firstname:localUserData.firstname} {userData[0]?userData[0]?.lastname:localUserData.lastname}</p>
                                                <span><FaUserFriends /> Share with friends</span>
                                            </div>
                                        </section>
                                        <form onSubmit={handleSubmit}>
                                            <div className={classes.indv_input}>

                                            <textarea autoFocus={true} value={content} onChange={(e)=>setContent(e.target.value)} placeholder="What do you want to talk about?">

                                            </textarea>
                                            </div>
                                            <div className={classes.indv_input}>
                                                <div className={classes.image_label}>
                                                    <label htmlFor='image'>Select your image <span>(Maxsize 2MB*)</span></label><br />
                                                    <input type={"file"} onChange={(e)=>setImage(e.target.files[0])} id="image" name='image' />
                                                </div>
                                                <button>Post</button>
                                            </div>
                                            
                                        </form>
                                    </Modal>
                                </div>
                             </div>
                        </section>

                        <div className={classes.liner}></div>

                        <section className={classes.post_container}>
                            <Suspense fallback={<Loading />}>
                            { postData && 
                            postData.map( (data, key)=> { return(
                                <IndvPost data={data} key={key} Img={Img}  />
                            )})}
                            </Suspense>

                            { /*
                             <section className={classes.indv_post}>
                                <header className={classes.indv_post_header}>
                                    <div>
                                        <img src={Img} alt="" />
                                        <div>
                                            <span>Samir Thapa</span>
                                            <p><FaUserFriends /> Shared with friends</p>
                                        </div>
                                    </div>
                                    <div>
                                        <FaEllipsisH className={classes.post_opt_icon} />
                                    </div>
                                </header>

                                <section className={classes.indv_post_body}>
                                    <p className={classes.indv_post_desc}>
                                    Topics and Ideas
                                    Essay topics in English can be difficult to come up with. While writing essays, many college and high school students face writer’s block and have a hard time to think about topics and ideas for an essay. In this article, we will list out many good essay topics from different categories like argumentative essays, essays on technology, environment essays for students from 5th, 6th, 7th, 8th grades. Following list of essay topics are for all 
                                   
                                    </p>
                                    <div className={classes.indv_post_img}>
                                        <img src='https://images.unsplash.com/photo-1648737119359-510d4f551382?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172' alt='' />

                                    </div>
                                    <div className={classes.like_count}><BiLike /> 2 Likes</div>
                                </section>

                                <footer className={classes.indv_post_footer}>
                                    <section>
                                        <button>
                                            <BiLike className={classes.post_footer_icon} /> Like
                                        </button>
                                        <button onClick={()=>setCommentShow(!commentShow)}>
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
                                    <form>
                                        <input type={"text"} name="comment" id='comment' placeholder='Add a comment...' />
                                        <button>Post</button>
                                    </form>
                                    <section className={classes.comments_}>
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
                                        </section>
                                        <section className={classes.indv_comment}>
                                            <section>
                                                <p>
                                                    <FaUserCircle/>
                                                </p>
                                                <div>
                                                    <p>Samir Thapa</p>
                                                    <p>Test comment THis is an test comment we can comment here . and this is test of long comment</p>
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
                                        </section>
                                    </section>
                                </section> }
                            </section>

                            <section className={classes.indv_post}>
                                <header className={classes.indv_post_header}>
                                    <div>
                                        <img src={Img} alt="" />
                                        <div>
                                            <span>Samir Thapa</span>
                                            <p><FaUserFriends /> Shared with friends</p>
                                        </div>
                                    </div>
                                    <div>
                                        <FaEllipsisH className={classes.post_opt_icon} />
                                    </div>
                                </header>

                                <section className={classes.indv_post_body}>
                                    <p className={classes.indv_post_desc}>
                                    Topics and Ideas
                                    Essay topics in English can be difficult to come up with. In this article, we will list out many good essay topics from different categories like argumentative essays, essays on technology, environment essays for students from 5th, 6th, 7th, 8th grades. Following list of essay topics are for all 
                                   
                                    </p>
                                    <div className={classes.indv_post_img}>
                                        <img src='https://images.unsplash.com/photo-1653082674226-1d9046ab68b9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387' alt='' />
                                    </div>
                                    <div className={classes.like_count}><BiLike /> 2 Likes</div>
                                </section>

                                <footer className={classes.indv_post_footer}>
                                    <section>
                                        <button>
                                            <BiLike className={classes.post_footer_icon} /> Like
                                        </button>
                                        <button onClick={()=>setCommentShow(!commentShow)}>
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
                                    <form>
                                        <input type={"text"} name="comment" id='comment' placeholder='Add a comment...' />
                                        <button>Post</button>
                                    </form>
                                    <section className={classes.comments_}>
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
                                        </section>
                                        <section className={classes.indv_comment}>
                                            <section>
                                                <p>
                                                    <FaUserCircle/>
                                                </p>
                                                <div>
                                                    <p>Samir Thapa</p>
                                                    <p>Test comment THis is an test comment we can comment here . and this is test of long comment</p>
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
                                        </section>
                                    </section>
                                </section> }
                                </section> */}
                        </section>
                    </section>
                </section>
            </LayoutFeed>
        </>
    )
}

export default Feed