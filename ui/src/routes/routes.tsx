import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GuardEC } from '../models/Guard';
import { CookiesProvider } from 'react-cookie';
import UserLayout from '../pages/Layout/UserLayout';
import ClassroomLayout from '../pages/Layout/ClassroomLayout';
import Guard from '../guards/AuthGuard';
import NotFound404 from '../pages/NotFound404';
import UserProfile from '../pages/UserProfile';
import { AdminEC, StudentEC } from '../models/Guard';
import { TestProvider } from '../context/test/TestContext';
import Register from "../pages/Register";
import Login from '../pages/Login';
import Landingpage from '../pages/Landingpage';
import ReleaseApp from '../pages/ReleaseApp';
import PurchaseList from '../pages/PurchaseList';
import About from '../pages/About';
import Wallet from '../pages/Wallet';
import ProductSelection from '../pages/ProductSelection';

export default function AppRoute() {
  const AdminGuard: GuardEC = {
    guardEntity: AdminEC
  };

  const StudentGuard: GuardEC = {
    guardEntity: StudentEC
  };

  return (
    <BrowserRouter>
      <CookiesProvider>
        <Routes>
          {/* public routes */}
          {/* <Route element={<LoginLayout />}> */}
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/release" element={<ReleaseApp/>} />
            <Route path="/products" element={<ProductSelection/>} />
            <Route path="/purchases" element={<PurchaseList />} />
            <Route path="/about" element ={<About />} />
            <Route path="/wallet" element ={<Wallet />} />
          {/* </Route> */}

          {/* student routes */}
          {/* <Route path="/student/*" element={<Guard {...StudentGuard} />}> */}
          <Route path="/student/*">
            <Route element={<UserLayout />}>
              <Route path="dashboard/*" element={<UserProfile />}>
                <Route path="*" element={<Navigate to="" replace />} />
              </Route>

              <Route path="classroom/*">
                {/* <Route path="" element={<GroupSelection />} /> */}
                <Route element={<ClassroomLayout />}>
                  {/* <Route path=":id/home" element={<TestSelection />} /> */}
                </Route>
                <Route path="*" element={<Navigate to="" replace />} />
              </Route>

              {/* <Route path="account/*" element={<UserProfile />} /> */}
            </Route>

            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* admin routes */}
          <Route path="/admin/*" element={<Guard {...AdminGuard} />}>
            <Route element={<UserLayout />}>
              <Route path="dashboard/*">
                {/* <Route path="" element={<TestManagement />} />
                <Route path="users" element={<UserManagement />} /> */}
              </Route>

              <Route path="classroom/*">
                {/* <Route path="" element={<GroupInterface />} />
                <Route path="create" element={<AdminCreateClass />} /> */}
                <Route element={<ClassroomLayout />}>
                  {/* <Route path=":id/home" element={<TestSelection />} /> */}
                </Route>
                <Route path="*" element={<Navigate to="" replace />} />
              </Route>

              {/* <Route path="account/*" element={<Account />} /> */}
              {/* add new admin routes here */}
              <Route path="*" element={<Navigate to="dashboard/" replace />} />
            </Route>
          </Route>

          {/* test routes */}
          <Route path="test">
            <Route path=":testId">
              <Route
                path="details"
                element={
                  <TestProvider>
                    
                  </TestProvider>
                }
              />
              <Route
                path="do/*"
                element={
                  <TestProvider>
                    {/* <Test reviewMode={false} /> */}
                  </TestProvider>
                }
              />
              <Route
                path="review/*"
                element={
                  <TestProvider>
                    {/* <Test reviewMode={true} /> */}
                  </TestProvider>
                }
              />
            </Route>
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
}
