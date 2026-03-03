import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import eyeOpen from '../../assets/eye-open.svg';
import eyeClosed from '../../assets/eye-closed.svg';
import arrowLeft from '../../assets/ep_arrow-left.svg';

import { PasswordHint } from '../../components/PasswordHint/PasswordHint';

import {
  hasUppercaseLetter,
  hasLowercaseLetter,
  hasSpecialCharacter,
} from '../../utils/validators';

import '../../components/ForgotPasswordPage/ForgotPasswordPage.scss';

export const NewPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordChecks = {
    length: password.length >= 8 && password.length <= 20,
    uppercase: hasUppercaseLetter(password),
    lowercase: hasLowercaseLetter(password),
    special: hasSpecialCharacter(password),
  };

  const isMatch = password === confirm;

  const isValid =
    passwordChecks.length &&
    passwordChecks.uppercase &&
    passwordChecks.lowercase &&
    passwordChecks.special &&
    isMatch;

  const handleSubmit = () => {
    if (!isValid) return;

    // тут буде API reset password
    navigate('/signin');
  };

  return (
    <div className='auth-layout__container'>
      <Link to='/verify-code' className='forgot__back'>
        <img src={arrowLeft} alt='back' className='forgot__back-icon' />
        {t('Back')}
      </Link>

      <div className='auth-form'>
        <div className='auth-form__header'>
          <h1 className='auth-form__title'>{t('Create-new-password')}</h1>

          <p className='auth-form__subtitle'>
            {t('Enter-a-new-password-to-finish-resetting-your-account')}
          </p>
        </div>

        <div className='auth-form__fields'>
          {/* PASSWORD */}
          <label className='auth-form__label'>
            <span className='auth-form__label-text'>{t('Password')}</span>

            <div className='auth-form__password'>
              <input
                className='auth-form__input'
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder={t('Create-a-password')}
                onChange={(e) => setPassword(e.target.value)}
              />

              <img
                src={showPassword ? eyeOpen : eyeClosed}
                className='auth-form__eye'
                onClick={() => setShowPassword((v) => !v)}
                alt='toggle'
              />
            </div>

            <ul className='auth-form__password-hints'>
              <PasswordHint
                isValid={passwordChecks.length}
                text={t('8-20-characters')}
              />
              <PasswordHint
                isValid={passwordChecks.uppercase}
                text={t('One-uppercase-latin-letter')}
              />
              <PasswordHint
                isValid={passwordChecks.lowercase}
                text={t('One-lowercase-latin-letter')}
              />
              <PasswordHint
                isValid={passwordChecks.special}
                text={t('One-special-character')}
              />
            </ul>
          </label>

          {/* CONFIRM */}
          <label className='auth-form__label'>
            <span className='auth-form__label-row'>
              <span className='auth-form__label-text'>
                {t('Confirm-new-password')}
              </span>

              {confirm && !isMatch && (
                <span className='auth-form__error'>
                  {t('Passwords-do-not-match')}
                </span>
              )}
            </span>

            <div className='auth-form__password'>
              <input
                className={`auth-form__input ${
                  confirm && !isMatch ? 'auth-form__input--error' : ''
                }`}
                type={showPassword ? 'text' : 'password'}
                value={confirm}
                placeholder={t('Confirm-your-password')}
                onChange={(e) => setConfirm(e.target.value)}
              />

              <img
                src={showPassword ? eyeOpen : eyeClosed}
                className='auth-form__eye'
                onClick={() => setShowPassword((v) => !v)}
                alt='toggle'
              />
            </div>
          </label>
        </div>

        <div className='auth-form__actions'>
                    <button
            className='auth-form__button forgot__mt'
            disabled={!isValid}
            onClick={handleSubmit}
          >
            {t('Create-new-password')}
          </button>
        </div>
      </div>
    </div>
  );
};
