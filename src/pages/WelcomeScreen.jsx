import { useSelector } from 'react-redux';
import RegistrationLayout from '../components/layout/RegistrationLayout';
import Button from '../components/common/Button';
import HeroVisual from '../components/common/HeroVisual';
import welcomeHero from '@assets/welcome-hero.gif';

function WelcomeScreen() {
  const { registeredUser, fname } = useSelector((state) => state.registration);
  const displayName = registeredUser?.fname || fname || 'there';

  return (
    <RegistrationLayout transparent plainBackground>
      <div className="welcome-screen">
        <HeroVisual className="hero-visual--welcome">
          <img
            src={welcomeHero}
            alt=""
            className="welcome-screen__hero-img"
            aria-hidden="true"
          />
        </HeroVisual>
        <h2 className="welcome-screen__title">Welcome {displayName}!</h2>
        <p className="welcome-screen__text">
          Welcome to Woliba! You&apos;ll find wellness challenges, fitness and recipe videos,
          and daily tips to support your health goals. Download our iOS or Android app and
          start your wellbeing journey today.
        </p>
        <Button fullWidth onClick={() => window.open('https://woliba.io', '_blank')}>
          Let&apos;s get Started
        </Button>
      </div>
    </RegistrationLayout>
  );
}

export default WelcomeScreen;
