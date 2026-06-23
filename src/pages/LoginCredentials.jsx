import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RegistrationLayout from '../components/layout/RegistrationLayout';
import PasswordInput from '../components/common/PasswordInput';
import Input from '../components/common/Input';
import NavigationButtons from '../components/common/NavigationButtons';
import DatePicker from '../components/common/DatePicker';
import { setCredentials } from '../redux/registrationSlice';
import {
  validateUserPassword,
  validateConfirmPassword,
  validatePhone,
  validateBirthday,
  formatBirthdayDisplay,
} from '../utils/validation';
import { ROUTES } from '../utils/constants';
import { useRegistrationGuard } from '../hooks/useRegistrationGuard';
import { isPreviewMode } from '../utils/devPreview';

function LoginCredentials() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registration = useSelector((state) => state.registration);
  const { otpToken, password: savedPassword, birthday: savedBirthday, phoneNumber: savedPhone, workAnniversary: savedAnniversary, acceptedTerms: savedTerms } = registration;

  const [password, setPassword] = useState(savedPassword || '');
  const [confirmPassword, setConfirmPassword] = useState(savedPassword || '');
  const [birthday, setBirthday] = useState(savedBirthday || '');
  const [phoneNumber, setPhoneNumber] = useState(savedPhone || '');
  const [workAnniversary, setWorkAnniversary] = useState(savedAnniversary || '');
  const [acceptedTerms, setAcceptedTerms] = useState(savedTerms || false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  useRegistrationGuard(otpToken);

  const passwordError = password ? validateUserPassword(password) : '';
  const confirmError = confirmPassword ? validateConfirmPassword(password, confirmPassword) : '';
  const phoneError = phoneNumber ? validatePhone(phoneNumber) : '';
  const birthdayError = birthday ? validateBirthday(birthday) : '';

  const isFormValid =
    password &&
    confirmPassword &&
    birthday &&
    phoneNumber &&
    acceptedTerms &&
    !passwordError &&
    !confirmError &&
    !phoneError &&
    !birthdayError;

  const handleNext = () => {
    const newErrors = {};
    const pErr = validateUserPassword(password);
    const cErr = validateConfirmPassword(password, confirmPassword);
    const phErr = validatePhone(phoneNumber);
    const bErr = validateBirthday(birthday);
    if (pErr) newErrors.password = pErr;
    if (cErr) newErrors.confirmPassword = cErr;
    if (phErr) newErrors.phoneNumber = phErr;
    if (bErr) newErrors.birthday = bErr;
    if (!acceptedTerms) newErrors.terms = 'You must accept the Terms of Service and Privacy Policy';
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    dispatch(
      setCredentials({
        password,
        birthday,
        phoneNumber: phoneNumber.trim(),
        workAnniversary,
        acceptedTerms,
      })
    );
    navigate(ROUTES.INTERESTS);
  };

  return (
    <RegistrationLayout>
      <h1 className="form-card__title">Login Credentials</h1>
      <PasswordInput
        label="Password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        error={errors.password || passwordError}
        required
      />
      <PasswordInput
        label="Confirm password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Enter password"
        error={errors.confirmPassword || confirmError}
        required
      />
      <div className="form-group">
        <label htmlFor="birthday">Birthday</label>
        <div className="form-input-wrapper">
          <input
            id="birthday"
            type="text"
            className={`form-input ${errors.birthday || birthdayError ? 'form-input--error' : ''}`}
            value={birthday ? formatBirthdayDisplay(birthday) : ''}
            placeholder="Select date of birth (MM/DD/YYYY)"
            readOnly
            onClick={() => setShowDatePicker(true)}
          />
          <button
            type="button"
            className="form-input-toggle"
            onClick={() => setShowDatePicker(true)}
            aria-label="Open date picker"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D66D6D" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </button>
        </div>
        {(errors.birthday || birthdayError) && (
          <p className="form-error" role="alert">{errors.birthday || birthdayError}</p>
        )}
      </div>
      <Input
        label="Contact number"
        id="phoneNumber"
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter contact number"
        error={errors.phoneNumber || phoneError}
        required
      />
      <Input
        label="Work Anniversary (Optional)"
        id="workAnniversary"
        value={workAnniversary}
        onChange={(e) => setWorkAnniversary(e.target.value)}
        placeholder="Enter work anniversary"
      />
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="terms"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
        />
        <label htmlFor="terms">
          I agree to Woliba&apos;s{' '}
          <a href="https://woliba.io/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="https://woliba.io/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </label>
      </div>
      {errors.terms && <p className="form-error" role="alert">{errors.terms}</p>}
      <NavigationButtons
        onBack={() => navigate(ROUTES.OTP)}
        onNext={handleNext}
        nextDisabled={!isFormValid}
      />
      {showDatePicker && (
        <DatePicker
          value={birthday}
          onChange={setBirthday}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </RegistrationLayout>
  );
}

export default LoginCredentials;
