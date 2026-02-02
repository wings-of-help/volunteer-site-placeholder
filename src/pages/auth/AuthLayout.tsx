import { Outlet, Link } from 'react-router-dom';
import { SignUpProvider } from '../../context/SignUpContext';

import './AuthLayout.scss';
import logo from '../../assets/header_logo_image.svg';

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__header'>
        <Link to='/' className='auth-layout__brand'>
          <img className='auth-layout__logo' src={logo} alt='Wings of Help' />
          <span className='auth-layout__title'>Wings of Help</span>
        </Link>
      </div>

      <div className='auth-layout__form'>
        <SignUpProvider>
          <Outlet />
        </SignUpProvider>
      </div>
    </div>
  );
};

export default AuthLayout;
