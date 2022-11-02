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
    <div className="app-detail-body">
      <SideMenu />
      <PurchasePopup
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        AppDetails={data.app}
        Creator={data.user}
      />

      <div className="py-[80px] w-full flex flex-col justify-center items-center">
        <div className="flex flex-col gap-5 w-[80vw] min-h-[80vh]">
          <div className="text-left flex justify-start">
            <button
              onClick={() => navigate(-1)}
              style={{
                border: 'none',
                background: 'none',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}
            >
              Return
            </button>
          </div>
          <div
            className="w-full h-full p-10"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e8e8e8',
              boxShadow: '0 0 10px 0 #e8e8e8',
              overflowY: 'scroll'
            }}
          >
            {/* content divided into 2 columns, left and right */}
            <div className="grid grid-cols-2">
              {/* left column */}
              <div>
                <div
                  style={{
                    fontWeight: '700',
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
                  className="py-10"
                  style={{
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'center'
                  }}
                >
                  <Tag color="geekblue" style={{ fontSize: '16px' }}>
                    {data.app.Record.rating}
                  </Tag>

                  <Tag color="magenta" style={{ fontSize: '16px' }}>
                    {data.app.Record.appCategories}
                  </Tag>
                </div>
                <div className="flex gap-10 py-5">
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
                  ></Statistic>
                </div>
                <div className="w-[1000px]">
                  <button
                    className="purchase_button"
                    onClick={() => setButtonPopup(true)}
                    style={{
                      background: '#FB7F4B',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '14px',
                      height: '2.25rem',
                      width: '20%',
                      borderRadius: '10px'
                    }}
                  >
                    Purchase
                  </button>
                </div>
                <div className="py-10">
                  <div
                    className="app-description-title py-3"
                    style={{
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
                      border: 'none',
                      background: 'none',
                      fontSize: '1rem',
                      fontWeight: '400'
                    }}
                  >
                    {data.app.Record.description}
                  </div>
                </div>

                <div
                  className="app-feedback-title"
                  style={{
                    border: 'none',
                    background: 'none',
                    fontSize: '1.25rem',
                    fontWeight: '700'
                  }}
                >
                  Generated: November 2022
                </div>
              </div>
              {/* right column */}
              <div className="flex justify-end">
                <img
                  alt="AppImage"
                  src={data.app.Record.appIconURL}
                  style={{
                    width: '300px',
                    height: '300px',
                    objectFit: 'cover',
                    display: 'flex'
                  }}
                />
              </div>
            </div>
            {/* footer */}
            <div
              className="my-5"
              style={{
                border: '1px solid #E3E3E3'
              }}
            />
            <div>
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
    </div>
  );
};

export default AppDetail;
