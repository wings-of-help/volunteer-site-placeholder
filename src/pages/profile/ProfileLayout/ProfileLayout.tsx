import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileSidebar } from '../../../components/ProfileSidebar/ProfileSidebar';
import arrowLeft from '../../../assets/arrow-left-2.svg';

import './ProfileLayout.scss';
import type { User } from '../../../api/types/auth';

interface Props {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

export const ProfileLayout = ({ children, user, onLogout }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isRootProfile =
    location.pathname === '/profile' || location.pathname === '/profile/';

  const isCreateOrEdit =
    location.pathname.includes('/new') || location.pathname.includes('/edit');

  return (
    <div className='profile'>
      <div className='profile__layout'>
        {/* DESKTOP */}
        {!isMobile && (
          <>
            <ProfileSidebar user={user} onLogoutClick={onLogout} />

            <main className='profile__content'>{children}</main>
          </>
        )}

        {/* MOBILE SIDEBAR */}
        {isMobile && isRootProfile && (
          <ProfileSidebar user={user} onLogoutClick={onLogout} />
        )}

        {/* MOBILE CONTENT */}
        {isMobile && !isRootProfile && (
          <main className='profile__content'>
            {!isCreateOrEdit && (
              <button
                className='profile__back'
                onClick={() => {
                  navigate('/profile');
                  window.scrollTo(0, 0);
                }}
              >
                <img src={arrowLeft} alt='Back' />
                <span>Back to My Account</span>
              </button>
            )}

            {children}
          </main>
        )}
      </div>
    </div>
  );
};
