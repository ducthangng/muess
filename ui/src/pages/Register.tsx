import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Register.css';
import LoginLogo from '../assets/images/logo.svg';
import RegisterImage from '../assets/images/register.svg';
import CSS from 'csstype';
import styled from 'styled-components';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import '../assets/css/Register.css';
import { authApi } from '../api/authApi';
import { User } from '../models/User';

const Register = () => {
  const [toggleState, setToggleState] = useState(1);
  const togggleTab = (index) => {
    setToggleState(index);
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // const [warningBorder, setWarningBorder] = useState('');

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  const checkOnRepeat = (value: string) => {
    setRepeatPassword(value);

    if (value !== password) {
      // setWarningBorder('red');
    }
  };

  const onRegister = async (e: any) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert('Wrong repeat password! Please retype.');
      return;
    }

    await authApi
      .register({
        fullname: 'default',
        dob: 'default',
        username: 'default',
        password: password,
        email: email
      })
      .then((user) => {
        console.log('user: ', user);
        if (user._id.length !== 0) {
          navigate('/login');
        }
      });
  };

  const Sign: CSS.Properties = {
    position: 'relative',
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '34px',
    color: '#3A001E'
  };
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
    paddingLeft: '10px'
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
          className="sign-up-container"
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
              src={RegisterImage}
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

            <form>
              <div
                className="Sign-up-info"
                style={{
                  position: 'absolute',
                  width: '60%',
                  height: '80%',
                  left: '20%',
                  backgroundColor: 'transparent',
                  margin: '0 auto',
                  top: '10%'
                }}
              >
                <div className="Sign-up-title" style={Sign}>
                  Sign Up
                </div>
                <div className="register-tabs" style={{ display: 'flex' }}>
                  <button
                    className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
                    onClick={() => togggleTab(1)}
                  >
                    Personal Info
                  </button>
                  <button
                    style={{ position: 'absolute', right: '0' }}
                    className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
                    onClick={() => togggleTab(2)}
                  >
                    Account detail
                  </button>
                </div>

                <div className="content-tabs">
                  <div
                    className={
                      toggleState === 1
                        ? 'contents active-contents'
                        : 'contents'
                    }
                  >
                    <div
                      className="line-1"
                      style={{
                        borderTop: '3px solid orange',
                        position: 'absolute',
                        left: '0',
                        width: '40%'
                      }}
                    ></div>
                    <div
                      className="fullname"
                      style={{
                        position: 'relative',
                        fontWeight: '400',
                        fontSize: '12px',
                        lineHeight: '28px',
                        color: '#8C98A9',
                        marginTop: '2%'
                      }}
                    >
                      Full Name
                    </div>
                    <input
                      style={{
                        fontWeight: 400,
                        fontSize: '12px',
                        width: '100%',
                        position: 'relative',
                        borderColor: '#FFE7D4',
                        backgroundColor: '#FFFFFF',
                        color: '#3A001E',
                        borderWidth: '2px',
                        borderRadius: '5px'
                      }}
                      required={true}
                    />
                    <div
                      className="DOB"
                      style={{
                        position: 'relative',
                        fontWeight: '400',
                        fontSize: '12px',
                        lineHeight: '28px',
                        color: '#8C98A9',
                        marginTop: '2%'
                      }}
                    >
                      Date of Birth
                    </div>
                    <input
                      type="date"
                      name="dateofbirth"
                      id="dateofbirth"
                    ></input>
                    <div
                      className="email"
                      style={{
                        position: 'relative',
                        fontWeight: '400',
                        fontSize: '12px',
                        lineHeight: '28px',
                        color: '#8C98A9',
                        marginTop: '2%'
                      }}
                    >
                      Email Address
                    </div>
                    <input
                      style={{
                        fontWeight: 400,
                        fontSize: '12px',
                        width: '100%',
                        position: 'relative',
                        borderColor: '#FFE7D4',
                        backgroundColor: '#FFFFFF',
                        color: '#3A001E',
                        borderWidth: '2px',
                        borderRadius: '5px'
                      }}
                    ></input>
                  </div>

                  <div
                    className={
                      toggleState === 2
                        ? 'contents active-contents'
                        : 'contents'
                    }
                  >
                    <div
                      className="line-2"
                      style={{
                        borderTop: '3px solid orange',
                        position: 'absolute',
                        right: '0',
                        width: '40%'
                      }}
                    ></div>
                    <div
                      className="emailaddress"
                      style={{
                        position: 'relative',
                        fontWeight: '400',
                        fontSize: '12px',
                        lineHeight: '28px',
                        color: '#8C98A9',
                        marginTop: '2%'
                      }}
                    >
                      Email Address
                    </div>
                    <input
                      style={{
                        fontWeight: 400,
                        fontSize: '12px',
                        width: '100%',
                        position: 'relative',
                        borderColor: '#FFE7D4',
                        backgroundColor: '#FFFFFF',
                        color: '#3A001E',
                        borderWidth: '2px',
                        borderRadius: '5px'
                      }}
                      type={'email'}
                      required={true}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                        fontSize: '12px',
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                      <EyeInvisibleOutlined
                        className={passwordShown ? 'shown' : 'not'}
                        onClick={togglePassword}
                      />
                    </div>
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
                      Repeat Password
                    </div>
                    <div
                      className="input_password"
                      style={{
                        display: 'flex',
                        width: '100%',
                        fontSize: '12px',
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
                          // border: warningBorder
                        }}
                        value={repeatPassword}
                        onChange={(e) => checkOnRepeat(e.target.value)}
                      ></input>
                      <EyeInvisibleOutlined
                        className={passwordShown ? 'shown' : 'not'}
                        onClick={togglePassword}
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="continue_button"
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
                  onClick={() => navigate('/register-auth-info')}
                >
                  Register
                </button>
                <div
                  className="return-signin"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '0.5erm'
                  }}
                >
                  <div
                    className="ahaa"
                    style={{
                      fontSize: '12px',
                      color: '#8C98A9'
                    }}
                  >
                    Already Have An Account?
                  </div>
                  <button
                    className="signin_button"
                    style={{
                      background: 'transparent',
                      fontWeight: 400,
                      fontSize: '12px',
                      border: 'none',
                      position: 'relative',
                      color: '#FB7F4B',
                      marginLeft: '0.2rem'
                    }}
                    onClick={() => navigate('/login')}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
