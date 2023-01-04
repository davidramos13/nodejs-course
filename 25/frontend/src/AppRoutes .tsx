import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Feed from './pages/Feed/Feed';
import SinglePost from './pages/Feed/SinglePost';

type Props = { isAuth: boolean };
const AppRoutes: React.FC<Props> = ({ isAuth }) => {
  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/:postId" element={<SinglePost />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
