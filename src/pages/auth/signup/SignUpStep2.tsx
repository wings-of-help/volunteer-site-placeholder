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
  const {t} = useTranslation();
  const { setUserRole } = useUserRole();
  const { email, phone_number: phone } = data;

  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const navigate = useNavigate();
  const isFilled = Boolean(email && phone);

  const handleContinue = async () => {
    const emailOk = isEmailValid(email);
    const phoneOk = isPhoneValid(phone);

    setEmailError(!emailOk);
    setPhoneError(!phoneOk);
    setUserRole('distressed');

    if (!emailOk || !phoneOk) return;

    let hasBackendError = false;
    const newBackendErrors: Partial<typeof backendErrors> = {};

    try {
      await checkEmailAvailability(email);
    } catch (error: any) {
      newBackendErrors.email = error?.email || [t("This-email-is-already-in-use")];
      hasBackendError = true;
    }

    try {
      await checkPhoneAvailability(phone);
    } catch (error: any) {
      newBackendErrors.phone_number = error?.phone_number || [
        t("This phone number is already in use"),
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
      {/* Email */}
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>{t("Email")}</span>

          {(emailError || backendErrors.email) && (
            <span className='auth-form__error'>
              {backendErrors.email?.[0] || t('Invalid-email')}
            </span>
          )}
        </span>

        <input
          className={`auth-form__input ${
            emailError || backendErrors.email ? 'auth-form__input--error' : ''
          }`}
          type='email'
          value={email}
          placeholder={t('Enter-your-email')}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
            clearBackendError('email');
          }}
        />
      </label>

      {/* Phone */}
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>{t("Phone-number")}</span>

          {(phoneError || backendErrors.phone_number) && (
            <span className='auth-form__error'>
              {backendErrors.phone_number?.[0] || t('Enter-full-phone-number')}
            </span>
          )}
        </span>

        <div className='auth-form__phone'>
          <div className='auth-form__country'>
            <img src={uaFlag} alt='UA' />
            <span>+380</span>
          </div>

          <input
            className={`auth-form__phone-input ${
              phoneError || backendErrors.phone_number
                ? 'auth-form__input--error'
                : ''
            }`}
            type='tel'
            placeholder='12-345-67-89'
            value={formatUAWithoutCode(phone)}
            onChange={(e) => {
              const digits = getDigits(e.target.value).slice(0, 9);
              setPhone(digits);
              setPhoneError(false);
              clearBackendError('phone_number');
            }}
          />
        </div>

        <span className='auth-form__hint'>
          {t("Used-only-for-volunteering-coordination")}
        </span>
      </label>
    </SignUpForm>
  );
};

export default SignUpStep2;
