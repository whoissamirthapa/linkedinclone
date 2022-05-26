import React, { useEffect, useState } from 'react';
import classes from './layout.module.css';
import Navbar from '../../component/feed/nav';
import SidePro from '../../assets/sideProfileImage.jpg';
import KhaltiImage from '../../assets/khaltiRightSide.jpg';
import FresherImage from '../../assets/fresherRightSide.jpg';
import Logo from '../../assets/LI-Logo.png';
import {FaBookmark} from 'react-icons/fa';
import { BsInfoSquareFill } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { useSelector } from 'react-redux';

const LayoutFeed = (props) => {
    
    const userData = useSelector(state=>state.auth.data[0]);

    const [firstname, setFirstname] = useState("test");
    const [lastname, setLastname] = useState("test");
 
    
    useEffect(()=>{
        const localUserData = JSON.parse(localStorage.getItem("linkedinUserData"));
        if(localUserData){
            setFirstname(localUserData.firstname);
            setLastname(localUserData.lastname);
        }
    },[])

    return (
        <section className={classes.main_container}>
        <Navbar />
        <section className={classes.layout_container}>
            <section className={classes.leftSide}>
                <div className={classes.left_top}></div>
                <div className={classes.left_desc}>
                    <div className={classes.left_img}>
                        <img src={SidePro} alt="" />
                    </div>
                    <div className={classes.left_desc_child}>
                        <header>{userData?.firstname?userData.firstname:firstname} {userData?.lastname?userData.lastname:lastname}</header>
                        <p>👨‍💼Here is some description about your education, skill, work and experience </p>
                    </div>
                </div>
                <div className={classes.impression_profile}>
                    <div>
                        <p>Who viewed your profile</p><span>12</span>
                    </div>
                    <div>
                        <p>Impressions of your post</p><span>31</span>
                    </div>
                </div>
                <div className={classes.left_premium}>
                    <p>Access exclusive tools &amp; insights</p>
                    <p>Try Premium for free</p>
                </div>
                <div className={classes.left_my_items}>
                    <FaBookmark /> My Items
                </div>
            </section>
            <section className={classes.main_side}>
                {props.children}
            </section>
            <section className={classes.rightSide}>
                <section className={classes.rightSide_child}>
                    <header>
                        <p>
                        Add to your feed   
                        </p>
                        <BsInfoSquareFill className={classes.rightSide_iicon} />
                    </header>
                    <section>
                        <section className={classes.indv_follow_}>
                            <div className={classes.img_indv_}>
                                <img src={SidePro} alt="" />
                            </div>
                            <div className={classes.indv_desc_}>
                                <div>John Doe</div>
                                <p>MBA | HR Personnel | Daraz (Alibaba Group)</p>
                                <div>
                                    <button>+Follow</button>
                                </div>
                            </div>
                        </section>
                        <section className={classes.indv_follow_}>
                            <div className={classes.img_indv_}>
                                <img src={FresherImage} alt="" />
                            </div>
                            <div className={classes.indv_desc_}>
                                <div>Fresher Jobs</div>
                                <p>Company | Information Technology and Services</p>
                                <div>
                                    <button>+Follow</button>
                                </div>
                            </div>
                        </section>
                        <section className={classes.indv_follow_}>
                            <div className={classes.img_indv_}>
                                <img src={KhaltiImage} alt="" />
                            </div>
                            <div className={classes.indv_desc_}>
                                <div>Khalti</div>
                                <p>Company | Financial Services</p>
                                <div>
                                    <button>+Follow</button>
                                </div>
                            </div>
                        </section>
                    </section>
                    <section className={classes.rightSide_all_recomm}>
                        <span>View All Recommedations &#10132;</span>
                    </section>
                </section>
                <section className={classes.rightSide_footer}>
                    <section> 
                    <span>About</span>
                    <span>Accessibility</span>
                    <span>Help Center</span> <br />
                    <span>Privacy &amp; Terms <IoIosArrowDown /></span>
                    <span>Ad Choices</span> <br />
                    <span>Advertising</span>
                    <span>Business Services <IoIosArrowDown /></span> <br />
                    <span>Get the LinkedIn app</span>
                    <span>More</span>
                    </section>
                    <section>
                        <img src={Logo} alt="" /> LinkedIn Corporation &copy; { new Date().getFullYear()}
                    </section>
                </section>
            </section>
        </section>
        
        </section>
    )
}

export default LayoutFeed