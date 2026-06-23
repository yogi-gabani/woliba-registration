const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[a-zA-Z\s'-]+$/;

export const validateEmail = (email) => {
  if (!email?.trim()) return 'Email is required';
  if (!EMAIL_REGEX.test(email.trim())) return 'Please enter a valid email address';
  return '';
};

export const validateName = (name, fieldLabel) => {
  if (!name?.trim()) return `${fieldLabel} is required`;
  if (!NAME_REGEX.test(name.trim())) return `${fieldLabel} cannot contain numbers or special characters`;
  return '';
};

export const validateCompanyPassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least 1 uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least 1 number';
  return '';
};

export const validateUserPassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least 1 uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least 1 number';
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match. Please re-enter.';
  return '';
};

export const validatePhone = (phone) => {
  if (!phone?.trim()) return 'Contact number is required';
  if (!/^\+?[\d\s()-]{7,15}$/.test(phone.trim())) return 'Please enter a valid contact number';
  return '';
};

export const validateBirthday = (birthday) => {
  if (!birthday) return 'Birthday is required';
  const date = new Date(birthday);
  if (Number.isNaN(date.getTime())) return 'Please select a valid date';
  const today = new Date();
  if (date >= today) return 'Birthday must be in the past';
  return '';
};

export const formatBirthdayForApi = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatBirthdayDisplay = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
};

export const formatTimer = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
};
