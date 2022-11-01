import { Card, Form, Tag } from 'antd';
import React from 'react';
import '../assets/css/MockTest.css';
import { App } from '../models/AppDetailData';
import { useNavigate } from 'react-router-dom';

const MockApp: React.FC<App> = ({ Key, Record }) => {
  const navigate = useNavigate();
  return (
    <Form>
      <Card
        onClick={() => navigate(`/products/${Record.assetId}`)}
        hoverable
        cover={
          <img
            src={Record.appIconURL}
            alt="example"
            style={{
              alignItems: 'center',
              borderTop: 10,
              height: '200px',
              objectFit: 'cover'
            }}
          />
        }
      >
        <div className="flex justify-center">
          <h1 className="font-bold text-lg">{Record.title} </h1>
        </div>
        {Record.appTags.length > 0 &&
          Record.appTags[0] &&
          Record.appTags.map((tag, index) => (
            <Tag
              key={index}
              color="#F17B7B"
              style={{ bottom: 'left', marginBottom: '5px' }}
            >
              {tag}
            </Tag>
          ))}
      </Card>
    </Form>
  );
};

export default MockApp;
