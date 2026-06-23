import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RegistrationLayout from '../components/layout/RegistrationLayout';
import NavigationButtons from '../components/common/NavigationButtons';
import { verifyOtp, resendOtp } from '../services/registrationApi';
import { setError } from '../redux/registrationSlice';
import { setOtpToken } from '../redux/registrationSlice';
import { formatTimer } from '../utils/validation';
import { ROUTES, OTP_TIMER_SECONDS } from '../utils/constants';
import { useRegistrationGuard } from '../hooks/useRegistrationGuard';
import { isPreviewMode } from '../utils/devPreview';

const PREVIEW_OTP = ['7', '2', '4', '1', '0', '8'];

function OtpVerification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otpToken, email } = useSelector((state) => state.registration);

  const [digits, setDigits] = useState(isPreviewMode() ? PREVIEW_OTP : ['', '', '', '', '', '']);
  const [timer, setTimer] = useState(OTP_TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useRegistrationGuard(otpToken);

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return undefined;
    }
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const focusInput = (index) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setApiError('');
    if (value && index < 5) focusInput(index + 1);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newDigits = [...digits];
    pasted.split('').forEach((char, i) => {
      newDigits[i] = char;
    });
    setDigits(newDigits);
    focusInput(Math.min(pasted.length, 5));
  };

  const handleResend = async () => {
    if (!canResend || !email) return;
    setApiError('');
    try {
      const response = await resendOtp(email);
      if (response.data?.data?.token) {
        dispatch(setOtpToken(response.data.data.token));
        setTimer(OTP_TIMER_SECONDS);
        setCanResend(false);
        setDigits(['', '', '', '', '', '']);
        focusInput(0);
      }
    } catch (err) {
      setApiError(err.message);
    }
  };

  const handleSubmit = useCallback(async () => {
    const otp = digits.join('');
    if (otp.length !== 6) {
      setApiError('Please enter the complete 6-digit OTP');
      return;
    }
    if (isPreviewMode()) {
      navigate(ROUTES.CREDENTIALS);
      return;
    }

    setLoading(true);
    setApiError('');
    try {
      const response = await verifyOtp(otp, otpToken);
      if (response.data?.status === true || response.data?.status === 'success') {
        navigate(ROUTES.CREDENTIALS);
      } else {
        setApiError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setApiError(err.message);
      dispatch(setError(err.message));
    } finally {
      setLoading(false);
    }
  }, [digits, otpToken, navigate, dispatch]);

  const isComplete = digits.every((d) => d !== '');

  return (
    <RegistrationLayout>
      <h1 className="form-card__title">Input verification code</h1>
      <p className="form-card__subtitle">
        We&apos;ve sent a 6-digit OTP to your work email. Please enter it below to continue.
      </p>
      {apiError && <div className="form-api-error" role="alert">{apiError}</div>}
      <div className="otp-container" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="otp-input"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>
      <div className="otp-timer">
        {canResend ? (
          <div className="otp-resend">
            <button type="button" onClick={handleResend}>
              Resend OTP
            </button>
          </div>
        ) : (
          <>Resend OTP in {formatTimer(timer)}</>
        )}
      </div>
      <NavigationButtons
        onBack={() => navigate(ROUTES.USER_DETAILS)}
        onNext={handleSubmit}
        nextLabel="Submit"
        nextDisabled={!isComplete}
        loading={loading}
      />
    </RegistrationLayout>
  );
}

export default OtpVerification;
