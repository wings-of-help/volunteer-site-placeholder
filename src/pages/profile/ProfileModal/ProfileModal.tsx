import { useState, Fragment } from 'react';
import {
  isEmailValid,
  isPhoneValid,
  formatUAWithoutCode,
  getDigits,
} from '../../../utils/validators';

import '../../auth/AuthLayout.scss';
import './ProfileModal.scss';

import crossIcon from '../../../assets/cross.svg';
import arrowLeftIcon from '../../../assets/ep_arrow-left.svg';
import uaFlag from '../../../assets/flag-ukraine.svg';
import eyeOpen from '../../../assets/eye-open.svg';
import eyeClosed from '../../../assets/eye-closed.svg';

type modalType = 'email' | 'phone' | 'password';

interface Props {
  type: modalType;
  onClose: () => void;
  onSuccess: (value: string) => void;
}

export const ProfileModal = ({ type, onClose, onSuccess }: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [step, setStep] = useState<'edit' | 'code' | 'new-password'>('edit');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isMinLength = password.length >= 8;
  const isMatch = password === confirm;
  const isPasswordValid = isMinLength && isMatch;

  const CODE_LENGTH = 6;
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));

  const isCodeComplete = code.every((digit) => digit !== '');

  const isActive = Boolean(value);

  const titleMap: Record<modalType, string> = {
    email: 'Change email',
    phone: 'Change phone number',
    password: 'Change password',
  };

  const labelMap: Record<modalType, string> = {
    email: 'Enter new email',
    phone: 'Phone number',
    password: 'Enter your email',
  };

  const placeholderMap: Record<modalType, string> = {
    email: 'email@example.com',
    phone: '+380...',
    password: '********',
  };

  const buttonMap: Record<modalType, string> = {
    email: 'Verify email',
    phone: 'Save phone number',
    password: 'Verify password',
  };

  const handleSubmit = () => {
    if ((type === 'email' || type === 'password') && !isEmailValid(value)) {
      setError(true);
      return;
    }

    if (type === 'phone' && !isPhoneValid(value)) {
      setError(true);
      return;
    }

    if (type === 'phone') {
      onSuccess(`+380 ${value}`);
      onClose();
      return;
    }

    setStep('code');
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < CODE_LENGTH - 1) {
      const next = document.getElementById(`code-${index + 1}`);
      next?.focus();
    }
  };

  return (
    <>
      {step === 'edit' && (
        <div className='profile-modal-overlay' onClick={onClose}>
          <div className='profile-modal' onClick={(e) => e.stopPropagation()}>
            <div className='profile-modal__header'>
              <h2 className='profile-modal__title'>
                {titleMap[type]}
                {type === 'password' && step === 'edit' && (
                  <p className='profile-modal__subtitle-hint'>
                    To change password, verify email first.
                  </p>
                )}
              </h2>

              <button className='profile-modal__close' onClick={onClose}>
                <img src={crossIcon} alt='Close' />
              </button>
            </div>

            <div className='profile-modal__body'>
              <div className='profile-modal__label-row'>
                <label className='profile-modal__label'>{labelMap[type]}</label>
                {error && (
                  <span className='profile-modal__error'>
                    {type === 'phone'
                      ? 'Invalid phone number'
                      : 'Invalid email'}
                  </span>
                )}
              </div>

              {type === 'phone' ? (
                <div className='profile-modal__phone'>
                  <div className='profile-modal__country'>
                    <img src={uaFlag} alt='UA' />
                    <span>+380</span>
                  </div>

                  <input
                    className={`profile-modal__phone-input ${error ? 'profile-modal__input--error' : ''}`}
                    type='tel'
                    placeholder='12-345-67-89'
                    value={formatUAWithoutCode(value)}
                    onChange={(e) => {
                      const digits = getDigits(e.target.value).slice(0, 9);
                      setValue(digits);
                      setError(false);
                    }}
                  />
                </div>
              ) : (
                <input
                  className={`profile-modal__input ${error ? 'profile-modal__input--error' : ''}`}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setError(false);
                  }}
                  type={type === 'password' ? 'email' : type}
                  placeholder={
                    type === 'password'
                      ? 'email@example.com'
                      : placeholderMap[type]
                  }
                />
              )}
            </div>

            <button
              className={`profile-modal__submit ${isActive ? 'profile-modal__submit--active' : ''}`}
              onClick={handleSubmit}
            >
              {buttonMap[type]}
            </button>
          </div>
        </div>
      )}

      {step === 'code' && type !== 'phone' && (
        <div className='profile-modal-overlay' onClick={onClose}>
          <div className='profile-modal' onClick={(e) => e.stopPropagation()}>
            <div className='profile-modal__header'>
              <h2 className='profile-modal__title'>{titleMap[type]}</h2>
              <button className='profile-modal__close' onClick={onClose}>
                <img src={crossIcon} alt='Close' />
              </button>
            </div>

            <p className='profile-modal__subtitle'>
              We’ve sent a verification code to <strong>{value}</strong>
            </p>

            <button
              className='profile-modal__back'
              onClick={() => setStep('edit')}
            >
              <img src={arrowLeftIcon} alt='Back' />
            </button>

            <p className='profile-modal__code-label'>Enter verification code</p>

            <div className='profile-modal__code-row'>
              {code.map((digit, i) => (
                <Fragment key={i}>
                  <input
                    key={i}
                    id={`code-${i}`}
                    className='profile-modal__code-input'
                    value={digit}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    maxLength={1}
                  />
                  {i === 2 && (
                    <span className='profile-modal__code-separator' />
                  )}
                </Fragment>
              ))}
            </div>

            <button
              className={`profile-modal__submit ${isCodeComplete ? 'profile-modal__submit--active' : ''}`}
              disabled={!isCodeComplete}
              onClick={() => {
                console.log('Code confirmed:', code.join(''));

                if (type === 'password') {
                  setStep('new-password');
                } else {
                  // потім тут буде оновлення даних email
                  onSuccess(value);
                  onClose();
                }
              }}
            >
              Confirm
            </button>

            <div className='profile-modal__resend'>
              <span>Didn’t receive code?</span>
              <button className='profile-modal__resend-link'>Resend</button>
            </div>
          </div>
        </div>
      )}

      {step === 'new-password' && type === 'password' && (
        <div className='profile-modal-overlay' onClick={onClose}>
          <div className='profile-modal' onClick={(e) => e.stopPropagation()}>
            <div className='profile-modal__header'>
              <h2 className='profile-modal__title'>Change password</h2>

              <button className='profile-modal__close' onClick={onClose}>
                <img src={crossIcon} alt='Close' />
              </button>
            </div>
            <button
              className='profile-modal__back'
              onClick={() => setStep('code')}
            >
              <img src={arrowLeftIcon} alt='Back' />
            </button>
            <div className='profile-modal__password-group'>
              <label className='auth-form__label auth-form__label--with-error'>
                <span className='auth-form__label-row'>
                  <span className='auth-form__label-text'>New password</span>
                  {!isMinLength && password && (
                    <span className='auth-form__error'>
                      Minimum 8 characters
                    </span>
                  )}
                </span>

                <div className='auth-form__password'>
                  <input
                    className={`auth-form__input ${!isMinLength && password ? 'auth-form__input--error' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder='Create a password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    src={showPassword ? eyeOpen : eyeClosed}
                    className='auth-form__eye'
                    onClick={() => setShowPassword((v) => !v)}
                    alt='toggle'
                  />
                </div>

                <span className='auth-form__hint'>
                  Your new password must be at least 8 characters long
                </span>
              </label>
            </div>

            <div className='profile-modal__password-group'>
              <label className='auth-form__label auth-form__label--with-error'>
                <span className='auth-form__label-row'>
                  <span className='auth-form__label-text'>
                    Confirm new password
                  </span>
                  {confirm && !isMatch && (
                    <span className='auth-form__error'>
                      Passwords do not match
                    </span>
                  )}
                </span>

                <div className='auth-form__password'>
                  <input
                    className={`auth-form__input ${confirm && !isMatch ? 'auth-form__input--error' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    value={confirm}
                    placeholder='Confirm your password'
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
            <div className='profile-modal__actions'>
              <button
                className={`auth-form__button ${isPasswordValid ? 'auth-form__button--active' : ''}`}
                disabled={!isPasswordValid}
                onClick={() => {
                  onSuccess(password);
                  onClose();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
