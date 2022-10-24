// // import { Form, Layout, Button, Input, Divider } from 'antd';
// // // import logo from '../../assets/logo-1.svg';
// import { FC, useEffect, useState } from 'react';
// import { EyeInvisibleOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import '../assets/css/Login.css';
// import LoginImage from '../assets/images/login.png';
// import LoginLogo from '../assets/images/logo.png';
// import CSS from 'csstype';

// const Login = () => {
//     const [passwordShown, setPasswordShown] = useState(false);
//     const togglePassword = () => {
//         setPasswordShown(!passwordShown);
//     };
//     const navigate = useNavigate();

//     const handleClick = () => {
//         navigate(`/`);
//     };
//     const test: CSS.Properties = {
//         position: 'relative',
//         fontWeight: 400,
//         fontSize: '12px',
//         lineHeight: '15px',
//         color: '#8C98A9',
//         left: '550px',
//         top: '130px'
//     }
//     const Sign: CSS.Properties = {
//         position: 'relative',
//         fontWeight: '900',
//         fontSize: '28px',
//         lineHeight: '34px',
//         color: '#3A001E',
//         top: '115px',
//         left: '550px',
//     }
//     const InputUser: CSS.Properties = {
//         fontWeight: 400,
//         height: '40px',
//         width: '272px',
//         position: 'relative',
//         borderColor: '#FFE7D4',
//         color: '#3A001E',
//         borderWidth: '2px',
//         borderRadius: '5px',
//         left: '550px',
//         top: '135px',
//         paddingLeft: '10px',
//     }
//     const Pass: CSS.Properties = {
//         position: 'relative',
//         fontWeight: 400,
//         fontSize: '12px',
//         lineHeight: '15px',
//         color: '#8C98A9',
//         left: '550px',
//         top: '150px',
//     }
//     const InputPass: CSS.Properties = {
//         fontWeight: 400,
//         height: '40px',
//         width: '272px',
//         position: 'relative',
//         borderColor: '#FFE7D4',
//         color: '#3A001E',
//         borderWidth: '2px',
//         borderRadius: '5px',
//         left: '550px',
//         top: '160px',
//         paddingLeft: '10px',
//     }
//     return (
//         <>
//             <div className='box-1' style={{ position: 'absolute', backgroundColor: '#FFF7F1', height: 490, width: 479, top: 100, left: 309, borderRadius: '15px 0px 0px 15px' }}>
//                 <img src={LoginLogo} alt="Image" className='login_logo' style={{ width: 75, position: 'relative', top: 40, left: 50 }} />
//                 <img src={LoginImage} alt="Image" className='login_image' style={{ position: 'relative', top: 100, left: -5 }} />
//             </div>
//             <div className='box-2' style={{ position: 'absolute', borderColor: '#FFE7D4', borderWidth: 1, height: 490, width: 920, top: 100, right: 309, borderRadius: 15, boxShadow: '2px 3px #dadada' }}>
//                 <button className='esc' style={{ background: '#DCE1EE', color: '#2E384D', fontWeight: 400, fontSize: '12px', height: '20px', width: '20px', borderRadius: '50%', position: 'absolute', top: '15px', left: '880px' }} onClick={()=>handleClick()}>X</button>
//                 <div className='signin-container' style={{position: 'fixed', width: '310px', height: "310px", top: '80px', left:'330px'}}>
//                 <div className='SignIn' style={Sign}>Sign In</div>
//                 <div className='username' style={test}>Username/Email</div>
//                 <div className='input_username'>
//                     <input style={InputUser}></input>
//                 </div>
//                 <div className='password' style={Pass}>Password</div>
//                 <div className='input_password'>
//                     <input type={passwordShown ? "text" : "password"} style={InputPass} ></input>
//                     <EyeInvisibleOutlined className={passwordShown ? "shown" : "not"} onClick={togglePassword} />
//                 </div>
//                 <div className='forgot_password'>Forgot password?</div>
//                 <button className='signin_button' style={{ background: '#FB7F4B', color: '#FFFFFF', fontWeight: 400, fontSize: '12px', lineHeight: '15px', height: '40px', width: '272px', borderRadius: '5px', position: 'relative', top: '185px', left: '550px' }}>SIGN IN</button>
//                 <div className='dhaa'>Don't Have An Account?</div>
//                 <div className='ca'>Create Account</div>
//                 </div>

//             </div>
//         </>
//     );
// };
// export default Login;


// import { Form, Layout, Button, Input, Divider } from 'antd';
// // import logo from '../../assets/logo-1.svg';
import { FC, useEffect, useState } from 'react';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LoginLogo from '../assets/images/logo.png';
import LoginImage from '../assets/images/login.png';
import CSS from 'csstype';
import '../assets/css/Login.css';

