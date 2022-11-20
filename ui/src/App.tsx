import React, { useEffect } from 'react';
import './App.scss';
import './configs/antd/customized.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoute from './routes/routes';
import LoadingOverlay from './components/LoadingOverlay';
import { GlobalProvider } from './context/global/GlobalContext';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      {/* <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <LoadingOverlay>
            <AppRoute />
          </LoadingOverlay>
        </GlobalProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
