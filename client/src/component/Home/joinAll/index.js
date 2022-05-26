import React from 'react'
import { Link } from 'react-router-dom';
import classes from './join.module.css';

const JoinAll = () => {
    return (
        <>
            <section className={classes.joinall_container}>
                <div>
                    <p>
                        Join your colleagues, classmates, and friends on LinkedIn.
                    </p> 
                    <Link to={'/fahslkdfahsdfahlsd'}>
                        Get Started
                    </Link>
                </div>
            </section>
        
        </>
    )
}

export default JoinAll