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
import { useTranslation } from 'react-i18next';

type Props = {
  admin: boolean;
};

const SignUpStep4 = ({ admin }: Props) => {
  const {
    data,
    setPassword,
    reset,
    backendErrors,
    setBackendErrors,
    clearBackendError,
  } = useSignUp();

  const {t} =  useTranslation();
  const { password } = data;

  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { showToast } = useToast();
  const navigate = useNavigate();

  // ===== SUBMIT CONDITIONS =====
  const canSubmit = password.length >= 8 && password === confirm && agree;

  // ===== PASSWORD HINT =====
  const passwordHint = (() => {
    if (!password || password.length < 8) return t('Minimum-8-characters');
    if (!hasUppercaseLetter(password))
      return t('Must-contain-at-least-one-uppercase-Latin-letter');
    if (!hasLowercaseLetter(password))
      return t('Must-contain-at-least-one-lowercase-Latin-letter');
    if (!hasSpecialCharacter(password))
      return t('Must-contain-at-least-one-special-character');
    return t('Password-looks-good');
  })();

  // ===== GLOBAL BACKEND ERROR =====
  const globalError =
    backendErrors.first_name?.[0] || backendErrors.last_name?.[0]
      ? t('First-name-and-last-name-must-not-be-empty')
      : backendErrors.detail ||
        backendErrors.email?.[0] ||
        backendErrors.phone_number?.[0];

  // ===== SUBMIT =====
  const handleSubmit = async () => {
    setHasSubmitted(true);
    if (!canSubmit) return;

    try {
      await registerRequest(data);

      showToast(t('Registration-successful'));

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
      path={admin ? 'administrationsignup' : 'signup'}
    >
      {/* PASSWORD */}
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>{t("Password")}</span>

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
            placeholder={t('Create a password')}
            autoComplete='new-password'
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

        <span className='auth-form__hint'>{passwordHint}</span>
      </label>

      {/* CONFIRM PASSWORD */}
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>{t("Confirm-password")}</span>
          {hasSubmitted && confirm !== password && (
            <span className='auth-form__error'>{t("Passwords-do-not-match")}</span>
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
            placeholder={t('Confirm your password')}
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
          {t("I agree-to-the-Terms-of-Use-and-Privacy-Policy")}
        </span>
      </label>
    </SignUpForm>
  ) : (
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
          <span className='auth-form__label-text'>{t("Password")}</span>

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
            placeholder={t('Create-a-password')}
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
          <span className='auth-form__label-text'>{t("Confirm-password")}</span>
          {hasSubmitted && confirm !== password && (
            <span className='auth-form__error'>{t("Passwords-do-not-match")}</span>
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
            placeholder={t('Confirm-your-password')}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      </label>

      {/* TERMS */}
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
          {t("I-agree-to-the-Terms-of-Use-and-Privacy-Policy")}
        </span>
      </label>
    </SignUpForm>
  );
};

export default SignUpStep4;
