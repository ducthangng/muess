import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GuardEC } from '../models/Guard';
import { CookiesProvider } from 'react-cookie';
import UserLayout from '../pages/Layout/UserLayout';
import NotFound404 from '../pages/NotFound404';
import { AdminEC, StudentEC } from '../models/Guard';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Landingpage from '../pages/Landingpage';
import ReleaseApp from '../pages/ReleaseApp';
import PurchaseList from '../pages/PurchaseList';
import About from '../pages/About';
import Wallet from '../pages/Wallet';
import ProductSelection from '../pages/ProductSelection';
import AppDetail from '../pages/AppDetail';
import SoldList from '../pages/SoldList';
import Test from '../pages/Test';
import PurchaseConfirm from '../pages/PurchaseConfirm';
import Guard from '../guards/AuthGuard';

export default function AppRoute() {
  const AdminGuard: GuardEC = {
    guardEntity: AdminEC
  };

  return (
    <BrowserRouter>
      <CookiesProvider>
        <Routes>
          {/* public routes */}
          {/* <Route element={<LoginLayout />}> */}
          {/* <Route path="/" element={<Landingpage />} /> */}
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/release"
            element={
              <Guard>
                <ReleaseApp />
              </Guard>
            }
          />
          <Route path="/products" element={<ProductSelection />} />
          <Route path="/offers" element={<SoldList />} />
          <Route path="/test" element={<Test />} />
          <Route path="/products/:appId" element={<AppDetail />} />
          <Route path="/purchaseConfirm" element={<PurchaseConfirm />} />
          <Route path="/purchases" element={<PurchaseList />} />
          <Route path="/about" element={<About />} />
          <Route path="/wallet" element={<Wallet />} />
          {/* </Route> */}

          {/* admin routes */}
          <Route path="/app/*">
            <Route element={<UserLayout />}>
              {/* add new admin routes here */}
              <Route path="*" element={<Navigate to="dashboard/" replace />} />
            </Route>
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
}
