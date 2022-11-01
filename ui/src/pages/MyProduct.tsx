import React, { useEffect } from 'react';
import MyProductDetail from '../components/MyProductDetail';
import SideMenu from '../components/Header/SideMenu';
import { Row, Divider, Empty } from 'antd';
import { Pagination } from 'antd';
import { Button } from 'antd';
import { appApi } from '../api/appApi';
import { useQuery } from 'react-query';
import { useGlobalContext } from '../context/global/GlobalContext';

function OwnedProducts() {
  const { setIsLoading } = useGlobalContext();
  const { data } = useQuery(['getOwnedApps'], async () => {
    setIsLoading(true);
    const res = await appApi.getOwnedApps();
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
                fontSize: '48px',
                fontWeight: 'bold',
                paddingTop: 100,
                paddingBottom: 5,
                paddingLeft: 350,
                color: '3A001E'
              }}
            >
              OWNED APPS
            </Divider>
            <Divider
              className=""
              orientation="left"
              style={{
                paddingLeft: 370
              }}
            >
              <div>
                <Button ghost shape="default" size="middle" href="/products">
                  Featured Apps
                </Button>
                <Button shape="default" size="middle" href="/my-app">
                  Owned Apps
                </Button>
              </div>
            </Divider>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-md md:max-w-6xl mx-auto">
              {data &&
                data.map((item, index) => {
                  return (
                    <MyProductDetail
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

export default OwnedProducts;
