import React from 'react';

import CompleteTable from './Purchase/CompleteTable';
import SideMenu from '../components/Header/SideMenu';
import PurchaseListV2 from './PurchaseListV2';

const PurchaseList = () => {
  return (
    <>
      <SideMenu />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '15vh'
        }}
      >
        <PurchaseListV2 />
      </div>

      {/* <CompleteTable /> */}
    </>
  );
};
export default PurchaseList;
