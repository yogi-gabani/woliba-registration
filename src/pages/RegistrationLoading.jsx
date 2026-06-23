import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RegistrationLayout from '../components/layout/RegistrationLayout';
import HeroVisual from '../components/common/HeroVisual';
import { completeRegistration } from '../services/registrationApi';
import { setRegistrationSuccess, setError } from '../redux/registrationSlice';
import { formatBirthdayForApi } from '../utils/validation';
import { ROUTES } from '../utils/constants';
import { useRegistrationGuard } from '../hooks/useRegistrationGuard';
import { isPreviewMode } from '../utils/devPreview';
import loaderVideo from '@assets/loader.mp4';

function RegistrationLoading() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registration = useSelector((state) => state.registration);
  const hasSubmitted = useRef(false);

  useRegistrationGuard(registration.otpToken);

  useEffect(() => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    if (isPreviewMode()) {
      const timer = setTimeout(() => {
        dispatch(
          setRegistrationSuccess({
            user: registration.registeredUser || { fname: 'Shivani', lname: 'Shendkar' },
            token: 'preview-auth-token',
          })
        );
        navigate(ROUTES.WELCOME);
      }, 2500);
      return () => clearTimeout(timer);
    }

    const submitRegistration = async () => {
      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';
        const payload = {
          fname: registration.fname,
          lname: registration.lname,
          password: registration.password,
          time_zone: timeZone,
          token: registration.otpToken,
          areas_of_interest: registration.selectedInterests,
          wellbeing_pillars: registration.selectedPillars,
          accepted_privacy_policy: registration.acceptedTerms,
          birthday: formatBirthdayForApi(registration.birthday),
          phone_number: registration.phoneNumber,
          user_type: 0,
          language_id: 1,
        };

        const response = await completeRegistration(payload);
        if (response.data?.status === 'success' && response.data?.data) {
          dispatch(
            setRegistrationSuccess({
              user: response.data.data.user,
              token: response.data.data.token,
            })
          );
          setTimeout(() => navigate(ROUTES.WELCOME), 1500);
        } else {
          dispatch(setError('Registration failed. Please try again.'));
          navigate(ROUTES.PILLARS);
        }
      } catch (err) {
        dispatch(setError(err.message));
        if (err.message?.toLowerCase().includes('expired') || err.message?.toLowerCase().includes('session')) {
          navigate(ROUTES.OTP);
        } else {
          navigate(ROUTES.PILLARS);
        }
      }
    };

    submitRegistration();
  }, [dispatch, navigate, registration]);

  return (
    <RegistrationLayout bare plainBackground>
      <div className="loading-screen">
        <HeroVisual className="hero-visual--loader">
          <video
            className="loading-screen__video"
            src={loaderVideo}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
        </HeroVisual>
        <p className="loading-screen__text">Getting your wellness journey ready...</p>
      </div>
    </RegistrationLayout>
  );
}

export default RegistrationLoading;
