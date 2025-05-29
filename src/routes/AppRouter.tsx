import { Routes, Route } from 'react-router-dom';
import ChiefDashboard from '../features/cheifRelative/pages/CheifDashBoard';
import Login from '../features/auth/pages/Login';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from '../pages/404';
import ForgotPassword from '../features/auth/pages/ForgetPassword';


export default function AppRouter() {
  return (
    // <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgotPassword />} />

        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />
        
        <Route
          path="/chief"
          element={
            <ProtectedRoute allowedRoles={["ChiefRelative"]}>
              <ChiefDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<NotFoundPage/>} />
      </Routes>
    // </Router>
  );
}
