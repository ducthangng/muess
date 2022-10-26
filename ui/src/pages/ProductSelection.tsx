import React from 'react';
import MockProduct from '../components/MockProduct';
import SideMenu from '../components/Header/SideMenu';
import { Row, Divider } from 'antd';
import { Pagination } from 'antd';
import { AppData } from '../models/AppData';

const defaultData: AppData[] = [
  {
    appId: 1,
    description: 'This is the default application',
    title: 'Application 1',
    apptag: 'Application'
  },
  {
    appId: 2,
    description: 'This is the default application',
    title: 'Application 2',
    apptag: 'Application'
  },
  {
    appId: 3,
    description: 'This is the default application',
    title: 'Application 3',
    apptag: 'Application'
  },
  {
    appId: 4,
    description: 'This is the default application',
    title: 'Application 4',
    apptag: 'Application'
  }
];

function ProductSelection() {
  return (
    <><SideMenu /><div
      style={{
        display: 'flex'
      }}
    >
      <body>
        <Divider orientation="left"> FEATURE APPS: </Divider>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-md md:max-w-6xl mx-auto">
          {defaultData.map((item) => {
            return (
              <MockProduct
                appId={item.appId}
                description={item.description}
                title={item.title}
                apptag={item.apptag} />
            );
          })}
        </div>
        <br></br>
        <Row justify="center">
          <Pagination
            defaultCurrent={1}
            total={50}
            style={{ color: '#8172D5' }} />
        </Row>
      </body>
    </div></>
  );
}

export default ProductSelection;
