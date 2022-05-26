import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Logo from '../../../assets/LI-Logo.png';
import GoogleLogo from '../../../assets/googleIcon.png';
import AppleLogo from '../../../assets/appleIcon.png';
import classes from "./login.module.css";
import { loginAction } from '../../../action/auth.action';
import { authActions } from '../../../reducer/auth.reducer';

const Login = () => {

    const dispatch = useDispatch();
    const message = useSelector(state=>state.auth.message);
    const navigate = useNavigate();

    const [pwToggleInfo, setPwToggleInfo] = useState(false);
    const [ emailphone, setEmailphone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(!emailphone || !password){
            return alert("Invalid Credential!");
        }
        dispatch(loginAction({ email: emailphone, password}));
        
    }

    useEffect(()=>{
        if(message){
            alert(message);
            dispatch(authActions.removeMessage());
            navigate("/feed/");
        }
    },[message, dispatch, navigate]);
    
    return (
        <>
            <section className={classes.form_container}>
                <nav className={classes.logo_nav}>
                    <img src={Logo} alt="" />
                </nav>
                <section className={classes.form_main_container}>
                    <header>
                        <h1>Sign in</h1>
                        <p>Stay updated on your professional world</p>
                    </header>
                    <section className={classes.form_here}>
                        <form onSubmit={handleSubmit}>
                            <div className={classes.indv_input}>
                                <input 
                                    type={"text"} 
                                    name="emailphone" 
                                    id='emailphone' 
                                    placeholder='Email or Phone' 
                                    value={emailphone}
                                    onChange={(e)=>setEmailphone(e.target.value)}
                                />
                            </div>
                            <div className={classes.indv_input}>
                                <input 
                                    type={pwToggleInfo?"text":"password"} 
                                    name="password" 
                                    id='password' 
                                    placeholder='Password' 
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                                <span className={classes.show_pw} onClick={()=>setPwToggleInfo(!pwToggleInfo)}>{ pwToggleInfo?"hide":"show"}</span>
                            </div>
                            <p className={classes.forgot_here}>
                                <Link to={'/fasdkffasdf'}>Forgot password?</Link>
                            </p>
                            <div className={classes.indv_form_btn}>
                                <button>Sign in</button>
                            </div>
                        </form>
                    </section>

                    <div className={classes.middle_liner}>Or</div>
                    <section className={classes.sing_with_}>
                        <Link to={"/google"}>
                            <img src={GoogleLogo} alt="" /> &nbsp; Sign in with Google 
                        </Link>
                        <Link to={"/google"}>
                            <img src={AppleLogo} alt="" /> &nbsp; Sign in with Apple 
                        </Link>
                    </section>
                </section>

                <section className={classes.new_to__}>
                    <p>
                        New to Linkedin? <Link to={'/register'}>Join Now</Link>
                    </p>
                </section>
            </section>
        </>
    )
}

export default Login