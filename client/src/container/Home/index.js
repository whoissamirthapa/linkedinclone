import React from 'react'

import classes from './home.module.css';
import ExploreInterested from '../../component/Home/interestedExpl'
import NavHome from '../../component/Home/nav'
import HomeWelcome from '../../component/Home/welcome'
import Carousel from '../../component/nextCorousel';
import ConnectSkill from '../../component/Home/connectNDskill';
import JoinAll from '../../component/Home/joinAll';
import HomeFooter from '../../component/Home/footer';

const HomePage = () => {
    return (
        <>
            <NavHome />
            <HomeWelcome />
            <ExploreInterested />
            <section className={classes.home_post_job}>
                <section className={classes.home_post_job_child}>
                    <div className={classes.desc_home_post_job}>
                    Post your job for millions of people to see
                    </div>
                    <div className={classes.btn_post_job}>
                        <button>Post a job</button>
                    </div>
                </section>
            </section>
            <Carousel />
            <ConnectSkill />
            <JoinAll />
            <HomeFooter />
        </>
    )
}

export default HomePage