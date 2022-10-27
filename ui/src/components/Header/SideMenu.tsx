import React, { useState } from 'react';
import './SideMenu.css';
import Logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(true);
  let navigate = useNavigate();

  return (
    <div className="side-menu">
      <div className="logo" onClick={() => navigate('/')}>
        <img src={Logo} alt="logo" />
      </div>
      <div className="main-menu">
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
  );
};

export default SideMenu;
