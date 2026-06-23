function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  readOnly = false,
  required = false,
}) {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id}>
          {label}
          {required && <span className="sr-only"> (required)</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`form-input ${error ? 'form-input--error' : ''} ${readOnly ? 'form-input--readonly' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
