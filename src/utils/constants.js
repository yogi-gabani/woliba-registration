// Documented base URL from api.txt
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dev.woliba.io/v1';
export const CLOUDFRONT_BASE_URL = 'https://d38xnw03cl4zf4.cloudfront.net';
export const OTP_TIMER_SECONDS = 180;
export const MAX_PILLARS = 3;

export const ROUTES = {
  COMPANY: '/',
  USER_DETAILS: '/user-details',
  OTP: '/verify-otp',
  CREDENTIALS: '/login-credentials',
  INTERESTS: '/wellness-interests',
  PILLARS: '/wellbeing-pillars',
  LOADING: '/registration-loading',
  WELCOME: '/welcome',
};
