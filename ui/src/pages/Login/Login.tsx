// import { Form, Layout, Button, Input, Divider } from 'antd';
// // import logo from '../../assets/logo-1.svg';
// import { FC, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './Login.css';
import LoginImage from '../../assets/images/login.png';
import LoginLogo from '../../assets/images/logo.png';

const Login = () => {
    return (
        <>
            <div className='box-1'>
                <img src={LoginLogo} alt="Image" className='login_logo' style={{ width: 75 }} />
                <img src={LoginImage} alt="Image" className='login_image' />
            </div>
            <div className='box-2'>
                <div className='SignIn'>Sign In</div>
            </div>
        </>
    );
};
export default Login;
