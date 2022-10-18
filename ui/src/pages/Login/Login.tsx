// import { Form, Layout, Button, Input, Divider } from 'antd';
// // import logo from '../../assets/logo-1.svg';
import { FC, useEffect, useState } from 'react';
import {EyeInvisibleOutlined} from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
import './Login.css';
import LoginImage from '../../assets/images/login.png';
import LoginLogo from '../../assets/images/logo.png';

const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    return (
        <>
            <div className='box-1'>
                <img src={LoginLogo} alt="Image" className='login_logo' style={{ width: 75 }} />
                <img src={LoginImage} alt="Image" className='login_image' />
            </div>
            <div className='box-2'>
                <div className='SignIn'>Sign In</div>
                <div className='username'>Username/Email</div>
                <div className='input_username'>
                    <input></input>
                </div>
                <div className='password'>Password</div>
                <div className='input_password'>
                    <input type={passwordShown ? "text" : "password"} ></input>
                    <EyeInvisibleOutlined className={passwordShown ? "shown" : "not"} onClick={togglePassword}/>
                </div>
                <div className='forgot_password'>Forgot password?</div>
                <button className='signin_button'>SIGN IN</button>
                <div className='dhaa'>Don't Have An Account?</div>
                <div className='ca'>Create Account</div>
            </div>
        </>
    );
};
export default Login;
