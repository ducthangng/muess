import React, { useEffect } from 'react';
import './App.scss';
import './configs/antd/customized.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoute from './routes/routes';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      {/* <ToastContainer */}
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
      <QueryClientProvider client={queryClient}>
        <AppRoute />
      </QueryClientProvider>
    </>
  );
}

export default App;
