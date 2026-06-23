import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPreviewMode } from '../utils/devPreview';
import { ROUTES } from '../utils/constants';

export function useRegistrationGuard(condition, redirectTo = ROUTES.COMPANY) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isPreviewMode()) return;
    if (!condition) navigate(redirectTo);
  }, [condition, navigate, redirectTo]);
}
