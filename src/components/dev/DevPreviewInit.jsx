import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadPreviewState } from '../../redux/registrationSlice';
import { isPreviewMode } from '../../utils/devPreview';

function DevPreviewInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isPreviewMode()) {
      dispatch(loadPreviewState());
    }
  }, [dispatch]);

  return null;
}

export default DevPreviewInit;
