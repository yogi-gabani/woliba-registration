function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = '',
}) {
  const classes = [
    'btn',
    variant === 'outline' ? 'btn--outline' : 'btn--primary',
    fullWidth ? 'btn--full' : '',
    loading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? 'Please wait...' : children}
    </button>
  );
}

export default Button;
