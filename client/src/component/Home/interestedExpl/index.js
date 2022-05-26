import React from 'react';
import classes from './explore.module.css';
import { exploreTopic, findJob } from '../../../dummyData';
import { BsChevronCompactDown } from 'react-icons/bs';

const ExploreInterested = () => {
    return (
        <>
            <section className={classes.explore_container}>
                <section className={classes.explore_container_child}>
                    <div>
                        <p>Explore topics you are interested in</p>
                    </div>
                    <div>
                        <header className={classes.header_expl_side}>CONTENT TOPICS</header>
                        <section>
                            { exploreTopic.map((topic,key)=>{
                                return(
                                    <span key={key} className={classes.expl_topic}>{topic}</span>
                                )
                            })}   
                        </section> 
                        <div>
                            <p className={classes.see_more_expl}>
                                <span>
                                See more <BsChevronCompactDown />   
                                </span> 
                            </p>
                        </div>
                    </div>
                </section>
            </section>

            <section className={classes.findjob_container}>
                <section className={classes.explore_container_child}>
                    <div>
                        <p>Find the right job or internship for you</p>
                    </div>
                    <div>
                        <header className={classes.header_expl_side}>SUGGESTED SEARCHES</header>
                        <section>
                            { findJob.map((topic,key)=>{
                                return(
                                    <span key={key} className={classes.expl_topic}>{topic}</span>
                                )
                            })}   
                        </section> 
                        <div>
                            <p className={classes.see_more_expl}>
                                <span>
                                See more <BsChevronCompactDown />   
                                </span> 
                            </p>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default ExploreInterested