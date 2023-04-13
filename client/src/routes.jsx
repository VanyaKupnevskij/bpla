import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

export function useRoutes(isAuthenticated) {
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/create" exact element={<CreatePage />} />

        <Route path="*" element={<Navigate to="/create" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" exact element={<AuthPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/" exact element={<MainPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
