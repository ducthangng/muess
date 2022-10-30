import React, { useState } from 'react';
import './SideMenu.css';
import Logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import * as BIIcons from 'react-icons/bi';

const SideMenu = (props) => {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  return (
    <div className="side-menu">
      <div className="logo">
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
          Buy/Rent
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
          to="/solds"
        >
          Solds
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

      <div className="account" onClick={() => setOpen(!open)}>
        <div className="account-info">
          <div className="username">Bui Nhien Loc</div>
          <div>nhienloc@gmail.com</div>
        </div>
        <div className={`dropdown-menu ${open ? 'open' : ''}`}>
          <ul>
            <li>
              <a className="profile-item">
                <div className="account-info">
                  <div className="username">Bui Nhien Loc</div>
                  <div className="email">nhienloc@gmail.com</div>
                  <div className="small-text">View account's information</div>
                </div>
              </a>
            </li>
            <li>
              <a className="logout">
                <div className="icon">
                  <BIIcons.BiLogOut></BIIcons.BiLogOut>
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
