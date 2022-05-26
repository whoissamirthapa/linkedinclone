import React from 'react';
import classes from './connect.module.css';
import ConnectImage from '../../../assets/connectHelp.svg';
import BuildSkill from '../../../assets/buildSkill.svg';
import { Link } from 'react-router-dom';
import { BsCaretDownFill } from 'react-icons/bs';

const ConnectSkill = () => {
    return (
        <>
            <section className={classes.container_connkll}>
                <section className={classes.connect_container}>
                    <section className={classes.img_here_conn}>
                        <img src={ConnectImage} alt="" />
                    </section>
                    <section>
                        <section>
                            Connect with People who can help
                        </section>
                        <section>
                            <Link to="/fhahskdfa">
                                Find People you know
                            </Link>
                        </section>
                    </section>
                </section>

                <section className={classes.skill_container}>
                    <section className={classes.img_here_conn}>
                        <img src={BuildSkill} alt="" />
                    </section>
                    <section>

                    <section>
                        Connect with People who can help
                    </section>
                    <section>
                        <button>
                            <p>
                            Choose a topic to learn about 
                            </p>
                            <BsCaretDownFill />
                        </button>
                    </section>
                    </section>
                </section>
            </section>
        </>
    )
}

export default ConnectSkill