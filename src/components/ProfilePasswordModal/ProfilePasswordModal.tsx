import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import eyeOpen from '../../assets/eye-open.svg';
import eyeClosed from '../../assets/eye-closed.svg';
import arrowLeftIcon from '../../assets/ep_arrow-left.svg';
import crossBlack from '../../assets/cross-black.svg';
import { ProfileSuccessModal } from '../ProfileSuccessModal/ProfileSuccessModal';

import {
  hasUppercaseLetter,
  hasLowercaseLetter,
  hasSpecialCharacter,
} from '../../utils/validators';

import { PasswordHint } from '../PasswordHint/PasswordHint';

interface Props {
  onClose: () => void;
  onConfirm: (newPassword: string) => void;
}

export const ProfilePasswordModal = ({ onClose, onConfirm }: Props) => {
  const { t } = useTranslation();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

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
  
  if (step === 'success') {
    return (
      <ProfileSuccessModal
        title={t('Password-updated')}
        description={t('Your-password-has-been-changed-successfully')}
        onClose={onClose}
      />
    );
  }

  return (
    <div className='profile-modal-overlay' onClick={onClose}>
      <div className='profile-modal' onClick={(e) => e.stopPropagation()}>
        <div className='profile-modal__header'>
          <h2 className='profile-modal__title'>{t('Change-password')}</h2>

          <button className='profile-modal__close' onClick={onClose}>
            <img src={crossBlack} alt='cross' />
          </button>
        </div>

        <button className='profile-modal__back' onClick={onClose}>
          <img src={arrowLeftIcon} alt='Back' />
        </button>

        {/* NEW PASSWORD */}
        <div className='profile-modal__password-group'>
          <label className='auth-form__label'>
            <span className='auth-form__label-text'>{t('New-password')}</span>

            <div className='auth-form__password'>
              <input
                className='auth-form__input'
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
              text='8–20 characters'
            />
            <PasswordHint
              isValid={passwordChecks.uppercase}
              text='One uppercase latin letter'
            />
            <PasswordHint
              isValid={passwordChecks.lowercase}
              text='One lowercase latin letter'
            />
            <PasswordHint
              isValid={passwordChecks.special}
              text='One special character'
            />
          </ul>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className='profile-modal__password-group'>
          <label className='auth-form__label'>
            <span className='auth-form__label-text'>
              {t('Confirm-new-password')}
            </span>

            {!isMatch && confirm && (
              <div className='auth-form__helper auth-form__helper--error'>
                {t('Passwords-do-not-match')}
              </div>
            )}

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

        <button
          className={`profile-modal__submit ${
            isValid ? 'profile-modal__submit--active' : ''
          }`}
          disabled={!isValid}
          onClick={() => {
            onConfirm(password);
            setStep('success');
          }}
        >
          {t('Confirm')}
        </button>
      </div>
    </div>
  );
};
