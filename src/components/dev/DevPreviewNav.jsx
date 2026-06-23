import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadPreviewState } from '../../redux/registrationSlice';
import { isPreviewMode, PREVIEW_PAGES } from '../../utils/devPreview';

function DevPreviewNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  if (!isPreviewMode()) return null;

  return (
    <div className={`dev-preview-nav ${collapsed ? 'dev-preview-nav--collapsed' : ''}`}>
      <div className="dev-preview-nav__header">
        <span className="dev-preview-nav__badge">UI Preview</span>
        <button
          type="button"
          className="dev-preview-nav__toggle"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand preview panel' : 'Collapse preview panel'}
        >
          {collapsed ? '◀' : '▶'}
        </button>
      </div>
      {!collapsed && (
        <>
          <p className="dev-preview-nav__hint">Compare each screen with Figma. No API needed.</p>
          <nav className="dev-preview-nav__links">
            {PREVIEW_PAGES.map(({ label, path }) => (
              <button
                key={path}
                type="button"
                className={`dev-preview-nav__link ${location.pathname === path ? 'dev-preview-nav__link--active' : ''}`}
                onClick={() => navigate(path)}
              >
                {label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            className="dev-preview-nav__reset"
            onClick={() => dispatch(loadPreviewState())}
          >
            Reset mock data
          </button>
        </>
      )}
    </div>
  );
}

export default DevPreviewNav;
