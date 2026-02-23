import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import './index.scss';

export default function App() {
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isProfilePage = location.pathname.startsWith('/profile');

  return (
    <div className={`home-layout ${isHomePage ? 'home-layout--bg' : ''}`}>
      <Header />
      <Outlet />
      {!isProfilePage && <Footer />}
    </div>
  );
}
