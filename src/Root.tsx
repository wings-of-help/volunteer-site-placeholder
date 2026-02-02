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

export const Root = () => (
  <StrictMode>
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
                    title='Requests'
                    p='Browse verified requests from people and organizations who need support right now.'
                    p2='Every response matters.'
                  />
                }
              />

              <Route
                path='requests/:cartId'
                element={<CartDetails type='requests' />}
              />

              <Route
                path='offers'
                element={
                  <CatalogPage
                    title='Offers'
                    p='Explore offers from people and organizations ready to help.'
                    p2='Find support that matches your needs.'
                  />
                }
              />

              <Route
                path='offers/:cartId'
                element={<CartDetails type='offers' />}
              />

              <Route path='home' element={<Navigate to='/' replace />} />
            </Route>

            {/* AUTH */}
            <Route element={<AuthLayout />}>
              <Route path='signin' element={<SignInFormPage />} />

              {/* ADMIN SIGN UP */}
              <Route path='administrationsignup'>
                <Route index element={<Navigate to='step-1' replace />} />
                <Route path='step-1' element={<SignUpStep1 admin={true} />} />
                <Route path='step-2' element={<SignUpStep2 admin={true} />} />
                <Route path='step-3' element={<SignUpStep3 admin={true} />} />
                <Route path='step-4' element={<SignUpStep4 />} />
              </Route>

              {/* USER SIGN UP */}
              <Route path='signup'>
                <Route index element={<Navigate to='step-1' replace />} />
                <Route path='step-1' element={<SignUpStep1 admin={false} />} />
                <Route path='step-2' element={<SignUpStep2 admin={false} />} />
                <Route path='step-3' element={<SignUpStep3 admin={false} />} />
                <Route path='step-4' element={<SignUpStep4 />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);
