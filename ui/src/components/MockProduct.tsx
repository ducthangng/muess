import { Card, Form, Tag } from 'antd';
import React from 'react';
import '../assets/css/MockTest.css';
import mocktest from '../assets/images/Rectangle 6295.png';
import { App } from '../models/AppDetailData';
import { useNavigate } from 'react-router-dom';

const MockApp: React.FC<App> = ({ Key, Record }) => {
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
        <Tag color="#F17B7B" style={{ bottom: 'left' }} className="tag_lon">
          {Record.description}
        </Tag>
      </Card>
    </Form>
  );
};

export default MockApp;
