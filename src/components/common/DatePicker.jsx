import { useState, useMemo } from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function DatePicker({ value, onChange, onClose }) {
  const initial = value ? new Date(value) : new Date(2000, 0, 1);
  const [month, setMonth] = useState(initial.getMonth());
  const [year, setYear] = useState(initial.getFullYear());
  const [selectedDay, setSelectedDay] = useState(value ? initial.getDate() : null);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i);
  }, []);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const handleDone = () => {
    if (selectedDay) {
      const date = new Date(year, month, selectedDay);
      onChange(date.toISOString());
    }
    onClose();
  };

  return (
    <div className="date-picker-overlay" onClick={onClose}>
      <div className="date-picker-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Select date</h3>
        <div className="date-picker-selectors">
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
          <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className="date-picker-grid">
          {DAY_LABELS.map((d) => (
            <div key={d} className="date-picker-day-label">{d}</div>
          ))}
          {calendarDays.map((day, i) => (
            <button
              key={i}
              type="button"
              className={`date-picker-day ${!day ? 'date-picker-day--empty' : ''} ${day === selectedDay ? 'date-picker-day--selected' : ''}`}
              onClick={() => day && setSelectedDay(day)}
              disabled={!day}
            >
              {day || ''}
            </button>
          ))}
        </div>
        <button type="button" className="btn btn--primary btn--full" onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
}

export default DatePicker;
