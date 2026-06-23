import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RegistrationLayout from '../components/layout/RegistrationLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { saveUserDetailsAndSendOtp } from '../services/registrationApi';
import { setUserDetails, setOtpToken, setError } from '../redux/registrationSlice';
import { validateEmail, validateName } from '../utils/validation';
import { ROUTES } from '../utils/constants';
import { useRegistrationGuard } from '../hooks/useRegistrationGuard';
import { isPreviewMode } from '../utils/devPreview';

function UserDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyId, companyName, email, fname, lname } = useSelector((state) => state.registration);

  const [emailVal, setEmailVal] = useState(email || '');
  const [fnameVal, setFnameVal] = useState(fname || '');
  const [lnameVal, setLnameVal] = useState(lname || '');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  useRegistrationGuard(companyId);
  const isFormValid = !validateEmail(emailVal) && !validateName(fnameVal, 'First name') && !validateName(lnameVal, 'Last name');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const eErr = validateEmail(emailVal);
    const fErr = validateName(fnameVal, 'First name');
    const lErr = validateName(lnameVal, 'Last name');
    if (eErr) newErrors.email = eErr;
    if (fErr) newErrors.fname = fErr;
    if (lErr) newErrors.lname = lErr;
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    if (isPreviewMode()) {
      dispatch(setUserDetails({ email: emailVal.trim(), fname: fnameVal.trim(), lname: lnameVal.trim() }));
      navigate(ROUTES.OTP);
      return;
    }

    setLoading(true);
    setApiError('');
    try {
      const response = await saveUserDetailsAndSendOtp({
        company_id: companyId,
        mail: emailVal.trim(),
        fname: fnameVal.trim(),
        lname: lnameVal.trim(),
      });
      if (response.data?.status === 'success' && response.data?.data?.token) {
        dispatch(setUserDetails({ email: emailVal.trim(), fname: fnameVal.trim(), lname: lnameVal.trim() }));
        dispatch(setOtpToken(response.data.data.token));
        navigate(ROUTES.OTP);
      } else {
        setApiError('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setApiError(err.message);
      dispatch(setError(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegistrationLayout>
      <h1 className="form-card__title">Registration</h1>
      {apiError && <div className="form-api-error" role="alert">{apiError}</div>}
      <form onSubmit={handleSubmit}>
        <Input
          label="Email ID"
          id="email"
          type="email"
          value={emailVal}
          onChange={(e) => setEmailVal(e.target.value)}
          placeholder="Enter email ID"
          error={errors.email}
          required
        />
        <Input
          label="First name"
          id="fname"
          value={fnameVal}
          onChange={(e) => setFnameVal(e.target.value)}
          placeholder="Enter first name"
          error={errors.fname}
          required
        />
        <Input
          label="Last name"
          id="lname"
          value={lnameVal}
          onChange={(e) => setLnameVal(e.target.value)}
          placeholder="Enter last name"
          error={errors.lname}
          required
        />
        <Input
          label="Company name"
          id="companyNameDisplay"
          value={companyName}
          readOnly
        />
        <div className="form-actions form-actions--single">
          <Button type="submit" fullWidth disabled={!isFormValid} loading={loading}>
            Verify email
          </Button>
        </div>
      </form>
    </RegistrationLayout>
  );
}

export default UserDetails;
