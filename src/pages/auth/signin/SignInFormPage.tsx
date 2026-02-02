import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import eyeClosed from '../../../assets/eye-closed.svg';
import eyeOpen from '../../../assets/eye-open.svg';
import { useAuth } from '../../../context/AuthContext';

const SignInFormPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const { login } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isFilled = Boolean(email && password);

  const handleSignIn = async () => {
    if (!isEmailValid) {
      setEmailError(true);
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (error: any) {
      console.log('CATCH ERROR:', error);
      console.log('DETAIL:', error?.detail);
      setFormError(
        error.detail || 'No active account found with the given credentials',
      );
    }
  };

  return (
    <div className='auth-layout__container auth-form auth-form--signin'>
      <div className='auth-form__header auth-form__header--signin'>
        <h1 className='auth-form__title'>Welcome Back</h1>
        <p className='auth-form__subtitle'>
          Sign in to continue using Wings of Help.
        </p>
      </div>

      <div className='auth-form__fields'>
        <label className='auth-form__label auth-form__label--with-error'>
          <span className='auth-form__label-row'>
            <span className='auth-form__label-text'>Email</span>
            {emailError && (
              <span className='auth-form__error'>Invalid email</span>
            )}
          </span>

          <input
            className={`auth-form__input ${emailError ? 'auth-form__input--error' : ''}`}
            type='email'
            value={email}
            placeholder='Enter your email'
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
              setFormError(null);
            }}
          />
        </label>

        <label className='auth-form__label'>
          <span className='auth-form__label-text'>Password</span>

          <div className='auth-form__password'>
            <input
              className='auth-form__input'
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder='Create a password'
              onChange={(e) => {
                setPassword(e.target.value);
                setFormError(null);
              }}
            />
            <img
              src={showPassword ? eyeClosed : eyeOpen}
              alt='Toggle password'
              className='auth-form__eye'
              onClick={() => setShowPassword((v) => !v)}
            />
          </div>

          <Link to='/forgot-password' className='auth-form__forgot-link'>
            Forgot password?
          </Link>
        </label>
      </div>

      <div className='auth-form__global-error-wrapper'>
        {formError && (
          <span className='auth-form__global-error'>{formError}</span>
        )}
      </div>

      <div className='auth-form__actions'>
        <button
          className={`auth-form__button ${isFilled ? 'auth-form__button--active' : ''}`}
          type='button'
          onClick={handleSignIn}
        >
          Sign in
        </button>

        <div className='auth-form__signin'>
          <span>Don't have an account?</span>
          <Link to='/signup/step-1' className='auth-form__signin-link'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInFormPage;
