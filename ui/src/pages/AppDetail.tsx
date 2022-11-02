import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { App } from '../models/AppDetailData';
import { Divider } from 'antd';
import SideMenu from '../components/Header/SideMenu';
import '../assets/css/AppDetail.css';
import PurchasePopup from '../components/PurchasePopup';
import { appApi } from '../api/appApi';
import { userApi } from '../api/userApi';
import { User } from '../models/User';
import { Statistic, Tag, Badge } from 'antd';
import { CloudDownloadOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { time } from 'console';
import { ratings } from '../consts/ratings';
import { useGlobalContext } from '../context/global/GlobalContext';

const defaultApp: App = {
  Key: '',
  Record: {
    assetType: '',
    assetId: '',
    creatorId: '',
    creatorName: '',
    title: '',
    description: '',
    rating: '',
    appType: '',
    paymentMethod: '',
    appTags: [],
    appCategories: [],
    appIconURL: '',
    averageProposedPrice: 0,
    proposalQuantity: 0
  }
};

const defaultUser: User = {
  _id: '',
  email: '',
  fullname: '',
  username: '',
  password: '',
  identity: ''
};

const AppDetail = () => {
  const { setIsLoading } = useGlobalContext();
  const navigate = useNavigate();
  const [data, setData] = useState({
    app: defaultApp,
    user: defaultUser
  });

  const { appId } = useParams();
  const [buttonPopup, setButtonPopup] = useState(false);

  const fetchData = async () => {
    if (!appId || appId.length === 0) {
      return;
    }
    try {
      setIsLoading(true);
      const appRes = await appApi.getAppById(appId as string);
      setData((state) => ({ ...state, app: appRes }));
      const userRes = await userApi.getInfoById(appRes.Record.creatorId);
      setData((state) => ({ ...state, user: userRes }));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <body className="">
      <SideMenu />
      <PurchasePopup
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        AppDetails={data.app}
        Creator={data.user}
      />

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
              {data.app.Record.title}
            </div>

            <div className="app-detail-author">
              {data.app.Record.creatorName}
            </div>

            <div
              className="app-detail-types"
              style={{
                position: 'relative',
                width: '60%',
                height: '30%',
                backgroundColor: '#ffffff',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center'
              }}
            >
              {/* <div
                className="app-detail-rating"
                style={{
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  fontSize: '1rem'
                }}
              >
                {data.app?.Record.rating.length === 0
                  ? defaultApp.Record.rating
                  : data.app?.Record.rating}
              </div> */}
              {/* <div
              className="line"
              style={{
                borderRight: '3px solid black',
                height: '30%',
                marginLeft: '0.5rem',
                marginRight: '0.5rem'
              }}
            ></div> */}
              {/* <div
              className="app-detail-downloads"
              style={{
                position: 'relative',
                backgroundColor: '#ffffff',
                fontSize: '1rem'
              }}
            >
              Do not have this (download)
            </div> */}
              {/* <div
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
                {data.app?.Record.appCategories.length === 0
                  ? defaultApp.Record.appCategories
                  : data.app?.Record.appCategories}
              </div>
              <div
                className="line"
                style={{
                  borderRight: '3px solid black',
                  height: '30%',
                  marginLeft: '0.5rem',
                  marginRight: '0.5rem'
                }}
              ></div> */}

              <Tag color="geekblue" style={{ fontSize: '18px' }}>
                {data.app?.Record.rating.length === 0
                  ? defaultApp.Record.rating
                  : '#' + data.app?.Record.rating}
              </Tag>
              {data.app?.Record.appCategories.length > 0 &&
                data.app?.Record.appCategories.map((category) => (
                  <Tag color="magenta" style={{ fontSize: '18px' }}>
                    {'#' + category}
                  </Tag>
                ))}
            </div>
            <div
              className="app-detail-author"
              style={{
                position: 'relative',
                top: '0',
                left: '0',
                backgroundColor: '#ffffff',
                fontSize: '1.25rem',
                fontWeight: '400',
                color: '#FB7F4B',
                marginBottom: '1rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <Statistic
                  title="Average Prices"
                  value={
                    data.app?.Record?.averageProposedPrice === 0
                      ? 'N/A'
                      : data.app?.Record?.averageProposedPrice
                  }
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="$"
                />

                <Statistic
                  title="Downloads"
                  value={data.app?.Record?.proposalQuantity}
                  prefix={<CloudDownloadOutlined />}
                  style={{ marginBottom: '3vh', marginLeft: '2vw' }}
                ></Statistic>
              </div>
            </div>
            <button
              className="purchase_button"
              onClick={() => setButtonPopup(true)}
              style={{
                background: '#FB7F4B',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '15px',
                height: '2.25rem',
                width: '20%',
                borderRadius: '10px',
                position: 'relative'
              }}
            >
              Purchase
            </button>

            <img
              alt="AppImage"
              src={data.app?.Record.appIconURL}
              style={{
                marginLeft: 'auto',
                marginRight: '5%',
                marginTop: '-320px',
                width: '300px',
                height: '300px',
                objectFit: 'cover',
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
              {data.app?.Record.description}
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
              Published: November 2022
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
              <br />
              <i style={{ fontSize: '12px' }}>
                Warranty Note: MUESS (MUNCHEN SOFTWARE SERVICE) warrants that
                the Licensed Software will perform in accordance with its
                specifications for an ongoing from the date of acceptance. Joi
                Media will (at its own cost) rectify any faults in the Licensed
                Software notified to Joi Media during the duration of the
                platform. This constitutes Licensee's sole remedy for breaches
                of warranty under this Agreement.
              </i>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default AppDetail;
