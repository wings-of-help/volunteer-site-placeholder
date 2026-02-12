import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
// import { useAuth } from './context/AuthContext';
import './index.scss';

export default function App() {
  const location = useLocation();
  // const { user } = useAuth();

  // const isHomePage = location.pathname === '/';
  const isProfilePage = location.pathname.startsWith('/profile');

  // фон тільки для home + не логінений
  // const withHomeBackground = isHomePage && !user;

  return (
    // <div className={`home-layout ${withHomeBackground ? 'home-layout--bg' : ''}`}>
    <div className='home-layout home-layout--bg'>
      <Header />
      <Outlet />
      {!isProfilePage && <Footer />}
    </div>
  );
}
