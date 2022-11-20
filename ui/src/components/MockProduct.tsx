import { Badge, Card, Form, Tag } from 'antd';
import React from 'react';
import '../assets/css/MockTest.css';
import { App } from '../models/AppDetailData';
import { useNavigate } from 'react-router-dom';

const MockApp: React.FC<App> = ({ Key, Record }) => {
  const navigate = useNavigate();
  const getColor = (val: string) => {
    switch (val) {
      case 'pegi3':
        return 'pink';
      case 'pegi7':
        return 'green';
      case 'pegi12':
        return 'cyan';
      case 'pegi16':
        return 'red';
      case 'pegi18':
        return 'volcano';
      default:
        return 'magenta';
    }
  };
  return (
    <Form>
      <Badge.Ribbon text={Record.rating} color={getColor(Record.rating)}>
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
          <h1 className="font-bold text-lg">{Record.title} </h1>
          {/* <div className="flex justify-center">
            
          </div> */}
          <p>{Record.creatorName}</p>
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
      </Badge.Ribbon>
    </Form>
  );
};

export default MockApp;
