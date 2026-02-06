import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { ProfileLayout } from './ProfileLayout/ProfileLayout';
import { ProfileInfo } from './sections/ProfileInfo/ProfileInfo';
import { MyRequests } from './sections/MyRequests/MyRequests';
import { MyResponses } from './sections/MyResponses/MyResponses';
import { CreateRequest } from '../../components/CreateRequest/CreateRequest';
import { Navigate } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'requests' | 'responses'>(
    'info',
  );

  const [isCreating, setIsCreating] = useState(false);
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }
  if (!user) return <Navigate to='/' replace />;

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <ProfileLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      user={user}
      onLogout={handleLogout}
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
  );
};
