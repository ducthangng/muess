import React, { useState } from 'react'
import './SideMenu.css'
import Logo from '../../assets/images/logo.png'

import { Link } from 'react-router-dom';

const SideMenu = (props) => {
    const [inactive, setInactive] = useState(true);

    return (
        <div className='side-menu'>
            <div className='logo'>
                < img src={Logo} alt='logo' />
            </div>

            <div className='main-menu'>
                <ul>
                    <li>
                        <Link to='/dashboard'>
                            <div className='menu-item'>
                                <div className='menu-icon'>
                                    Release
                                </div>

                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='/storage'>
                            <div className='menu-item'>
                                Buy/Rent
                            </div>

                        </Link>
                    </li>
                    <li>
                        <Link to='/message'>
                            <div className='menu-item'>
                                Purchases

                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='/report/overview'>
                            <div className='menu-item'>
                                Your Wallet
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='/report/overview'>
                            <div className='menu-item'>
                                About us
                            </div>
                        </Link>
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
    )
}

export default SideMenu;
