import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';

import eyeOpen from '../../../assets/eye-open.svg';
import eyeClosed from '../../../assets/eye-closed.svg';
import checkIcon from '../../../assets/checkbox-check.svg';

import { useSignUp } from '../../../context/SignUpContext';
import { registerRequest } from '../../../api/auth.api';
import { useToast } from '../../../context/ToastContext';

import {
  hasUppercaseLetter,
  hasLowercaseLetter,
  hasSpecialCharacter,
} from '../../../utils/validators';

const SignUpStep4 = () => {
  const {
    data,
    setPassword,
    reset,
    backendErrors,
    setBackendErrors,
    clearBackendError,
  } = useSignUp();

  const { password } = data;

  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { showToast } = useToast();
  const navigate = useNavigate();

  // ===== SUBMIT CONDITIONS =====
  const canSubmit = password.length >= 8 && password === confirm && agree;

  // ===== STATIC / DYNAMIC HINT =====
  const passwordHint = (() => {
    if (!password || password.length < 8) return 'Minimum 8 characters';
    if (!hasUppercaseLetter(password))
      return 'Must contain at least one uppercase Latin letter';
    if (!hasLowercaseLetter(password))
      return 'Must contain at least one lowercase Latin letter';
    if (!hasSpecialCharacter(password))
      return 'Must contain at least one special character';
    return 'Password looks good';
  })();

  // ===== BACKEND ERROR =====
  const globalError =
    backendErrors.first_name?.[0] || backendErrors.last_name?.[0]
      ? 'First name and last name must not be empty.'
      : backendErrors.detail ||
        backendErrors.email?.[0] ||
        backendErrors.phone_number?.[0];

  const handleSubmit = async () => {
    setHasSubmitted(true);
    if (!canSubmit) return;

    try {
      await registerRequest(data);

      showToast('Registration successful 🎉');

      setTimeout(() => {
        reset();
        navigate('/signin');
      }, 2500);
    } catch (error: any) {
      setBackendErrors(error);
    }
  };

  return (
    <SignUpForm
      step={4}
      isValid={canSubmit}
      onContinue={handleSubmit}
      globalError={globalError}
      submitLabel='Sign up'
    >
      {/* PASSWORD */}
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>Password</span>

          {hasSubmitted && backendErrors.password && (
            <span className='auth-form__error'>
              {backendErrors.password[0]}
            </span>
          )}
        </span>

        <div className='auth-form__password'>
          <input
            className={`auth-form__input ${
              hasSubmitted && backendErrors.password
                ? 'auth-form__input--error'
                : ''
            }`}
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder='Create a password'
            onChange={(e) => {
              setPassword(e.target.value);
              clearBackendError('password');
            }}
          />

          <img
            src={showPassword ? eyeOpen : eyeClosed}
            alt='Toggle password'
            className='auth-form__eye'
            onClick={() => setShowPassword((v) => !v)}
          />
        </div>

        {/* GREY HINT */}
        <span className='auth-form__hint'>{passwordHint}</span>
      </label>

      {/* CONFIRM */}
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>Confirm password</span>
          {hasSubmitted && confirm !== password && (
            <span className='auth-form__error'>Passwords do not match</span>
          )}
        </span>

        <div className='auth-form__password'>
          <input
            className={`auth-form__input ${
              hasSubmitted && confirm !== password
                ? 'auth-form__input--error'
                : ''
            }`}
            type={showPassword ? 'text' : 'password'}
            value={confirm}
            placeholder='Confirm your password'
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      </label>

      {/* CHECKBOX */}
      <label className='auth-form__checkbox'>
        <span
          className={`auth-form__checkbox-box ${
            agree ? 'auth-form__checkbox-box--checked' : ''
          }`}
          onClick={() => setAgree(!agree)}
        >
          {agree && <img src={checkIcon} alt='checked' />}
        </span>

        <span className='auth-form__checkbox-text'>
          I agree to the Terms of Use and Privacy Policy
        </span>
      </label>
    </SignUpForm>
  );
};

export default SignUpStep4;
