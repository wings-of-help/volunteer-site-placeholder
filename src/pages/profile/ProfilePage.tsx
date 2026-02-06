import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { ProfileLayout } from './ProfileLayout/ProfileLayout';
import { ProfileInfo } from './sections/ProfileInfo/ProfileInfo';
import { MyRequests } from './sections/MyRequests/MyRequests';
import { MyResponses } from './sections/MyResponses/MyResponses';
import { CreateRequest } from '../../components/CreateRequest/CreateRequest';
import { Loader } from '../../components/Loader/Loader';
import { LogoutModal } from '../../components/LogoutModal/LogoutModal';

type Tab = 'info' | 'requests' | 'responses';

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const [isCreating, setIsCreating] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  // Loading
  if (isLoading) {
    return <Loader />;
  }

  // Not authorized
  if (!user) {
    return <Navigate to='/' replace />;
  }

  // Open logout modal
  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  // Cancel logout
  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  // Confirm logout
  const handleLogoutConfirm = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <ProfileLayout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        onLogout={handleLogoutClick}
      >
        {activeTab === 'info' && <ProfileInfo user={user} />}

        {activeTab === 'requests' && !isCreating && (
          <MyRequests onCreate={() => setIsCreating(true)} />
        )}

        {activeTab === 'requests' && isCreating && (
          <CreateRequest onBack={() => setIsCreating(false)} />
        )}

        {activeTab === 'responses' && <MyResponses />}
      </ProfileLayout>

      {isLogoutModalOpen && (
        <LogoutModal
          onCancel={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </>
  );
};
