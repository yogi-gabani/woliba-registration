import wolibaLogo from '@assets/woliba-logo.png';

function Header() {
  return (
    <header className="registration-header">
      <img src={wolibaLogo} alt="woliba" className="registration-header__logo-img" />
      <div className="registration-header__language">
        <span>Language</span>
        <img
          className="registration-header__flag"
          src="https://flagcdn.com/w20/us.png"
          alt="US flag"
        />
        <span>En</span>
        <span aria-hidden="true">▾</span>
      </div>
    </header>
  );
}

export default Header;
