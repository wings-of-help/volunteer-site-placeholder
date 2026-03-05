import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../../../context/SignUpContext';
import SignUpForm from './SignUpForm';
import uaFlag from '../../../assets/flag-ukraine.svg';

import {
  isEmailValid,
  isPhoneValid,
  formatUAWithoutCode,
  getDigits,
} from '../../../utils/validators';
import { useUserRole } from '../../../context/RoleContext';
import {
  checkEmailAvailability,
  checkPhoneAvailability,
} from '../../../api/auth.api';
import { useTranslation } from 'react-i18next';

type Props = {
  admin?: boolean;
};

const SignUpStep2 = ({ admin = false }: Props) => {
  const {
    data,
    setEmail,
    setPhone,
    backendErrors,
    clearBackendError,
    setBackendErrors,
  } = useSignUp();

  const { t } = useTranslation();
  const { setUserRole } = useUserRole();
  const navigate = useNavigate();

  const { email, phone_number: phone } = data;

  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const isFilled = Boolean(email && phone);

  const emailHasError = emailError || backendErrors.email;
  const phoneHasError = phoneError || backendErrors.phone_number;

  const handleContinue = async () => {
    let emailErr: string | null = null;
    let phoneErr: string | null = null;

    if (!isEmailValid(email)) {
      emailErr = t('Invalid-email');
    }

    if (!isPhoneValid(phone)) {
      phoneErr = t('Enter-full-phone-number');
    }

    setEmailError(emailErr);
    setPhoneError(phoneErr);
    setUserRole('distressed');

    if (emailErr || phoneErr) return;

    const newBackendErrors: any = {};
    let hasBackendError = false;

    try {
      await checkEmailAvailability(email);
    } catch {
      newBackendErrors.email = [t('This-email-is-already-in-use')];
      hasBackendError = true;
    }

    try {
      await checkPhoneAvailability(phone);
    } catch {
      newBackendErrors.phone_number = [
        t('This phone number is already in use'),
      ];
      hasBackendError = true;
    }

    if (hasBackendError) {
      setBackendErrors(newBackendErrors);
      return;
    }

    navigate(admin ? '/administrationsignup/step-3' : '/signup/step-3');
  };

  return (
    <SignUpForm step={2} isValid={isFilled} onContinue={handleContinue}>

      {/* EMAIL */}
      <label className="auth-form__label">
        <span className="auth-form__label-text">{t('Email')}</span>

        <input
          type="email"
          value={email}
          placeholder={t('Enter-your-email')}
          className={`auth-form__input ${
            emailHasError ? 'auth-form__input--error' : ''
          }`}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(null);
            clearBackendError('email');
          }}
        />

        {emailHasError && (
          <div className="auth-form__helper auth-form__helper--error">            
            <span>{emailError || backendErrors.email?.[0]}</span>
          </div>
        )}
      </label>

      {/* PHONE */}
      <label className="auth-form__label">
        <span className="auth-form__label-text">{t('Phone-number')}</span>

        <div
          className={`auth-form__phone ${
            phoneHasError ? 'auth-form__phone--error' : ''
          }`}
        >
          <div className="auth-form__country">
            <img src={uaFlag} alt="UA" />
            <span>+380</span>
          </div>

          <input
            type="tel"
            placeholder="00-000-00-00"
            value={formatUAWithoutCode(phone)}
            className="auth-form__phone-input"
            onChange={(e) => {
              const digits = getDigits(e.target.value).slice(0, 9);
              setPhone(digits);
              setPhoneError(null);
              clearBackendError('phone_number');
            }}
          />
        </div>

        {phoneHasError ? (
          <div className="auth-form__helper auth-form__helper--error">
            <span>
              {phoneError || backendErrors.phone_number?.[0]}
            </span>
          </div>
        ) : (
          <div className="auth-form__helper">
            {t('Used-only-for-volunteering-coordination')}
          </div>
        )}
      </label>
    </SignUpForm>
  );
};

export default SignUpStep2;
