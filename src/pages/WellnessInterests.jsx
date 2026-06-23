import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RegistrationLayout from '../components/layout/RegistrationLayout';
import NavigationButtons from '../components/common/NavigationButtons';
import { getWellnessInterests } from '../services/registrationApi';
import { setSelectedInterests } from '../redux/registrationSlice';
import { CLOUDFRONT_BASE_URL, ROUTES } from '../utils/constants';
import { useRegistrationGuard } from '../hooks/useRegistrationGuard';
import { isPreviewMode, MOCK_INTERESTS } from '../utils/devPreview';

function WellnessInterests() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otpToken, selectedInterests } = useSelector((state) => state.registration);

  const [interests, setInterests] = useState(isPreviewMode() ? MOCK_INTERESTS : []);
  const [expanded, setExpanded] = useState(isPreviewMode() ? 'Individual Sports' : null);
  const [selected, setSelected] = useState(selectedInterests);
  const [loading, setLoading] = useState(!isPreviewMode());
  const [apiError, setApiError] = useState('');

  useRegistrationGuard(otpToken);

  useEffect(() => {
    if (isPreviewMode()) return;

    const fetchInterests = async () => {
      try {
        const response = await getWellnessInterests();
        if (response.data?.status && response.data?.data) {
          setInterests(response.data.data);
          const types = [...new Set(response.data.data.map((i) => i.interest_type))];
          setExpanded(types[0] || null);
        }
      } catch (err) {
        setInterests(MOCK_INTERESTS);
        setExpanded('Individual Sports');
        setApiError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInterests();
  }, []);

  const grouped = useMemo(() => {
    return interests.reduce((acc, item) => {
      const type = item.interest_type || 'Other';
      if (!acc[type]) acc[type] = [];
      acc[type].push(item);
      return acc;
    }, {});
  }, [interests]);

  const toggleInterest = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    dispatch(setSelectedInterests(selected));
    navigate(ROUTES.PILLARS);
  };

  if (loading) {
    return (
      <RegistrationLayout wide>
        <p className="form-card__subtitle">Loading wellness interests...</p>
      </RegistrationLayout>
    );
  }

  return (
    <RegistrationLayout wide>
      <div className="interests-card">
        <h1 className="form-card__title">
          Select all wellness interests that apply — at least one is required.
        </h1>
        {apiError && !isPreviewMode() && <div className="form-api-error" role="alert">{apiError}</div>}
        {Object.entries(grouped).map(([type, items]) => (
          <div key={type} className="accordion-item">
            <button
              type="button"
              className="accordion-header"
              onClick={() => setExpanded(expanded === type ? null : type)}
              aria-expanded={expanded === type}
            >
              {type}
              <span className={`accordion-chevron ${expanded === type ? 'accordion-chevron--open' : ''}`}>
                ▾
              </span>
            </button>
            {expanded === type && (
              <div className="accordion-body">
                <div className="interest-chips">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`interest-chip ${selected.includes(item.id) ? 'interest-chip--selected' : ''}`}
                      onClick={() => toggleInterest(item.id)}
                    >
                      {item.interest_icon && (
                        <img
                          src={`${CLOUDFRONT_BASE_URL}/${item.interest_white_icon || item.interest_icon}`}
                          alt=""
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <NavigationButtons
          onBack={() => navigate(ROUTES.CREDENTIALS)}
          onNext={handleNext}
          nextDisabled={selected.length === 0}
        />
      </div>
    </RegistrationLayout>
  );
}

export default WellnessInterests;
