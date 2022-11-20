import React from 'react';

import CompleteTable from './Sold/CompleteTable';
import SideMenu from '../components/Header/SideMenu';
import DisplayTableWithAction from './PurchaseListV2WithAction';

const SoldList = () => {
  return (
    <>
      <SideMenu />
      {/* <CompleteTable /> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '15vh'
        }}
      >
        <DisplayTableWithAction />
      </div>
    </>
  );
};
export default SoldList;
