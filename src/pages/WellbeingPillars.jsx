import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RegistrationLayout from '../components/layout/RegistrationLayout';
import NavigationButtons from '../components/common/NavigationButtons';
import { getWellbeingPillars } from '../services/registrationApi';
import { setSelectedPillars } from '../redux/registrationSlice';
import { ROUTES, MAX_PILLARS } from '../utils/constants';
import { useRegistrationGuard } from '../hooks/useRegistrationGuard';
import { isPreviewMode, MOCK_PILLARS } from '../utils/devPreview';

function WellbeingPillars() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otpToken, selectedPillars } = useSelector((state) => state.registration);

  const [pillars, setPillars] = useState(isPreviewMode() ? MOCK_PILLARS : []);
  const [selected, setSelected] = useState(selectedPillars);
  const [loading, setLoading] = useState(!isPreviewMode());
  const [apiError, setApiError] = useState('');

  useRegistrationGuard(otpToken);

  useEffect(() => {
    setSelected(selectedPillars);
  }, [selectedPillars]);

  useEffect(() => {
    if (isPreviewMode()) return;

    const fetchPillars = async () => {
      try {
        const response = await getWellbeingPillars(1);
        if (response.data?.status && response.data?.data) {
          setPillars(response.data.data.filter((p) => p.is_active !== 0));
        }
      } catch (err) {
        setPillars(MOCK_PILLARS);
        setApiError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPillars();
  }, []);

  const togglePillar = (id) => {
    setSelected((prev) => {
      const index = prev.indexOf(id);
      if (index !== -1) {
        return prev.filter((p) => p !== id);
      }
      if (prev.length >= MAX_PILLARS) return prev;
      return [...prev, id];
    });
  };

  const getOrderNumber = (id) => {
    const index = selected.indexOf(id);
    return index !== -1 ? index + 1 : null;
  };

  const handleDone = () => {
    dispatch(setSelectedPillars(selected));
    navigate(ROUTES.LOADING);
  };

  const maxReached = selected.length >= MAX_PILLARS;

  if (loading) {
    return (
      <RegistrationLayout wide>
        <p className="form-card__subtitle">Loading wellbeing pillars...</p>
      </RegistrationLayout>
    );
  }

  return (
    <RegistrationLayout wide>
      <h1 className="form-card__title">
        Select any 3 well-being pillars goal you want to achieve
      </h1>
      {apiError && !isPreviewMode() && <div className="form-api-error" role="alert">{apiError}</div>}
      <div className="pillars-grid">
        {pillars.map((pillar) => {
          const order = getOrderNumber(pillar.id);
          const isSelected = order !== null;
          const isDisabled = maxReached && !isSelected;

          return (
            <button
              key={pillar.id}
              type="button"
              className={`pillar-item ${isDisabled ? 'pillar-item--disabled' : ''}`}
              onClick={() => togglePillar(pillar.id)}
              disabled={isDisabled}
              aria-pressed={isSelected}
              aria-label={`${pillar.pillar_title}${isSelected ? `, selected as ${order}` : ''}`}
            >
              <div className={`pillar-checkbox ${isSelected ? 'pillar-checkbox--selected' : ''}`}>
                {isSelected ? order : ''}
              </div>
              <div className="pillar-content">
                <h4>{pillar.pillar_title}</h4>
                <p>{pillar.description}</p>
              </div>
            </button>
          );
        })}
      </div>
      <NavigationButtons
        onBack={() => navigate(ROUTES.INTERESTS)}
        onNext={handleDone}
        nextLabel="Done"
        nextDisabled={selected.length !== MAX_PILLARS}
      />
    </RegistrationLayout>
  );
}

export default WellbeingPillars;
