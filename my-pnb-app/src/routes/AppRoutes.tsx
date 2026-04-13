import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';

const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));
const RedirectHandler = lazy(() => import('../pages/RedirectHandler'));
const Dashboard = lazy(() => import('../features/dashboard/pages/Dashboard'));
const TransactionReports = lazy(() => import('../features/transactions/pages/TransactionReports'));
const QrDetails = lazy(() => import('../features/qr/pages/QrDetails'));
const LanguageUpdate = lazy(() => import('../features/language/pages/LanguageUpdate'));
const AppRoutes = () => {
  return (
    <Suspense fallback={<div style={{padding: '20px'}}>Loading PNB Portal...</div>}>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/redirected" element={<RedirectHandler />} />
        
        {/* Protected (Inside Sidebar Layout) */}
        <Route element={<MainLayout />}>
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/transactions" element={<TransactionReports />} />
           
          <Route path="/qr-details" element={<QrDetails />} />

          
         <Route path="/language-update" element={<LanguageUpdate />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;