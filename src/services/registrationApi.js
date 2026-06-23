import axiosInstance from '../api/axiosInstance';

export const verifyCompany = (companyName, password) =>
  axiosInstance.post('/verify-by-company-name-and-password', {
    company_name: companyName.trim().toLowerCase(),
    password,
  });

export const saveUserDetailsAndSendOtp = (payload) =>
  axiosInstance.post('/save-user-details-and-send-otp', payload);

export const verifyOtp = (otp, token) =>
  axiosInstance.post('/verify-otp-for-user-registration', { otp, token });

export const resendOtp = (email) =>
  axiosInstance.post('/send-otp-for-user-registration', { email });

export const getWellnessInterests = () =>
  axiosInstance.get('/viewWellnessInterest', {
    headers: {
      Origin: 'https://staging.gcp.woliba.io',
      Referer: 'https://staging.gcp.woliba.io/',
    },
  });

export const getWellbeingPillars = (languageId = 1) =>
  axiosInstance.get(`/get-wellbeing-pillars/${languageId}`);

export const completeRegistration = (payload) =>
  axiosInstance.post('/user-registration', payload);
