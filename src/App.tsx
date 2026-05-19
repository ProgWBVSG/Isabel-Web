/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import SobreMi from './pages/SobreMi';
import Talleres from './pages/Talleres';
import Mentoria from './pages/Mentoria';
import Testimonios from './pages/Testimonios';
import Prensa from './pages/Prensa';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLeads from './pages/admin/AdminLeads';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminContent from './pages/admin/AdminContent';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ── Rutas Públicas ── */}
        <Route path="/" element={<Layout><Landing /></Layout>} />
        <Route path="/sobre-mi" element={<Layout><SobreMi /></Layout>} />
        <Route path="/talleres" element={<Layout><Talleres /></Layout>} />
        <Route path="/mentoria" element={<Layout><Mentoria /></Layout>} />
        <Route path="/testimonios" element={<Layout><Testimonios /></Layout>} />
        <Route path="/prensa" element={<Layout><Prensa /></Layout>} />

        {/* ── Admin Login (sin protección) ── */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ── Rutas Admin (protegidas) ── */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/leads" element={
          <ProtectedRoute>
            <AdminLayout><AdminLeads /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/testimonios" element={
          <ProtectedRoute>
            <AdminLayout><AdminTestimonials /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/textos" element={
          <ProtectedRoute>
            <AdminLayout><AdminContent /></AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
