import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppDetailData } from '../models/AppDetailData';
import { Divider } from 'antd';

const AppDetail: React.FC<AppDetailData> = ({
  appId,
  appTitle,
  description,
  apprank,
  appdownloadrate,
  Appinformation
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Divider
        orientation="left"
        style={{ fontSize: '56px', fontFamily: 'Roboto', color: '#8172d5' }}
      >
        App Details
      </Divider>

      <div className="">return (</div>
    </div>
  );
};
