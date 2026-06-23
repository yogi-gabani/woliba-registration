import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRoutes from './routes/AppRoutes';
import DevPreviewInit from './components/dev/DevPreviewInit';
import DevPreviewNav from './components/dev/DevPreviewNav';
import './styles/variables.css';
import './styles/global.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DevPreviewInit />
        <AppRoutes />
        <DevPreviewNav />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
