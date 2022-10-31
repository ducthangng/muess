import React, { useEffect } from 'react';
import MockProductLicense from '../components/MockProduct';
import SideMenu from '../components/Header/SideMenu';
import { Row, Divider } from 'antd';
import { Pagination } from 'antd';
import { Button } from 'antd';
import { appApi } from '../api/appApi';
import { useQuery } from 'react-query';

function ProductLicense() {
  const { data } = useQuery(['productLicense'], async () => {
    return await appApi.getOwnedApps();
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
                <Button
                  ghost
                  shape="default"
                  size="middle"
                  href="/productSelection"
                >
                  Featured Apps
                </Button>
                <Button ghost shape="default" size="middle" href="/ownedapps">
                  Owned Apps
                </Button>
              </div>
            </Divider>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-md md:max-w-6xl mx-auto">
              {data &&
                data.map((item) => {
                  return (
                    <MockProductLicense
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
                      imageSrc={item.imageSrc}
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

export default ProductLicense;
