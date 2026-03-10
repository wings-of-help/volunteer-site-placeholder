import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { resetPassword } from '../../api/user.api';
import { useTranslation } from 'react-i18next';

import eyeOpen from '../../assets/eye-open.svg';
import eyeClosed from '../../assets/eye-closed.svg';
import arrowLeft from '../../assets/ep_arrow-left.svg';

import { PasswordHint } from '../../components/PasswordHint/PasswordHint';
import './VerifyCodePage.scss';

import {
  hasUppercaseLetter,
  hasLowercaseLetter,
  hasSpecialCharacter,
} from '../../utils/validators';

const CODE_LENGTH = 6;

export const VerifyCodePage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const codeValue = code.join('');

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < CODE_LENGTH - 1) {
      const next = document.getElementById(`code-${index + 1}`);
      next?.focus();
    }
  };

  const passwordChecks = {
    length: password.length >= 8 && password.length <= 20,
    uppercase: hasUppercaseLetter(password),
    lowercase: hasLowercaseLetter(password),
    special: hasSpecialCharacter(password),
  };

  const isMatch = password === confirm;

  const isValid =
    codeValue.length === 6 &&
    passwordChecks.length &&
    passwordChecks.uppercase &&
    passwordChecks.lowercase &&
    passwordChecks.special &&
    isMatch;

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      setError('');
      setLoading(true);

      await resetPassword(email, codeValue, password);

      navigate('/signin');
    } catch (err: any) {
      if (Array.isArray(err)) {
        setError(t(err[0]));
      } else if (err?.detail) {
        if (err.detail === 'Invalid or expired code') {
          setError(t('Invalid-or-expired-code'));
        } else {
          setError(t('Something-went-wrong'));
        }
      } else {
        setError(t('Invalid-code-or-password'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='forgot'>
      <div className='forgot__container'>
        <Link to='/forgot-password' className='forgot__back'>
          <img src={arrowLeft} alt='back' className='forgot__back-icon' />
          {t('Back')}
        </Link>

        <h1 className='forgot__title'>{t('Reset-password')}</h1>

        <p className='forgot__subtitle'>
          {t('Enter-the-code-and-create-a-new-password')}
        </p>

        <p className='code__label'>{t('Verification-code')}</p>

        <div className='code__wrapper'>
          <div className='code'>
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                className='code__input'
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength={1}
              />
            ))}
          </div>

          {error && <p className='code__error'>{error}</p>}
        </div>

        <label className='auth-form__label'>
          <span className='auth-form__label-text'>{t('New-password')}</span>

          <div className='auth-form__password'>
            <input
              className='auth-form__input'
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder={t('Create-a-password')}
              autoComplete='new-password'
              onChange={(e) => setPassword(e.target.value)}
            />

            <img
              src={showPassword ? eyeOpen : eyeClosed}
              className='auth-form__eye'
              onClick={() => setShowPassword((v) => !v)}
              alt='toggle'
            />
          </div>
        </label>

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

        <div className='auth-form__password code__confirm'>
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
        {confirm && !isMatch && (
          <p className='auth-form__error'>{t('Passwords-do-not-match')}</p>
        )}

        <button
          className='forgot__button'
          disabled={!isValid || loading}
          onClick={handleSubmit}
        >
          {loading ? t('Saving...') : t('Create-new-password')}
        </button>
      </div>
    </div>
  );
};
