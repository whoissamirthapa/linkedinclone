import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import classes from './nav.module.css';
import { 
    FaLinkedin, 
    FaBell, 
    FaCommentDots,
    FaTh, 
    FaUserFriends, 
    FaUserCircle,
    FaSortDown, 
    FaBriefcase 
} from 'react-icons/fa';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoHome } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../reducer/auth.reducer';

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logInfo, setLogInfo] = useState(false);


    const handleLogOut = ()=>{
        dispatch(authActions.removeToken());
        localStorage.removeItem("linkedinToken");
        localStorage.removeItem("linkedinUserData");
        window.location.reload(false)
        navigate("/");
    }
    return (
        <>
            <nav className={classes.navbar_container}>
                <section className={classes.navbar_container_child}>
                    <section className={classes.logo_search}>
                        <Link to={'/feed/'}>
                            <FaLinkedin className={classes.logo_icon} />
                        </Link>
                        <div className={classes.nav_search_here}>
                            <input type={'search'} id="search" name='search' placeholder="Search" />
                            <span>
                                <BiSearchAlt2 className={classes.search_icon} />
                            </span>
                        </div>
                        <div className={classes.sm_nav_search_here}>
                            <BiSearchAlt2 className={classes.sm_search_icon} />
                            <p>
                                Search
                            </p>
                        </div>
                    </section>
                    <section className={classes.nav_items} id="nav_items">
                        <ul className={classes.nav_items_left}>
                            <li> 
                                <Link to="/feed/">
                            
                                <IoHome className={classes.nav_items_icon} />
                                <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <FaUserFriends className={classes.nav_items_icon} />
                                <span>My Network</span>
                            </li>
                            <li>
                                <FaBriefcase className={classes.nav_items_icon} />
                                <span>Jobs</span>    
                            </li>
                            <li>
                                <FaCommentDots className={classes.nav_items_icon} />
                                <span>Messaging</span>
                            </li>
                            <li>
                                <FaBell className={classes.nav_items_icon} />
                                <span>Notification</span>
                            </li>
                            <li onClick={()=>setLogInfo(!logInfo)} className={classes.log_info_sec}>
                                <button   onClick={()=>setLogInfo(!logInfo)} className={classes.helper_btn_crl}>
                                <FaUserCircle className={classes.nav_items_icon}/>
                                </button>
                                <span>Me <FaSortDown /></span>
                                { logInfo && 
                                <span className={classes.log_here}>
                                    {/* <button>View Profile</button> */}
                                    <button onClick={handleLogOut}>Log out</button>
                                </span> }
                            </li>
                            <li>
                                <FaTh className={classes.nav_items_icon} />
                                <span>Work <FaSortDown/></span>
                            </li>
                            <li>Try Premium for <br />free</li>
                        </ul>
                    </section>
                </section>
            </nav>
        </>
    )
}

export default Navbar