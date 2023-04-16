import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useFormData } from './hooks/formData.hook';

export function useRoutes(isAuthenticated) {
  const { FormProvider } = useFormData();

  if (!isAuthenticated) {
    return (
      <FormProvider>
        <Routes>
          <Route path="/create" exact element={<CreatePage />} />

          <Route path="*" element={<Navigate to="/create" />} />
        </Routes>
      </FormProvider>
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
