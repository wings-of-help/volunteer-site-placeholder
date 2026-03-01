import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ProfileLayout } from './ProfileLayout/ProfileLayout';
import { TextLoader } from '../../components/TextLoader/TextLoader';
import { LogoutModal } from '../../components/LogoutModal/LogoutModal';
import { useState } from 'react';
import Footer from '../../components/Footer/Footer';

export const ProfilePage = () => {
  const { user, isLoading, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <TextLoader />;
  if (!user) return <Navigate to="/" replace />;

  const handleLogoutConfirm = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <ProfileLayout user={user} onLogout={() => setIsLogoutModalOpen(true)}>
        <Outlet />
      </ProfileLayout>
      <Footer />

      {isLogoutModalOpen && (
        <LogoutModal
          onCancel={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </>
  );
};