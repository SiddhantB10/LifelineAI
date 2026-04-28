import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/public/HomePage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { SignupPage } from './pages/public/SignupPage';
import { CitizenDashboard } from './pages/dashboards/CitizenDashboard';
import { DriverDashboard } from './pages/dashboards/DriverDashboard';
import { HospitalDashboard } from './pages/dashboards/HospitalDashboard';
import { OperatorDashboard } from './pages/dashboards/OperatorDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';

function Shell({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Shell><HomePage /></Shell>} />
        <Route path="features" element={<Shell><FeaturesPage /></Shell>} />
        <Route path="how-it-works" element={<Shell><HowItWorksPage /></Shell>} />
        <Route path="about" element={<Shell><AboutPage /></Shell>} />
        <Route path="contact" element={<Shell><ContactPage /></Shell>} />
        <Route path="login" element={<Shell><LoginPage /></Shell>} />
        <Route path="signup" element={<Shell><SignupPage /></Shell>} />
      </Route>

      <Route
        path="app"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="citizen" replace />} />
        <Route path="citizen" element={<CitizenDashboard />} />
        <Route path="driver" element={<DriverDashboard />} />
        <Route path="hospital" element={<HospitalDashboard />} />
        <Route path="operator" element={<OperatorDashboard />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

