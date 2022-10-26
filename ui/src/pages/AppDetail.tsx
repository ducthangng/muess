import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { AppDetailData } from '../models/AppDetailData';
import { Divider } from 'antd';
import SideMenu from '../components/Header/SideMenu';
import '../assets/css/AppDetail.css';
import PurchasePopup from '../components/PurchasePopup';


const AppDetail: React.FC<AppDetailData> = ({
  _id,
  title,
  description,
  appCategories,
  appIcon,
  appPaymentMethod,
  appTags,
  appType,
  feedbacks,
  creatorId,
  creatorName
}) => {
  const navigate = useNavigate();

  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <>
      <main>
      <SideMenu />
      <div className="app-detail"
        style={{
          position: 'relative',
          width: '70vw',
          height: '80vh',
          top: '13vh',
          left: '15vw',
          backgroundColor: 'transparent',
        }}>
      
        <button className="return" onClick={() => navigate(-1)}
          style={{
            position: 'relative',
            top: '0',
            left: '0',
            border: 'none',
            background: 'none',
            fontSize: '1.5rem',
            fontWeight: '700',
          }}>Return</button>
        <div className="app-detail-container"
          style={{
            width: '100%',
            height: '90%',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #e8e8e8',
            boxShadow: '0 0 10px 0 #e8e8e8',
            position: 'absolute',
            bottom: '0',
            overflowY: 'scroll',
          }}>
          <div className="app-main-detail"
            style={{
              width: '45%',
              height: '45%',
              position: 'relative',
              top: '0',
              left: '0',
              marginLeft: '5%',
              marginTop: '2rem',
              backgroundColor: 'transparent',
            }}>
            <div className="app-detail-title"
              style={{
                position: 'relative',
                fontWeight: '700',
                top: '0',
                left: '0',
                backgroundColor: '#ffffff',
                fontSize: '3rem',
              }}>App 1</div>
            <div className="app-detail-author"
              style={{
                position: 'relative',
                top: '0',
                left: '0',
                backgroundColor: '#ffffff',
                fontSize: '1.25rem',
                fontWeight: '400',
                color: '#FB7F4B',
              }}>Nha cai uy tin so 1 vietnam</div>
            <div className="app-detail-types"
              style={{
                position: 'relative',
                width: "60%",
                height: "30%",
                backgroundColor: "#ffffff",
                display: 'flex',
                // margin: 'auto',
                justifyContent: 'left',
                alignItems: 'center',
              }}>
              <div className="app-detail-rating"
                style={{
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  fontSize: '1rem',
                }}>
                5.1*
              </div>
              <div className='line'
                style={{
                  borderRight: '3px solid black',
                  height: '30%',
                  marginLeft: '0.5rem',
                  marginRight: '0.5rem',
                }}></div>
              <div className="app-detail-downloads"
                style={{
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  fontSize: '1rem',
                }}>
                420K
              </div>
              <div className='line'
                style={{
                  borderRight: '3px solid black',
                  height: '30%',
                  marginLeft: '0.5rem',
                  marginRight: '0.5rem',
                }}></div>
              <div className="app-detail-categories"
                style={{
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  fontSize: '1rem',
                }}>
                18+
              </div>
            </div>
            <button className='purchase_button'
              onClick={() => setButtonPopup(true)}
              style={{
                background: '#FB7F4B',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '15px',
                height: '2.25rem',
                width: '30%',
                borderRadius: '10px',
                position: 'relative',
              }}
            >Purchase</button>
            
            
          </div>
          <div className="app-sub-detail"
            style={{
              width: '90%',
              height: '40%',
              position: 'relative',
              top: '0',
              left: '0',
              margin: '0 0 5% 5%',
              backgroundColor: 'transparent',
            }}>
            <div className="app-description-title"
              style={{
                position: 'relative',
                top: '0',
                left: '0',
                border: 'none',
                background: 'none',
                fontSize: '1.25rem',
                fontWeight: '700',
              }}>About this app</div>
            <div className="app-description"
              style={{
                position: 'relative',
                top: '0',
                left: '0',
                border: 'none',
                background: 'none',
                marginTop: '1rem',
                fontSize: '1rem',
                fontWeight: '400',
              }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div className="app-feedback-title"
              style={{
                position: 'relative',
                top: '0',
                left: '0',
                border: 'none',
                background: 'none',
                fontSize: '1.25rem',
                fontWeight: '700',
                marginTop: '1.5rem',
              }}>Feedbacks</div>
            <div className="app-feedback-user"
              style={{
                position: 'relative',
                top: '0',
                left: '0',
                border: 'none',
                background: 'none',
                fontSize: '1rem',
                fontWeight: '700',
                marginTop: '1rem',
                color: '#FB7F4B',
              }}>User1234</div>
            <div className="app-feedback-content"
              style={{
                position: 'relative',
                top: '0',
                left: '0',
                border: 'none',
                background: 'none',
                // marginTop: '1rem',
                fontSize: '1rem',
                fontWeight: '400',
              }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
      </div>
      </main>
        <PurchasePopup trigger={buttonPopup} setTrigger={setButtonPopup}/>
        
    </>

  );
};

export default AppDetail;