import { createRoot } from 'react-dom/client';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import NotFoundPage from './pages/NotFoundPage';
import {MainPage} from "./pages/MainPage.tsx";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<NotFoundPage />}>
      <MainPage />
    </ErrorBoundary>
  </React.StrictMode>
);
