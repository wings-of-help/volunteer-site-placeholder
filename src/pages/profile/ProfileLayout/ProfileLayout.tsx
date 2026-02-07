import React from 'react';
import { ProfileSidebar } from '../../../components/ProfileSidebar/ProfileSidebar';
import './ProfileLayout.scss';
import type { User } from '../../../api/types/auth';

interface Props {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

export const ProfileLayout = ({
  children,
  user,
  onLogout,
}: Props) => {
  return (
    <div className='profile'>
      <div className='profile__layout'>
        <ProfileSidebar
          user={user}
          onLogoutClick={onLogout}
        />

        <main className='profile__content'>{children}</main>
      </div>
    </div>
  );
};
