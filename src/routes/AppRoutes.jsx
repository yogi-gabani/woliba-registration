import { Routes, Route, Navigate } from 'react-router-dom';
import CompanyVerification from '../pages/CompanyVerification';
import UserDetails from '../pages/UserDetails';
import OtpVerification from '../pages/OtpVerification';
import LoginCredentials from '../pages/LoginCredentials';
import WellnessInterests from '../pages/WellnessInterests';
import WellbeingPillars from '../pages/WellbeingPillars';
import RegistrationLoading from '../pages/RegistrationLoading';
import WelcomeScreen from '../pages/WelcomeScreen';
import { ROUTES } from '../utils/constants';

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.COMPANY} element={<CompanyVerification />} />
      <Route path={ROUTES.USER_DETAILS} element={<UserDetails />} />
      <Route path={ROUTES.OTP} element={<OtpVerification />} />
      <Route path={ROUTES.CREDENTIALS} element={<LoginCredentials />} />
      <Route path={ROUTES.INTERESTS} element={<WellnessInterests />} />
      <Route path={ROUTES.PILLARS} element={<WellbeingPillars />} />
      <Route path={ROUTES.LOADING} element={<RegistrationLoading />} />
      <Route path={ROUTES.WELCOME} element={<WelcomeScreen />} />
      <Route path="*" element={<Navigate to={ROUTES.COMPANY} replace />} />
    </Routes>
  );
}

export default AppRoutes;
