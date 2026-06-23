function HeroVisual({ children, className = '' }) {
  return (
    <div className={`hero-visual ${className}`.trim()}>
      <span className="hero-visual__glow hero-visual__glow--green" aria-hidden="true" />
      <span className="hero-visual__glow hero-visual__glow--yellow" aria-hidden="true" />
      <span className="hero-visual__glow hero-visual__glow--blue" aria-hidden="true" />
      <span className="hero-visual__glow hero-visual__glow--pink" aria-hidden="true" />
      <div className="hero-visual__media">{children}</div>
    </div>
  );
}

export default HeroVisual;
