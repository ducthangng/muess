import React, { useEffect } from 'react';
import './App.scss';
import './configs/antd/customized.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import ReleaseApp from './pages/ReleaseApp';

import AppRoute from './routes/routes';

import About from './pages/About';

function App() {
  return (
    <>
      
      {/* <ToastContainer
      {/* <ReleaseApp/> */}

      {/* <About /> */}

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      /> 
       <AppRoute />
    </>
  );
}

export default App;
