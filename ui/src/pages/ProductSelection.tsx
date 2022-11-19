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
import { Empty } from 'antd';
import { useGlobalContext } from '../context/global/GlobalContext';
import { ShopOutlined, DownSquareOutlined } from '@ant-design/icons';

function ProductSelection() {
  const { setIsLoading } = useGlobalContext();
  const { data } = useQuery(['productSelection'], async () => {
    setIsLoading(true);
    const res = await appApi.getAllApps();
    setIsLoading(false);
    return res;
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
                fontSize: '30px',
                fontWeight: 'bold',
                paddingTop: 100,
                paddingBottom: 5,
                paddingLeft: 100,
                color: '3A001E'
              }}
            >
              FEATURE APPS
            </Divider>
            <Divider
              className=""
              orientation="left"
              style={{
                paddingLeft: 100,
                paddingBottom: 50
              }}
            >
              <div>
                <Button
                  shape="default"
                  size="large"
                  icon={<ShopOutlined style={{ fontSize: '25px' }} />}
                  style={{ backgroundColor: '#FB7F4A', color: 'white' }}
                >
                  Store
                </Button>
                <Button
                  shape="default"
                  style={{
                    marginLeft: '1vw',
                    borderColor: 'gray',
                    color: 'black'
                  }}
                  size="large"
                  href="/my-app"
                  icon={<DownSquareOutlined style={{ fontSize: '25px' }} />}
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
            {(!data || data.length <= 0) && (
              <div className="mx-auto my-auto">
                <Empty />
              </div>
            )}
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
