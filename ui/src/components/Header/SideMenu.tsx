import React, { useEffect, useState } from 'react';
import './SideMenu.css';
import Logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import * as BIIcons from 'react-icons/bi';
import { authApi } from '../../api/authApi';
import { userApi } from '../../api/userApi';
const SideMenu = (props) => {
  const [open, setOpen] = useState(false);
  const [fullname, setFullname] = useState('');
  let navigate = useNavigate();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');

  const getUserInfo = async () => {
    let res = await userApi.getCurrentUser();
    if (res.status === 200) {
      setFullname(res.data.fullname);
      setEmail(res.data.email);
    }
  };

  const handleLogout = async () => {
    const res = await authApi.logout();
    console.log(res);
    if (res.status === 200) {
      navigate('/');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="side-menu">
      <div className="logo" onClick={() => navigate('/')}>
        <img src={Logo} alt="logo" />
      </div>
      <div
        className="main-menu"
        style={{
          float: 'none',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <NavLink
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: '#FB7F4B',
                  color: 'white',
                  width: 'fit-content',
                  textAlign: 'center',
                  height: '30px',
                  paddingTop: '10px',
                  // paddingLeft: '7px',
                  paddingRight: '7px'
                }
              : {}
          }
          className="menu-item"
          to="/release"
        >
          Release
        </NavLink>

        <NavLink
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: '#FB7F4B',
                  color: 'white',
                  width: 'fit-content',
                  textAlign: 'center',
                  height: '30px',
                  paddingTop: '10px',
                  // paddingLeft: '7px',
                  paddingRight: '7px'
                }
              : {}
          }
          className="menu-item"
          to="/products"
        >
          Products
        </NavLink>

        <NavLink
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: '#FB7F4B',
                  color: 'white',
                  width: 'fit-content',
                  textAlign: 'center',
                  height: '30px',
                  paddingTop: '10px',
                  // paddingLeft: '7px',
                  paddingRight: '7px'
                }
              : {}
          }
          className="menu-item"
          to="/purchases"
        >
          Purchases
        </NavLink>

        <NavLink
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: '#FB7F4B',
                  color: 'white',
                  width: 'fit-content',
                  textAlign: 'center',
                  height: '30px',
                  paddingTop: '10px',
                  // paddingLeft: '7px',
                  paddingRight: '7px'
                }
              : {}
          }
          className="menu-item"
          to="/sales"
        >
          Sales
        </NavLink>

        <NavLink
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: '#FB7F4B',
                  color: 'white',
                  width: 'fit-content',
                  textAlign: 'center',
                  height: '30px',
                  paddingTop: '10px',
                  // paddingLeft: '7px',
                  paddingRight: '7px'
                }
              : {}
          }
          className="menu-item"
          to="/wallet"
        >
          Your Wallet
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: '#FB7F4B',
                  color: 'white',
                  width: 'fit-content',
                  textAlign: 'center',
                  height: '30px',
                  paddingTop: '10px',
                  // paddingLeft: '7px',
                  paddingRight: '7px'
                }
              : {}
          }
          className="menu-item"
          to="/about"
        >
          About us
        </NavLink>
      </div>

      <div
        className="account bg-[#f5f5f5] px-10 py-1"
        onClick={() => setOpen(!open)}
      >
        <div className="text-[#45102b] flex flex-col justify-center items-center">
          <div className="font-bold text-xl">{fullname}</div>
          <div>{email}</div>
        </div>
        <div className={`dropdown-menu ${open ? 'open' : ''}`}>
          <ul>
            {/* <li>
              <a className="profile-item">
                <div className="account-info">
                  <div className="username">{fullname}</div>
                  <div className="email">{email}</div>
                  <div className="small-text">View account's information</div>
                </div>
              </a>
            </li> */}
            <li className="py-3 hover:bg-gray-100/30" onClick={handleLogout}>
              <a className="flex items-center justify-center gap-5">
                <div>
                  <BIIcons.BiLogOut />
                </div>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
        {/* <div className='side-menu-footer'>
                <ul>
                    <li>
                        <a className='app-item'>
                            <div className='app-icon'>
                                Help
                            </div>
                            <span>Help</span>
                        </a>
                    </li>
                    <li>
                        <a className='app-item'>
                            <div className='app-icon'>
                                Settings
                            </div>
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>
            </div> */}
      </div>
    </div>
  );
};

export default SideMenu;
