import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import './index.scss';
import { useState } from 'react';

export default function App() {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  const isHomePage = location.pathname === '/';
  const isProfilePage = location.pathname.startsWith('/profile');

  return (
    <div className={`home-layout ${(isHomePage) ? 'home-layout--bg' : ''}`}>
      <Header />
      <Outlet context={{ setIsPageLoading }} />
      {!isProfilePage && !isPageLoading && <Footer />}
    </div>
  );
}
