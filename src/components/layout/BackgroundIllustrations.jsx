import backgroundImage from '@assets/Background.png';

function BackgroundIllustrations() {
  return (
    <div
      className="background-illustrations"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-hidden="true"
    />
  );
}

export default BackgroundIllustrations;
