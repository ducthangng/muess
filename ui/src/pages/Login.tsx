// import { Form, Layout, Button, Input, Divider } from 'antd';
// // import logo from '../../assets/logo-1.svg';
import { FC, useEffect, useState } from 'react';
import { authApi } from '../api/authApi';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LoginLogo from '../assets/images/logo.svg';
import LoginImage from '../assets/images/login.svg';
import CSS from 'csstype';
import '../assets/css/Login.css';

const Sign: CSS.Properties = {
  position: 'relative',
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '34px',
  color: '#3A001E'
};
const InputPass: CSS.Properties = {
  fontWeight: 400,
  fontSize: '12px',
  width: '100%',
  position: 'relative',
  borderColor: '#FFE7D4',
  backgroundColor: '#FFFFFF',
  color: '#3A001E',
  borderWidth: '2px',
  borderRadius: '5px'
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  });

  const routeChange = async (path: string) => {
    navigate(`${path}`);
  };

  const checkLogin = async () => {
    let data = await authApi.getId();
    if (data !== null && data._id.length !== 0) {
      console.log('changing.... [cookie]');
      routeChange('/release');
    }
  };

  const handleLogin = async () => {
    let data = await authApi.login({ email, password }).then((res) => {
      console.log('res: ', res);
      if (res._id.length !== 0) {
        console.log('changing.... [login]');
        routeChange('/release');
      } else {
        alert('Invalid username or password');
      }
      return res;
    });
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <>
      <div
        className="sign-up-background"
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div
          className="sign-in-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto',
            backgroundColor: '#FFF7F1',
            width: '60vw',
            height: '72vh',
            position: 'relative',
            top: '14vh',
            borderRadius: '10px',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
          }}
        >
          <div
            className="container-1"
            style={{
              width: '50%',
              height: '100%',
              display: 'block',
              position: 'absolute',
              top: '0',
              left: '0'
            }}
          >
            <img
              src={LoginLogo}
              alt="logo"
              style={{
                width: '18%',
                height: '7%',
                display: 'block',
                position: 'absolute',
                top: '5%',
                left: '8%'
              }}
            />
            <img
              src={LoginImage}
              alt="LoginImage"
              style={{
                width: '80%',
                height: '60%',
                display: 'block',
                margin: '20% auto'
              }}
            />
          </div>

          <div
            className="container-2"
            style={{
              width: '50%',
              height: '100%',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
              position: 'absolute',
              backgroundColor: 'white',
              top: '0',
              right: '0'
            }}
          >
            <button
              className="esc"
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
                right: '5%'
              }}
              onClick={() => handleClick()}
            >
              X
            </button>
            <div
              className="Sign-up-info"
              style={{
                position: 'relative',
                display: 'block',
                width: '60%',
                height: '90%',
                backgroundColor: 'transparent',
                margin: '0 auto',
                top: '5rem'
              }}
            >
              <div className="Sign-in-title" style={Sign}>
                Sign In
              </div>
              <div
                className="username-email"
                style={{
                  position: 'relative',
                  fontWeight: '400',
                  fontSize: '12px',
                  lineHeight: '28px',
                  color: '#8C98A9',
                  marginTop: '2%'
                }}
              >
                Email
              </div>
              <input
                style={{
                  fontWeight: 400,
                  width: '100%',
                  position: 'relative',
                  borderColor: '#FFE7D4',
                  backgroundColor: '#FFFFFF',
                  color: '#3A001E',
                  borderWidth: '2px',
                  borderRadius: '5px'
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={'email'}
              ></input>
              <div
                className="password"
                style={{
                  position: 'relative',
                  fontWeight: '400',
                  fontSize: '12px',
                  lineHeight: '28px',
                  color: '#8C98A9',
                  marginTop: '2%'
                }}
              >
                Password
              </div>
              <div
                className="input_password"
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '8%',
                  position: 'relative',
                  backgroundColor: 'transparent'
                }}
              >
                <input
                  type={passwordShown ? 'text' : 'password'}
                  style={{
                    fontWeight: 400,
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                    borderColor: '#FFE7D4',
                    backgroundColor: '#FFFFFF',
                    color: '#3A001E',
                    borderWidth: '2px',
                    borderRadius: '5px'
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                ></input>
                <EyeInvisibleOutlined
                  style={{
                    position: 'absolute',
                    right: '0',
                    fontSize: '16px',
                    marginRight: '4px',
                    marginTop: '4px'
                  }}
                  className={passwordShown ? 'shown' : 'not'}
                  onClick={togglePassword}
                />
              </div>
              <button
                className="signin_button"
                style={{
                  background: '#FB7F4B',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '16px',
                  lineHeight: '15px',
                  height: 'fit-content',
                  padding: '4%',
                  width: '100%',
                  borderRadius: '5px',
                  position: 'relative',
                  marginTop: '1rem'
                }}
                onClick={handleLogin}
              >
                Sign in
              </button>
              <div
                className="return-signup"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '0.5rem'
                }}
              >
                <div
                  className="ahaa"
                  style={{
                    fontSize: '12px',
                    color: '#8C98A9'
                  }}
                >
                  Don't Have An Account?
                </div>
                <button
                  className="signup_button"
                  style={{
                    background: 'transparent',
                    fontWeight: 400,
                    fontSize: '12px',
                    border: 'none',
                    position: 'relative',
                    color: '#FB7F4B',
                    marginLeft: '0.2rem'
                  }}
                  onClick={() => navigate('/register')}
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
