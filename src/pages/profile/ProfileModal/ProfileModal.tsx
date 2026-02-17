import { useState } from 'react';
import {
  isEmailValid,
  isPhoneValid,
  formatUAWithoutCode,
  hasUppercaseLetter,
  hasLowercaseLetter,
  hasSpecialCharacter,
  getDigits,
} from '../../../utils/validators';
import { PasswordHint } from '../../../components/PasswordHint/PasswordHint';

import '../../auth/AuthLayout.scss';
import './ProfileModal.scss';

import crossIcon from '../../../assets/cross.svg';
import arrowLeftIcon from '../../../assets/ep_arrow-left.svg';
import uaFlag from '../../../assets/flag-ukraine.svg';
import eyeOpen from '../../../assets/eye-open.svg';
import eyeClosed from '../../../assets/eye-closed.svg';
import { useTranslation } from 'react-i18next';
import { CodeStep } from '../../../components/CodeStepModal/CodeStep';
import { ProfileSuccessModal } from '../../../components/ProfileSuccessModal/ProfileSuccessModal';

type modalType = 'email' | 'phone' | 'password';

interface Props {
  type: modalType;
  onClose: () => void;
  onSuccess: (value: string) => void;
}

export const ProfileModal = ({ type, onClose, onSuccess }: Props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [step, setStep] = useState<
    'edit' | 'code' | 'new-password' | 'success'
  >('edit');

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

  const isPasswordValid =
    passwordChecks.length &&
    passwordChecks.uppercase &&
    passwordChecks.lowercase &&
    passwordChecks.special &&
    isMatch;

  const CODE_LENGTH = 6;
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));

  const isActive = Boolean(value);

  const titleMap: Record<modalType, string> = {
    email: t("Change-email"),
    phone: t("Change-phone-number"),
    password: t("Change-password"),
  };

  const labelMap: Record<modalType, string> = {
    email: t("Enter-new-email"),
    phone: t("Phone-number"),
    password: t("Enter-your-email"),
  };

  const placeholderMap: Record<modalType, string> = {
    email: 'email@example.com',
    phone: '+380...',
    password: '********',
  };

  const buttonMap: Record<modalType, string> = {
    email: t("Verify-email"),
    phone: t("Save-phone-number"),
    password: t("Verify-email"),
  };

  const successConfig: Record<
    modalType,
    { title: string; description: string; withValue: boolean }
  > = {
    email: {
      title: t("Email-updated"),
      description: t("Your-email-address-has-been-updated-to"),
      withValue: true,
    },
    phone: {
      title: t("Phone-number-updated"),
      description: t("Your-phone-number-has-been-updated-successfully"),
      withValue: true,
    },
    password: {
      title: t("Password-updated"),
      description: t("Your-password-has-been-changed-successfully"),
      withValue: false,
    },
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
              <h2 className='profile-modal__title'>{titleMap[type]}</h2>

              <button className='profile-modal__close' onClick={onClose}>
                <img src={crossIcon} alt='Close' />
              </button>
            </div>
            {type === 'password' && step === 'edit' && (
              <p className='profile-modal__subtitle-hint'>
                {t('To-change-password-verify-email-first')}
              </p>
            )}

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
                <div
                  className={`auth-form__phone ${
                    error ? 'auth-form__phone--error' : ''
                  }`}
                >
                  <div className='auth-form__country'>
                    <img src={uaFlag} alt='UA' />
                    <span>+380</span>
                  </div>

                  <input
                    className={`auth-form__phone-input ${
                      error ? 'auth-form__input--error' : ''
                    }`}
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
        <CodeStep
          title={titleMap[type]}
          value={value}
          code={code}
          onCodeChange={handleCodeChange}
          onBack={() => setStep('edit')}
          onClose={onClose}
          onConfirm={() => {
            if (type === 'password') {
              setStep('new-password');
            } else {
              onSuccess(value);
              setStep('success');
            }
          }}
        />
      )}

      {step === 'new-password' && type === 'password' && (
        <div className='profile-modal-overlay' onClick={onClose}>
          <div className='profile-modal' onClick={(e) => e.stopPropagation()}>
            <div className='profile-modal__header'>
              <h2 className='profile-modal__title'>{t('Change-password')}</h2>

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
                  <span className='auth-form__label-text'>
                    {t('New-password')}
                  </span>
                </span>

                <div className='auth-form__password'>
                  <input
                    className={`auth-form__input ${
                      !passwordChecks.length && password
                        ? 'auth-form__input--error'
                        : ''
                    }`}
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
              </label>
              <ul className='auth-form__password-hints'>
                <PasswordHint
                  isValid={passwordChecks.length}
                  text={t("8-20-characters")}
                />
                <PasswordHint
                  isValid={passwordChecks.uppercase}
                  text={t("One-uppercase-latin-letter")}
                />
                <PasswordHint
                  isValid={passwordChecks.lowercase}
                  text={t("One-lowercase-latin-letter")}
                />
                <PasswordHint
                  isValid={passwordChecks.special}
                  text={t("One-special-character")}
                />
              </ul>
            </div>

            <div className='profile-modal__password-group'>
              <label className='auth-form__label auth-form__label--with-error'>
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
                    className={`auth-form__input ${confirm && !isMatch ? 'auth-form__input--error' : ''}`}
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
            <div className='profile-modal__actions'>
              <button
                className={`auth-form__button ${isPasswordValid ? 'auth-form__button--active' : ''}`}
                disabled={!isPasswordValid}
                onClick={() => {
                  onSuccess(password);
                  setStep('success');
                }}
              >
                {t('Confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'success' && (
        <ProfileSuccessModal
          title={successConfig[type].title}
          description={successConfig[type].description}
          value={successConfig[type].withValue ? value : undefined}
          onClose={onClose}
        />
      )}
    </>
  );
};
