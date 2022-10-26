import { Card, Form, Tag } from 'antd';
import React from 'react';
import '../assets/css/MockTest.css';
import mocktest from '../assets/images/Rectangle 6295.png';
import { AppDetailData } from '../models/AppDetailData';

const MockApp: React.FC<AppDetailData> = ({ _id, title, appTags }) => {
  return (
    <Form>
      <Card
        hoverable
        className="card"
        cover={
          <img
            src={mocktest}
            alt="example"
            className="image_cover"
            style={{ alignItems: 'center', borderTop: 10 }}
          />
        }
      >
        <div className="wrapper">
          <h1 className="content">{title}</h1>
        </div>
        <Tag color="#F17B7B" style={{ bottom: 'left' }} className="tag_lon">
          {appTags}
        </Tag>
      </Card>
    </Form>
  );
};

export default MockApp;
