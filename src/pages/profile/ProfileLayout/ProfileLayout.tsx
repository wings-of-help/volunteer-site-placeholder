import React from 'react';
import { ProfileSidebar } from '../../../components/ProfileSidebar/ProfileSidebar';
import './ProfileLayout.scss';
import type { User } from '../../../api/types/auth';

interface Props {
  children: React.ReactNode;
  activeTab: 'info' | 'requests' | 'responses';
  onTabChange: (tab: 'info' | 'requests' | 'responses') => void;
  user: User;
  onLogout: () => void;
}

export const ProfileLayout = ({
  children,
  activeTab,
  onTabChange,
  user,
  onLogout,
}: Props) => {
  return (
    <div className='profile'>
      <div className='profile__layout'>
        <ProfileSidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          user={user}
          onLogout={onLogout}
        />

        <main className='profile__content'>{children}</main>
      </div>
    </div>
  );
};
