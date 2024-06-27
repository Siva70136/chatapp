import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = Cookie.get('jwt_token');
  return token !== undefined ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
