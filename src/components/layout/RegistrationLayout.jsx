import Header from './Header';
import Footer from './Footer';
import BackgroundIllustrations from './BackgroundIllustrations';

function RegistrationLayout({ children, wide = false, bare = false, transparent = false, plainBackground = false }) {
  return (
    <div className={`registration-page ${plainBackground ? 'registration-page--plain' : ''}`}>
      {!plainBackground && <BackgroundIllustrations />}
      <Header />
      <main className={`registration-page__content ${bare ? 'registration-page__content--bare' : ''}`}>
        {bare ? children : (
          <div className={`form-card ${wide ? 'form-card--wide' : ''} ${transparent ? 'form-card--transparent' : ''}`}>
            {children}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default RegistrationLayout;
