import React from 'react';
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

  const isRootProfile =
    location.pathname === '/profile' || location.pathname === '/profile/';

  const isMobile = window.innerWidth <= 1024;

  const showSidebar = !isMobile || isRootProfile;

  return (
    <div className='profile'>
      <div className='profile__layout'>
        {/* SIDEBAR */}
        {showSidebar && <ProfileSidebar user={user} onLogoutClick={onLogout} />}

        <main className='profile__content'>
          {/* BACK BUTTON */}
          {isMobile && !isRootProfile && (
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
      </div>
    </div>
  );
};
