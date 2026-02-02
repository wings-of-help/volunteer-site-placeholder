import { useState, Fragment } from 'react';
import {
  isEmailValid,
  isPhoneValid,
  formatPhone,
} from '../../../utils/validators';

import '../../auth/AuthLayout.scss';
import './ProfileModal.scss';

import crossIcon from '../../../assets/cross.svg';
import arrowLeftIcon from '../../../assets/ep_arrow-left.svg';
import uaFlag from '../../../assets/flag-ukraine.svg';
import eyeOpen from '../../../assets/eye-open.svg';
import eyeClosed from '../../../assets/eye-closed.svg';

type ModalType = 'email' | 'phone' | 'password';

interface Props {
  type: ModalType;
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

  const titleMap: Record<ModalType, string> = {
    email: 'Change email',
    phone: 'Change phone number',
    password: 'Change password',
  };

  const labelMap: Record<ModalType, string> = {
    email: 'Enter new email',
    phone: 'Phone number',
    password: 'Enter your email',
  };

  const placeholderMap: Record<ModalType, string> = {
    email: 'email@example.com',
    phone: '+380...',
    password: '********',
  };

  const buttonMap: Record<ModalType, string> = {
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
        <div className='modal-overlay' onClick={onClose}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='modal__header'>
              <h2 className='modal__title'>
                {titleMap[type]}
                {type === 'password' && step === 'edit' && (
                  <p className='modal__subtitle-hint'>
                    To change password, verify email first.
                  </p>
                )}
              </h2>

              <button className='modal__close' onClick={onClose}>
                <img src={crossIcon} alt='Close' />
              </button>
            </div>

            <div className='modal__body'>
              <div className='modal__label-row'>
                <label className='modal__label'>{labelMap[type]}</label>
                {error && (
                  <span className='modal__error'>
                    {type === 'phone'
                      ? 'Invalid phone number'
                      : 'Invalid email'}
                  </span>
                )}
              </div>

              {type === 'phone' ? (
                <div className='modal__phone'>
                  <div className='modal__country'>
                    <img src={uaFlag} alt='UA' />
                    <span>+380</span>
                  </div>

                  <input
                    className={`modal__phone-input ${error ? 'modal__input--error' : ''}`}
                    type='tel'
                    placeholder='12-345-67-89'
                    value={value}
                    onChange={(e) => {
                      setValue(formatPhone(e.target.value));
                      setError(false);
                    }}
                  />
                </div>
              ) : (
                <input
                  className={`modal__input ${error ? 'modal__input--error' : ''}`}
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
              className={`modal__submit ${isActive ? 'modal__submit--active' : ''}`}
              onClick={handleSubmit}
            >
              {buttonMap[type]}
            </button>
          </div>
        </div>
      )}

      {step === 'code' && type !== 'phone' && (
        <div className='modal-overlay' onClick={onClose}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='modal__header'>
              <h2 className='modal__title'>{titleMap[type]}</h2>
              <button className='modal__close' onClick={onClose}>
                <img src={crossIcon} alt='Close' />
              </button>
            </div>

            <p className='modal__subtitle'>
              We’ve sent a verification code to <strong>{value}</strong>
            </p>

            <button className='modal__back' onClick={() => setStep('edit')}>
              <img src={arrowLeftIcon} alt='Back' />
            </button>

            <p className='modal__code-label'>Enter verification code</p>

            <div className='modal__code-row'>
              {code.map((digit, i) => (
                <Fragment key={i}>
                  <input
                    key={i}
                    id={`code-${i}`}
                    className='modal__code-input'
                    value={digit}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    maxLength={1}
                  />
                  {i === 2 && <span className='modal__code-separator' />}
                </Fragment>
              ))}
            </div>

            <button
              className={`modal__submit ${isCodeComplete ? 'modal__submit--active' : ''}`}
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

            <div className='modal__resend'>
              <span>Didn’t receive code?</span>
              <button className='modal__resend-link'>Resend</button>
            </div>
          </div>
        </div>
      )}

      {step === 'new-password' && type === 'password' && (
        <div className='modal-overlay' onClick={onClose}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='modal__header'>
              <h2 className='modal__title'>Change password</h2>

              <button className='modal__close' onClick={onClose}>
                <img src={crossIcon} alt='Close' />
              </button>
            </div>
            <button className='modal__back' onClick={() => setStep('code')}>
              <img src={arrowLeftIcon} alt='Back' />
            </button>
            <div className='modal__password-group'>
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

            <div className='modal__password-group'>
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
            <div className='modal__actions'>
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
