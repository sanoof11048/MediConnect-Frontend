import { Routes, Route } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from '../pages/404';
import ForgotPassword from '../features/auth/pages/ForgetPassword';
import NavigationPage from '../pages/NavigationPage';
import SignUp from '../features/auth/pages/SignUp';
import Unauthorized from '../pages/Unauthorized';
import HomeNurseDashboard from '../features/homeNurse/pages/NurseDashboard';
import RelativeOverView from '../features/relative/pages/RelativeOverView';
import RelativeLayout from '../layouts/RelativeLayout';
import RelativeNurse from '../features/relative/pages/RelativeNurse';
import RelativePatients from '../features/relative/pages/RelativePatients';
import RelativePayments from '../features/relative/pages/RelativePayments';


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgetPassword" element={<ForgotPassword />} />
      <Route path="/" element={<NavigationPage />} />

      <Route path="/unauthorized" element={<Unauthorized />} />

       {/* <Route path="/relative" element={<RelativeDashboard />}/> */}

      <Route path="/relative" element={<RelativeLayout />}>
        <Route index element={<RelativeOverView />} />
        <Route path="overview" element={<RelativeOverView />} />
        <Route path="care-team" element={<RelativeNurse />} />
        <Route path="patients" element={<RelativePatients />} />
        <Route path="finance" element={<RelativePayments />} />
      </Route>

      <Route path='/nurse' element={<HomeNurseDashboard />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
