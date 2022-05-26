import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from '../Login/login.module.css';
import styles from './register.module.css';

import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/LI-Logo.png';
import GoogleLogo from '../../../assets/googleIcon.png';
import { validator } from './validator';
import { registerAction } from '../../../action/auth.action';
import { authActions } from '../../../reducer/auth.reducer';

const Register = () => {

    const dispatch = useDispatch();
    const message = useSelector(state=> state.auth.message);


    const navigate = useNavigate();

    const [pwToggleInfo, setPwToggleInfo] = useState(false);
    const [showNameForm, setShowNameForm] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const [firstnameInfo, setFirstnameInfo] = useState(false);
    const [lastnameInfo, setLastnameInfo] = useState(false);
    const [emailInfo, setEmailInfo] = useState(false);
    const [passwordInfo, setPasswordInfo] = useState(null);
    const [passwordInfoo, setPasswordInfoo] = useState(false);
    
    const onKeyFirstName = (e)=>{
        const novalid = validator(e.target.name, e.target.value);
        if(novalid){
           setFirstnameInfo(true);
           return;
        }
        setFirstnameInfo(false);
    }
    const onKeyLasttName = (e)=>{
        const novalid = validator(e.target.name, e.target.value);
        if(novalid){
           setLastnameInfo(true);
           return;
        }
        setLastnameInfo(false);
    }
    const onKeyEmail = (e)=>{
        const novalid = validator(e.target.name, e.target.value);
        if(novalid){
           setEmailInfo(true);
           return;
        }
        setEmailInfo(false);
    }

    const onKeyPassword = (e)=>{
        const novalid = validator(e.target.name, e.target.value);

        if(novalid){
            setPasswordInfo(novalid);
            setPasswordInfoo(true);
            return;
        }
        setPasswordInfo(null);
        setPasswordInfoo(false);
    
    }


    const handleSubmit = (e)=>{
        e.preventDefault();
        if(firstnameInfo && lastnameInfo && emailInfo && !password){
            alert("Input must be valid")
            return;
        }
        const data = {firstname, lastname, email, password}
        dispatch(registerAction(data));
        //console.log(data);
    };

    useEffect(()=>{
        if(message){
            alert(message);
            dispatch(authActions.removeMessage());
            navigate('/login');
        }
    },[message, dispatch, navigate]);
    return (
        <>
        <section className={styles.register_container}>
                <nav className={classes.logo_nav}>
                    <img src={Logo} alt="" />
                </nav>
                <header>
                    <h1>
                    Make the most of your professional life
                    </h1>
                </header>
                <section className={styles.register_main_container}>
                    <section className={styles.form_here}>
                    { !showNameForm && 
                        <div>
                            
                            <div className={styles.indv_label}>
                                <label htmlFor='emailphone'>Email</label>
                            </div>
                            <div className={styles.register_indv_input}>
                                <input 
                                    type={"text"} 
                                    name="emailphone" 
                                    id='emailphone' 
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    onKeyUp={onKeyEmail}
                                    style={emailInfo?{border:"2px solid red"}:{}}
                                />
                                { emailInfo && <p className={styles.valid_input}>Please enter valid email address</p>}
                            </div>
                            <div className={styles.indv_label}>
                                <label htmlFor='password'>Password(6 or more characters)</label>
                            </div>
                            <div className={`${styles.register_indv_input} ${styles.relMeInput}`}>
                                <input 
                                    type={pwToggleInfo?"text":"password"} 
                                    name="password" 
                                    id='password'
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    onKeyUp={onKeyPassword}
                                    style={passwordInfo?{border:"2px solid red"}:{}}
                                />
                                <span className={styles.show_pw} onClick={()=>setPwToggleInfo(!pwToggleInfo)}>{ pwToggleInfo?"hide":"show"}</span>
                                { passwordInfo && <p className={styles.valid_input}>{passwordInfo}</p>}
                            </div>
                            <p className={styles.policy_here}>
                                By clicking Agree &amp; Join, you agree to the LinkedIn <span>User Agreement</span>, 
                                <span>Privacy Policy</span>, and <span>Cookie Policy.</span>
                            </p>
                            <div className={classes.indv_form_btn}>
                                <button 
                                    onClick={
                                        ()=>setShowNameForm(true)
                                    } 
                                    disabled={emailInfo || passwordInfoo}
                                >Agree and Join</button>
                            </div> 
                        </div> }

                        { showNameForm && 
                        <form onSubmit={handleSubmit}>
                            
                            <div className={styles.indv_label}>
                                <label htmlFor='firstname'>First Name</label>
                            </div>
                            <div className={styles.register_indv_input}>
                                <input 
                                    type={"text"} 
                                    name="firstname" 
                                    id='firstname' 
                                    value={firstname}
                                    onChange={(e)=>setFirstname(e.target.value)}
                                    onKeyUp={onKeyFirstName}
                                    style={firstnameInfo?{border:"2px solid red"}:{}}
                                />
                                { firstnameInfo && <p className={styles.valid_input}>Please enter valid name</p>}
                            </div>
                            <div className={styles.indv_label}>
                                <label htmlFor='lastname'>Last Name</label>
                            </div>
                            <div className={`${styles.register_indv_input} ${styles.relMeInput}`}>
                                <input 
                                    type={"text"} 
                                    name="lastname" 
                                    value={lastname} 
                                    onChange={(e)=>setLastname(e.target.value)} 
                                    onKeyUp={onKeyLasttName}
                                    id='lastname'
                                    style={lastnameInfo?{border:"2px solid red"}:{}}
                                />
                                { lastnameInfo && <p className={styles.valid_input}>Please enter valid name</p>}
                            </div>
                            <div className={classes.indv_form_btn}>
                                <button>Continue</button>
                            </div> 
                        </form> }
                    </section>

                    { !showNameForm && <div className={classes.middle_liner}>Or</div> }
                    { !showNameForm && <section className={styles.register_with_}>
                        <Link to={"/google"}>
                            <img src={GoogleLogo} alt="" /> &nbsp; Sign in with Google 
                        </Link>
                    </section> }
                    { !showNameForm && 
                    <section className={styles.already_has}>
                        Already to LinkedIn? <Link to={'/login'}>Sign in</Link>
                    </section> }
                </section>

                { !showNameForm  &&
                <section className={styles.new_to___}>
                    <p>
                    Looking to create a page for a business? <Link to={'/###'}> Get help</Link>
                    </p>
                </section> }
            </section>
        </>
    )
}

export default Register