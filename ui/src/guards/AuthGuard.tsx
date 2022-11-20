import React, { useState, useEffect } from 'react';
import { authApi } from '../api/authApi';
import { Outlet, Navigate } from 'react-router-dom';
import { GuardEC } from '../models/Guard';
import { userApi } from '../api/userApi';

const Guard = ({ children }) => {
  const [isAuth, setIsAuth] = useState<null | boolean>(null);

  const handleGuard = async () => {
    let res = await userApi.getCurrentUser();
    if (res.status === 200) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    handleGuard();
  }, []);

  if (isAuth === true) return children;

  if (isAuth === false) return <Navigate to={'/'} replace />;

  return null;
};

export default Guard;
