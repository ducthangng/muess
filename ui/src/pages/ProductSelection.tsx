import React, { useEffect } from 'react';
import MockProduct from '../components/MockProduct';
import SideMenu from '../components/Header/SideMenu';
import { Row, Divider } from 'antd';
import { Pagination } from 'antd';
import { Button } from 'antd';
import { App } from '../models/AppDetailData';
import { appApi } from '../api/appApi';
import { useQuery } from 'react-query';
import { isMapIterator } from 'util/types';

function ProductSelection() {
  const { data } = useQuery(['productSelection'], async () => {
    return await appApi.getAllApps();
  });

  return (
    <>
      <div>
        <SideMenu />
        <body>
          <div
            style={{
              width: '100%'
            }}
          >
            <Divider
              className=""
              orientation="left"
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                paddingTop: 100,
                paddingBottom: 5,
                paddingLeft: 350,
                color: '3A001E'
              }}
            >
              FEATURE APPS
            </Divider>
            <Divider
              className=""
              orientation="left"
              style={{
                paddingLeft: 370
              }}
            >
              <div>
                <Button ghost shape="default" size="middle">
                  Featured Apps
                </Button>
                <Button
                  ghost
                  shape="default"
                  size="middle"
                  href="/productselection"
                >
                  Owned Apps
                </Button>
                <Button
                  ghost
                  shape="default"
                  size="middle"
                  href="/productselection"
                >
                  My Apps
                </Button>
              </div>
            </Divider>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-md md:max-w-6xl mx-auto">
              {data &&
                data.map((item, index) => {
                  return (
                    <MockProduct
                      key={index}
                      Key={item.Key}
                      Record={item.Record}
                    />
                  );
                })}
            </div>
            <br></br>
            <Row justify="center">
              <Pagination
                defaultCurrent={1}
                total={50}
                style={{ color: '#8172D5' }}
              />
            </Row>
          </div>
        </body>
      </div>
    </>
  );
}

export default ProductSelection;
