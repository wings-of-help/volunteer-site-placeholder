import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

export default function App() {
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith('/profile');

  return (
    <div>
      <Header />
      <Outlet />
      {!isProfilePage && <Footer />}
    </div>
  );
}
