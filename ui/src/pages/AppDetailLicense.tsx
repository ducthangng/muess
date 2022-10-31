import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { App } from '../models/AppDetailData';
import { Divider } from 'antd';
import SideMenu from '../components/Header/SideMenu';
import '../assets/css/AppDetail.css';
import PurchasePopup from '../components/PurchasePopup';
import { appApi } from '../api/appApi';
import LicenseAppDetails from '../components/LicenseAppDetail';

const defaultApp: App = {
  Key: '',
  Record: {
    assetType: '',
    assetId: '',
    creatorId: '',
    title: '',
    description: '',
    rating: '',
    appType: '',
    paymentMethod: '',
    appTags: [],
    appCategories: [],
    appIconURL: ''
  }
};

const AppDetailLicense = () => {
  const navigate = useNavigate();
  const { appId } = useParams();
  const [app, SetApp] = useState<App>();
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    if (appId?.length !== 0) {
      appApi.getAppById(appId as string).then((result) => {
        SetApp(result);
      });
    }
  }, [appId]);

  return (
    <body className="app-detail-body">
      <SideMenu />
      <PurchasePopup trigger={buttonPopup} setTrigger={setButtonPopup} />

      <div
        className="app-detail"
        style={{
          position: 'relative',
          width: '70vw',
          height: '80vh',
          top: '13vh',
          left: '15vw',
          backgroundColor: 'transparent'
        }}
      >
        <button
          className="return"
          onClick={() => navigate(-1)}
          style={{
            position: 'relative',
            top: '0',
            left: '0',
            border: 'none',
            background: 'none',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}
        >
          Return
        </button>
        <div
          className="app-detail-container"
          style={{
            width: '100%',
            height: '90%',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #e8e8e8',
            boxShadow: '0 0 10px 0 #e8e8e8',
            position: 'absolute',
            bottom: '0',
            overflowY: 'scroll'
          }}
        >
          <div
            className="app-main-detail"
            style={{
              width: '90%',
              height: '50%',
              position: 'relative',
              top: '0',
              left: '0',
              marginLeft: '5%',
              marginTop: '2rem',
              backgroundColor: 'transparent'
            }}
          >
            <div
              className="app-detail-title"
              style={{
                position: 'relative',
                fontWeight: '700',
                top: '0',
                left: '0',
                backgroundColor: '#ffffff',
                fontSize: '3rem'
              }}
            >
              {app?.Record?.title.length === 0
                ? defaultApp.Record.title
                : app?.Record.title}
            </div>
            <div
              className="app-detail-types"
              style={{
                position: 'relative',
                width: '60%',
                height: '30%',
                backgroundColor: '#ffffff',
                display: 'flex',
                // margin: 'auto',
                justifyContent: 'left',
                alignItems: 'center'
              }}
            >
              <div
                className="app-detail-rating"
                style={{
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  fontSize: '1rem'
                }}
              >
                {app?.Record.rating.length === 0
                  ? defaultApp.Record.rating
                  : app?.Record.rating}
              </div>
              <div
                className="line"
                style={{
                  borderRight: '3px solid black',
                  height: '30%',
                  marginLeft: '0.5rem',
                  marginRight: '0.5rem'
                }}
              ></div>
              <div
                className="line"
                style={{
                  borderRight: '3px solid black',
                  height: '30%',
                  marginLeft: '0.5rem',
                  marginRight: '0.5rem'
                }}
              ></div>
              <div
                className="app-detail-categories"
                style={{
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  fontSize: '1rem'
                }}
              >
                Display This (categories)
              </div>
            </div>

            <LicenseAppDetails />

            <img
              alt="AppImage"
              src={
                app?.Record.appIconURL.length === 0
                  ? defaultApp.Record.appIconURL
                  : app?.Record.appIconURL
              }
              style={{
                marginLeft: 'auto',
                marginRight: '5%',
                marginTop: '-27%',
                width: '30%',
                display: 'flex',
                position: 'relative'
              }}
            />
          </div>

          <div
            className="app-sub-detail"
            style={{
              width: '90%',
              height: '40%',
              position: 'relative',
              top: '3rem',
              left: '0',
              margin: '0 0 5% 5%',
              backgroundColor: 'transparent'
            }}
          >
            <div
              className="app-description-title"
              style={{
                position: 'relative',
                top: '0',
                left: '0',
                border: 'none',
                background: 'none',
                fontSize: '1.25rem',
                fontWeight: '700'
              }}
            >
              About this app
            </div>
            <div
              className="app-description"
              style={{
                position: 'relative',
                top: '0',
                left: '0',
                border: 'none',
                background: 'none',
                marginTop: '1rem',
                fontSize: '1rem',
                fontWeight: '400'
              }}
            >
              {app?.Record.description.length === 0
                ? defaultApp.Record.description
                : app?.Record.description}
            </div>
            <div
              className="app-feedback-title"
              style={{
                position: 'relative',
                top: '0',
                left: '0',
                border: 'none',
                background: 'none',
                fontSize: '1.25rem',
                fontWeight: '700',
                marginTop: '1.5rem'
              }}
            >
              Feedbacks
            </div>
            <div
              className="app-feedback-user"
              style={{
                position: 'relative',
                top: '0',
                left: '0',
                border: 'none',
                background: 'none',
                fontSize: '1rem',
                fontWeight: '700',
                marginTop: '1rem',
                color: '#FB7F4B'
              }}
            >
              Do not have this (Username)
            </div>
            <div
              className="app-feedback-content"
              style={{
                position: 'relative',
                top: '0',
                left: '0',
                border: 'none',
                background: 'none',
                // marginTop: '1rem',
                fontSize: '1rem',
                fontWeight: '400'
              }}
            >
              Do not have this (feedback content)
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default AppDetailLicense;
