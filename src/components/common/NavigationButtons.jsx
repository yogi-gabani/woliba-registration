import Button from './Button';

function NavigationButtons({ onBack, onNext, nextLabel = 'Next', nextDisabled = false, loading = false, showBack = true }) {
  return (
    <div className={`form-actions ${!showBack ? 'form-actions--single' : ''}`}>
      {showBack && onBack && (
        <Button variant="outline" onClick={onBack}>
          ‹ Back
        </Button>
      )}
      <Button onClick={onNext} disabled={nextDisabled} loading={loading}>
        {nextLabel}
      </Button>
    </div>
  );
}

export default NavigationButtons;
