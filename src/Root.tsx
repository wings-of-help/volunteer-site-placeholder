import { StrictMode } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import App from './App';
import HomePage from './pages/HomePage/HomePage';

import AuthLayout from './pages/auth/AuthLayout';
import SignInFormPage from './pages/auth/signin/SignInFormPage';
import SignUpStep1 from './pages/auth/signup/SignUpStep1';
import SignUpStep2 from './pages/auth/signup/SignUpStep2';
import SignUpStep3 from './pages/auth/signup/SignUpStep3';
import SignUpStep4 from './pages/auth/signup/SignUpStep4';
import { ProfilePage } from './pages/profile/ProfilePage';

import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

import CatalogPage from './pages/CatalogPage/CatalogPage';
import CartDetails from './pages/CartDetailsPage/CartDetailsPage';
import RoleProvider from './context/RoleContext';
import { useTranslation } from 'react-i18next';

export const Root = () => {
  const {t} = useTranslation();
  return (
    <StrictMode>
    <RoleProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* MAIN APP */}
              <Route path='/' element={<App />}>
                <Route index element={<HomePage />} />
                <Route path='profile' element={<ProfilePage />} />

                <Route
                  path='requests'
                  element={
                    <CatalogPage
                      title={t("Requests")}
                      p={t("requests-page-p1")}
                      p2={t("requests-page-p2")}
                      path={'requests'}
                    />
                  }
                />
                <Route path='/requests/:cartId' element={<CartDetails type={'requests'} />} />

                <Route
                  path='offers'
                  element={
                    <CatalogPage
                      title={t('Offers')}
                      p={t("offers-page-p1")}
                      p2={t("offers-page-p2")}
                      path={'offers'}
                    />
                  }
                />
                <Route path='offers/:cartId' element={<CartDetails type={'offers'} />} />

                <Route path='home' element={<Navigate to='/' replace />} />
              </Route>

              {/* AUTH ROUTES */}
              <Route element={<AuthLayout />}>
                <Route path='/signin' element={<SignInFormPage />} />

                <Route path='/administrationsignup'>
                  <Route index element={<Navigate to='step-1' replace />} />
                  <Route path='step-1' element={<SignUpStep1 admin={true} />} />
                  <Route path='step-2' element={<SignUpStep2 admin={true} />} />
                  <Route path='step-3' element={<SignUpStep3 admin={true} />} />
                  <Route path='step-4' element={<SignUpStep4 admin={true} />} />
                </Route>

                <Route path='/signup'>
                  <Route index element={<Navigate to='step-1' replace />} />
                  <Route path='step-1' element={<SignUpStep1 admin={false} />} />
                  <Route path='step-2' element={<SignUpStep2 admin={false} />} />
                  <Route path='step-3' element={<SignUpStep3 admin={false} />} />
                  <Route path='step-4' element={<SignUpStep4 admin={false} />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </RoleProvider>
  </StrictMode>
  )
}