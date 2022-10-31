import React, { useState, useEffect } from 'react';
import { authApi } from '../api/authApi';
import { Outlet, Navigate } from 'react-router-dom';
import { GuardEC } from '../models/Guard';

const Guard = ({ guardEntity }: GuardEC) => {
  const [isAuth, setIsAuth] = useState<null | boolean>(null);

  const handleGuard = async () => {
    let data = await authApi.getId();
    if (data._id.length !== 0) setIsAuth(true);
    if (data._id.length === 0) setIsAuth(false);
  };

  useEffect(() => {
    handleGuard();
  }, []);

  if (isAuth === true) return <Outlet />;

  if (isAuth === false) return <Navigate to={'/'} />;

  return null;
};

export default Guard;
