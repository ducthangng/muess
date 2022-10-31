import { Card, Form, Tag } from 'antd';
import React from 'react';
import '../assets/css/MockTest.css';
import { AppDetailDataLicense } from '../models/AppDetailData';
import { useNavigate } from 'react-router-dom';

const MockProductLicense: React.FC<AppDetailDataLicense> = ({
  _id,
  title,
  description,
  imageSrc,
  licenseDetails
}) => {
  const navigate = useNavigate();
  return (
    <Form>
      <Card
        onClick={() => navigate('/products/12')}
        hoverable
        className="card"
        cover={
          <img
            src={imageSrc}
            alt="example"
            className="image_cover"
            style={{ alignItems: 'center', borderTop: 10 }}
          />
        }
      >
        <div className="wrapper">
          <h1 className="content">{title} </h1>
        </div>
        <div className="wrapper">
          <h1 className="content">{licenseDetails}</h1>
        </div>
      </Card>
    </Form>
  );
};

export default MockProductLicense;
