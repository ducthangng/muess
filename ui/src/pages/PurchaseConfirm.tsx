import React, { useEffect } from 'react';
import MockProduct from '../components/MockProduct';
import SideMenu from '../components/Header/SideMenu';
import { appApi } from '../api/appApi';
import { useQuery } from 'react-query';

import { Row, Divider } from 'antd';
import { Card, Space, message } from 'antd';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Menu } from 'antd';
import { Input } from 'antd';

const PurchaseConfirm = () => {
  const { data } = useQuery(['purchaseConfirm'], async () => {
    return await appApi.getAllApps();
  });

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: '1st menu item',
          key: '1'
        },
        {
          label: '2nd menu item',
          key: '2'
        },
        {
          label: '3rd menu item',
          key: '3'
        }
      ]}
    />
  );

  return (
    <>
      <div>
        <SideMenu />
        <body>
          <Row>
            <div
              style={{
                width: '100%'
              }}
            >
              {/* <Divider 
             className=""
             orientation="left"
            > */}
              <Divider
                className=""
                orientation="left"
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  paddingTop: 100,
                  paddingBottom: 5,
                  // paddingLeft: 350,
                  color: '3A001E'
                }}
              >
                Purchase Product
              </Divider>

              <Space
                direction="vertical"
                size="large"
                style={{
                  paddingLeft: 200
                }}
              >
                <Card title="1. Addition Request" size="small">
                  <Row>
                    <p>Category </p>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          Choose addition request
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </Row>
                </Card>

                <Card title="2. Offer Price" size="default">
                  <Row>
                    <p>Price: </p>
                    <Input placeholder="Enter price" />
                  </Row>
                </Card>
              </Space>
              {/* </Divider> */}

              <Divider
                className=""
                orientation="left"
                style={{
                  paddingLeft: 370
                }}
              ></Divider>
              <Divider
                className=""
                orientation="right"
                style={{
                  paddingRight: 370
                }}
              >
                <div>
                  <Card title="Order Review" size="small">
                    {data &&
                      data.map((item) => {
                        return (
                          <MockProduct
                            _id={item._id}
                            title={item.title}
                            description={item.description}
                            creatorId={item.creatorId}
                            creatorName={item.creatorName}
                            rated={item.rated}
                            appType={item.appType}
                            appPaymentMethod={item.appPaymentMethod}
                            appCategories={item.appCategories}
                            reviewer={item.reviewer}
                            downloaded={item.downloaded}
                            appIcon={item.appIcon} // link to database.
                            feedbacks={item.feedbacks}
                            appTags={item.appTags}
                          />
                        );
                      })}
                    <Divider orientation="left">
                      <Button
                        type="primary"
                        shape="round"
                        href="/productselection"
                      >
                        Confirm
                      </Button>
                    </Divider>
                  </Card>
                </div>
              </Divider>
            </div>
          </Row>
        </body>
      </div>
    </>
  );
};

export default PurchaseConfirm;
