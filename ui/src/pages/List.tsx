// import { Form, Layout, Button, Input, Divider } from 'antd';
// // import logo from '../../assets/logo-1.svg';
import { FC, useEffect, useState } from 'react';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Login.css';
import LoginImage from '../assets/images/login.png';
import LoginLogo from '../assets/images/logo.png';
import CSS from 'csstype';

const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/`);
    };
    const test: CSS.Properties = {
        position: 'relative',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '15px',
        color: '#8C98A9',
        left: '550px',
        top: '130px'
    }
    const Sign: CSS.Properties = {
        position: 'relative',
        fontWeight: '900px',
        fontSize: '28px',
        lineHeight: '34px',
        color: '#3A001E',
        top: '120px',
        left: '550px',
    }
    const InputUser: CSS.Properties = {
        fontWeight: 400,
        height: '40px',
        width: '272px',
        position: 'relative',
        borderColor: '#FFE7D4',
        color: '#3A001E',
        borderWidth: '2px',
        borderRadius: '5px',
        left: '550px',
        top: '135px',
        paddingLeft: '10px',
    }
    const Pass: CSS.Properties = {
        position: 'relative',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '15px',
        color: '#8C98A9',
        left: '550px',
        top: '150px',
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
            <div className='box-1' style={{ position: 'fixed', backgroundColor: '#FFF7F1', height: 490, width: 479, top: 100, left: 309, borderRadius: '15px 0px 0px 15px' }}>
                <img src={LoginLogo} alt="Image" className='login_logo' style={{ width: 75, position: 'relative', top: 40, left: 50 }} />
                <img src={LoginImage} alt="Image" className='login_image' style={{ position: 'relative', top: 100, left: -5 }} />
            </div>

            <div className='box-2' style={{ position: 'fixed', borderColor: '#FFE7D4', borderWidth: 1, height: 490, width: 920, top: 100, right: 309, borderRadius: 15, boxShadow: '2px 3px #dadada' }}>
                <button className='esc' style={{ background: '#DCE1EE', color: '#2E384D', fontWeight: 400, fontSize: '12px', height: '20px', width: '20px', borderRadius: '50%', position: 'relative', top: '15px', left: '880px' }} onClick={() => handleClick()}>X</button>
                <div className='SignIn' style={Sign}>Sign In</div>
                <div className='username' style={test}>Username/Email</div>
                <div className='input_username'>
                    <input style={InputUser}></input>
                </div>
                <div className='password' style={Pass}>Password</div>
                <div className='input_password'>
                    <input type={passwordShown ? "text" : "password"} style={InputPass} ></input>
                    <EyeInvisibleOutlined className={passwordShown ? "shown" : "not"} onClick={togglePassword} />
                </div>
                <div className='forgot_password'>Forgot password?</div>
                <button className='signin_button' style={{ background: '#FB7F4B', color: '#FFFFFF', fontWeight: 400, fontSize: '12px', lineHeight: '15px', height: '40px', width: '272px', borderRadius: '5px', position: 'relative', top: '185px', left: '550px' }}>SIGN IN</button>
                <div className='dhaa'>Don't Have An Account?</div>
                <div className='ca'>Create Account</div>
            </div>
        </>
    );
};
export default Login;