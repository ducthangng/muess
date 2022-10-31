import { Card, Form, Tag } from 'antd';
import React from 'react';
import '../assets/css/MockTest.css';
import { App } from '../models/AppDetailData';
import { useNavigate } from 'react-router-dom';

const MockProductLicense: React.FC<App> = ({ Key, Record }) => {
  const navigate = useNavigate();
  return (
    <Form>
      <Card
        onClick={() => navigate('/products/12')}
        hoverable
        className="card"
        cover={
          <img
            src={Record.appIconURL}
            alt="example"
            className="image_cover"
            style={{ alignItems: 'center', borderTop: 10 }}
          />
        }
      >
        <div className="wrapper">
          <h1 className="content">{Record.title} </h1>
        </div>
        <div className="wrapper">
          <h1 className="content">LicenseDetail</h1>
        </div>
      </Card>
    </Form>
  );
};

export default MockProductLicense;
