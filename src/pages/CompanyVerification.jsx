import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegistrationLayout from '../components/layout/RegistrationLayout';
import Input from '../components/common/Input';
import PasswordInput from '../components/common/PasswordInput';
import Button from '../components/common/Button';
import { verifyCompany } from '../services/registrationApi';
import { setCompanyData, setError } from '../redux/registrationSlice';
import { validateCompanyPassword } from '../utils/validation';
import { ROUTES } from '../utils/constants';
import { isPreviewMode } from '../utils/devPreview';

function CompanyVerification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid = companyName.trim() && password && !validateCompanyPassword(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordError = validateCompanyPassword(password);
    const newErrors = {};
    if (!companyName.trim()) newErrors.companyName = 'Company name is required';
    if (passwordError) newErrors.password = passwordError;
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    if (isPreviewMode()) {
      dispatch(setCompanyData({ companyId: 12, companyName: companyName.trim() || 'Woliba' }));
      navigate(ROUTES.USER_DETAILS);
      return;
    }

    setLoading(true);
    setApiError('');
    try {
      const response = await verifyCompany(companyName.trim(), password);
      const companyData = response.data?.data?.[0];
      if (response.data?.status === 'success' && companyData) {
        dispatch(
          setCompanyData({
            companyId: companyData.id,
            companyName: companyData.company_name || companyName.trim(),
          })
        );
        navigate(ROUTES.USER_DETAILS);
      } else {
        setApiError('Company verification failed. Please check your credentials.');
      }
    } catch (err) {
      setApiError(err.message || 'Company verification failed.');
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
          label="Company Name"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter Company Name"
          error={errors.companyName}
          required
        />
        <PasswordInput
          label="Company Password"
          id="companyPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Company Password"
          error={errors.password}
          required
        />
        <div className="form-actions form-actions--single">
          <Button type="submit" fullWidth disabled={!isFormValid} loading={loading}>
            Next
          </Button>
        </div>
      </form>
    </RegistrationLayout>
  );
}

export default CompanyVerification;
