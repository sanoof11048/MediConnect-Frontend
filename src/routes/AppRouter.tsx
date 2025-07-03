import { Routes, Route, Navigate } from 'react-router-dom';
import { Roles } from '../constants/roles';

import Login from '../features/auth/pages/Login';
import SignUp from '../features/auth/pages/SignUp';
import ForgotPassword from '../features/auth/pages/ForgetPassword';
import NotFoundPage from '../pages/404';
import Unauthorized from '../pages/Unauthorized';

import RelativeLayout from '../layouts/RelativeLayout';
import RelativeOverView from '../features/relative/pages/RelativeOverView';
import RelativeNurse from '../features/relative/pages/RelativeNurse';
import RelativePatients from '../features/relative/pages/RelativePatients';
import RelativePayments from '../features/relative/pages/RelativePayments';
import RequestNursePlanPage from '../features/relative/modals/RequestNursePlanPage';

import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../features/admin/pages/AdminDashboard';
import PatientsManagement from '../features/admin/pages/PatientManagement';
import NursesManagement from '../features/admin/pages/NursesManagement';
import AdminNurseRequestsPage from '../features/admin/pages/AdminNurseRequestsPage';
import AssignmentsPage from '../features/admin/pages/AssignmentsPage';
import AdminRelativesPage from '../features/admin/pages/AdminRelativesPage';

import HomeNurseDashboard from '../features/homeNurse/pages/HomeNurseDashboard';

import ProtectedRoute from './ProtectedRoute';
// import PublicRoute from './PublicRoutes';
import Home from '../components/Home';
import Loading from '../pages/Loading';

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes (restricted for logged-in users) */}
      {/* <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} /> */}
      {/* <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} /> */}
      
      <Route path="/login" element={<Login />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgetPassword" element={<ForgotPassword />} />
      <Route path="/" element = {<Home/>}/>
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Relative Routes */}
      <Route
        path="/relative"
        element={
          <ProtectedRoute allowedRoles={[Roles.Relative]}>
            <RelativeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<RelativeOverView />} />
        <Route path="overview" element={<RelativeOverView />} />
        <Route path="nurses" element={<RelativeNurse />} />
        <Route path="patients" element={<RelativePatients />} />
        <Route path="payments" element={<RelativePayments />} />
        <Route path="request-nurse/:patientId" element={<RequestNursePlanPage />} />
        <Route path="plans" element={<RequestNursePlanPage />} />
      </Route>

      {/* Admin Routes */}
      <Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={[Roles.Admin]}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  {/* ✅ Redirect base /admin to a subpage like /admin/dashboard */}
  <Route index element={<Navigate to="dashboard" replace />} />
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="patients" element={<PatientsManagement />} />
  <Route path="nurses" element={<NursesManagement />} />
  <Route path="requests" element={<AdminNurseRequestsPage />} />
  <Route path="assignments" element={<AssignmentsPage />} />
  <Route path="relatives" element={<AdminRelativesPage />} />
</Route>


      {/* Nurse Routes */}
      <Route
        path="/nurse"
        element={
          <ProtectedRoute allowedRoles={[Roles.HomeNurse]}>
            <HomeNurseDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