const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/`);
    };
    const Sign: CSS.Properties = {
        position: 'relative',
        fontWeight: '700',
        fontSize: '24px',
        lineHeight: '34px',
        color: '#3A001E',
    }
    const InputPass: CSS.Properties = {
        fontWeight: 400,
        height: '8%',
        width: '100%',
        position: 'relative',
        borderColor: '#FFE7D4',
        backgroundColor: '#FFFFFF',
        color: '#3A001E',
        borderWidth: '2px',
        borderRadius: '5px',
    }
    return (
        <>
            <div className='sign-up-background'
                style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: '#FFFFFF',
                }}>
                <div className='sign-up-container'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '0 auto',
                        backgroundColor: '#FFF7F1',
                        width: '56vw',
                        height: '60vh',
                        position: 'relative',
                        top: '20vh',
                        borderRadius: '10px',
                        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
                    }}>
                    <div className='container-1'
                        style={{
                            width: '50%',
                            height: '100%',
                            display: 'block',
                            position: 'relative',
                            top: '0',
                            left: '0',
                        }}>
                        <img src={LoginLogo} alt='logo'
                            style={{
                                width: '18%',
                                height: '7%',
                                display: 'block',
                                position: 'relative',
                                top: '5%',
                                left: '8%',
                            }} />
                        <img src={LoginImage} alt='LoginImage'
                            style={{
                                width: '80%',
                                height: '50%',
                                display: 'block',
                                margin: '5rem auto',
                            }} />
                    </div>

                    <div className='container-2'
                        style={{
                            width: '50%',
                            height: '100%',
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '10px',
                            position: 'relative',
                            backgroundColor: 'white',
                            top: '0',
                            right: '0',
                        }}>
                        <button className='esc'
                            style={{
                                background: '#DCE1EE',
                                color: '#2E384D',
                                fontWeight: 400,
                                fontSize: '12px',
                                height: '20px',
                                width: '20px',
                                borderRadius: '50%',
                                position: 'relative',
                                float: 'right',
                                top: '5%',
                                right: '5%',
                            }} onClick={() => handleClick()}>X</button>
                        <div className='Sign-up-info'
                            style={{
                                position: 'relative',
                                display: 'block',
                                width: '60%',
                                height: '90%',
                                backgroundColor: 'transparent',
                                margin: '0 auto',
                                top: '5rem',
                            }}>
                            <div className='Sign-in-title' style={Sign}>Sign In</div>
                            <div className='username-email'
                                style={{
                                    position: 'relative',
                                    fontWeight: '400',
                                    fontSize: '13px',
                                    lineHeight: '34px',
                                    color: '#8C98A9',
                                    marginTop: '2%',
                                }}>Username/Email</div>
                            <input
                                style={{
                                    fontWeight: 400,
                                    height: '8%',
                                    width: '100%',
                                    position: 'relative',
                                    borderColor: '#FFE7D4',
                                    backgroundColor: '#FFFFFF',
                                    color: '#3A001E',
                                    borderWidth: '2px',
                                    borderRadius: '5px',
                                }}></input>
                            <div className='password'
                                style={{
                                    position: 'relative',
                                    fontWeight: '400',
                                    fontSize: '13px',
                                    lineHeight: '34px',
                                    color: '#8C98A9',
                                    marginTop: '2%',
                                }}>Password</div>
                            <div className='input_password' 
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    height: '8%',
                                    position:'relative',
                                    backgroundColor: 'transparent',
                                }}>
                                <input type={passwordShown ? "text" : "password"} 
                                style={{
                                    fontWeight: 400,
                                    height: '100%',
                                    width: '100%',
                                    position: 'relative',
                                    borderColor: '#FFE7D4',
                                    backgroundColor: '#FFFFFF',
                                    color: '#3A001E',
                                    borderWidth: '2px',
                                    borderRadius: '5px',
                                }} ></input>
                                <EyeInvisibleOutlined className={passwordShown ? "shown" : "not"} onClick={togglePassword} />
                            </div>
                            <button className='signin_button'
                                style={{
                                    background: '#FB7F4B',
                                    color: '#FFFFFF',
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    lineHeight: '15px',
                                    height: '40px',
                                    width: '100%',
                                    borderRadius: '5px',
                                    position: 'relative',
                                    marginTop: '1.2rem',
                                }}>SIGN IN</button>
                            <div className='return-signup'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '0.5rem',
                                }}>
                                <div className='ahaa'
                                    style={{
                                        fontSize: '12px',
                                        color: '#8C98A9',
                                    }}>Don't Have An Account?</div>
                                <button className='signup_button'
                                    style={{
                                        background: 'transparent',
                                        fontWeight: 400,
                                        fontSize: '12px',
                                        border: 'none',
                                        position: 'relative',
                                        color: '#FB7F4B',
                                        marginLeft: '0.2rem',
                                    }}>Create Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;