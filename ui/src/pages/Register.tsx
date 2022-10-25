// import { Form, Layout, Button, Input, Divider } from 'antd';
// // import logo from '../../assets/logo-1.svg';
import { FC, useEffect, useState } from 'react';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Register.css';
import LoginLogo from '../assets/images/logo.png';
import RegisterImage from '../assets/images/register.png';
import CSS from 'csstype';

const Register = () => {
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
        height: '40px',
        width: '272px',
        position: 'relative',
        borderColor: '#FFE7D4',
        color: '#3A001E',
        borderWidth: '2px',
        borderRadius: '5px',
        left: '550px',
        top: '160px',
        paddingLeft: '10px',
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
                        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
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
                        <img src={RegisterImage} alt='LoginImage'
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
                                top: '1.5rem',
                            }}>
                            <div className='Sign-up-title' style={Sign}>Sign Up</div>
                            <div className='Personal-info'
                                style={{
                                    position: 'relative',
                                    fontWeight: '400',
                                    fontSize: '16px',
                                    lineHeight: '34px',
                                    color: '#3A001E',
                                    marginTop: '2%',
                                }}>Personal Info</div>
                            <div className='line'
                                style={{
                                    borderTop: '3px solid orange',
                                    width: '46%'
                                }}></div>
                            <div className='fullname'
                                style={{
                                    position: 'relative',
                                    fontWeight: '400',
                                    fontSize: '13px',
                                    lineHeight: '34px',
                                    color: '#8C98A9',
                                    marginTop: '2%',
                                }}>Full Name</div>
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
                            <div className='DOB'
                                style={{
                                    position: 'relative',
                                    fontWeight: '400',
                                    fontSize: '13px',
                                    lineHeight: '34px',
                                    color: '#8C98A9',
                                    marginTop: '2%',
                                }}>Date of Birth</div>
                            <input type="date" name="dateofbirth" id="dateofbirth"></input>
                            <div className='email'
                                style={{
                                    position: 'relative',
                                    fontWeight: '400',
                                    fontSize: '13px',
                                    lineHeight: '34px',
                                    color: '#8C98A9',
                                    marginTop: '2%',
                                }}>Email Address</div>
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
                            <button className='continue_button'
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
                                    marginTop: '1rem',
                                }}>CONTINUE</button>
                            <div className='return-signin'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop:'0.5rem',
                                }}>
                                <div className='ahaa'
                                    style={{
                                        fontSize:'12px',
                                        color: '#8C98A9',
                                    }}>Already Have An Account?</div>
                                <button className='signin_button'
                                style={{
                                    background: 'transparent',
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    border: 'none',
                                    position: 'relative',
                                    color: '#FB7F4B',
                                    marginLeft: '0.2rem',
                                }}>Sign in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Register;