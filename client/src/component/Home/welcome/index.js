import React from 'react';
import { Link } from 'react-router-dom';
import classes from './welcome.module.css';
import { BsChevronRight } from 'react-icons/bs';
import welcomeImg from '../../../assets/welcome.svg';

const HomeWelcome = () => {
    return (
        <>
            <section className={classes.welcome_container}>
                <div className={classes.welcome_container_desc}>
                    <div className={classes.welcome_container_header}>
                        Welcome to your professional community
                    </div>
                    <div>
                        <Link to="/vasdf">
                            <div className={classes.welcome_tab}>
                                <p>
                                    Search for a job
                                </p>
                                <BsChevronRight />
                            </div>
                        </Link>
                        <Link to="/fgsfag">
                            <div className={classes.welcome_tab}>
                                <p>
                                    Find a person you know
                                </p>
                                <BsChevronRight />
                            </div>
                        </Link>
                        <Link to="/gasdfas">
                            <div className={classes.welcome_tab}>
                                <p>
                                    Learn a new skill
                                </p>
                                <BsChevronRight />
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={classes.welcome_img_container}>
                    <img src={welcomeImg} alt='' />
                </div>
            </section>
        </>
    )
}

export default HomeWelcome