import { Card, Form, Button } from 'antd';
import React from 'react';
import styles from '../assets/css/GroupCard.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { App } from '../models/AppDetailData';
const { Meta } = Card;

const GroupCard: React.FC<App> = ({ Key, Record }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${Record.assetId}/home`);
  };

  return (
    <Form>
      <Card
        hoverable
        className={styles.card}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            className={styles.cover}
            style={{
              alignItems: 'center',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px'
            }}
          />
        }
      >
        <div className={styles.wrapper}>
          <Meta
            title={Record.title}
            description={Record.description}
            className={styles.content}
            style={{ textAlign: 'center' }}
          />
          <Button
            className={styles.btn}
            style={{ alignItems: 'center' }}
            onClick={() => handleClick()}
          >
            Visit
          </Button>
        </div>
      </Card>
    </Form>
  );
};

export default GroupCard;
