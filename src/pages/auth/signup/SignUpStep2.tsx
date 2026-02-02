import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../../../context/SignUpContext';
import SignUpForm from './SignUpForm';
import uaFlag from '../../../assets/flag-ukraine.svg';
import {
  isEmailValid,
  isPhoneValid,
  formatPhone,
} from '../../../utils/validators';
import { useUserRole } from '../../../context/RoleContext';

type Props = {
  admin: boolean;
}

const SignUpStep2 = ({admin}: Props) => {
const { data, setEmail, setPhone } = useSignUp();
const { setUserRole } = useUserRole();
const { email, phone_number: phone } = data;

  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const navigate = useNavigate();

  const isFilled = Boolean(email && phone);

  const handleContinue = (path: string) => {
    const emailOk = isEmailValid(email);
    const phoneOk = isPhoneValid(phone);

    setEmailError(!emailOk);
    setPhoneError(!phoneOk);
    setUserRole("distressed")
    if (!emailOk || !phoneOk) return;

    navigate(path);
  };

  return (
    <>
      {admin === true ? (
        <SignUpForm 
          step={2} 
          isValid={isFilled} 
          onContinue={() => handleContinue('/administrationsignup/step-3')}
          path='administrationsignup'
          >
        <label className='auth-form__label auth-form__label--with-error'>
          <span className='auth-form__label-row'>
            <span className='auth-form__label-text'>Email</span>
            {emailError && (
              <span className='auth-form__error'>Invalid email</span>
            )}
          </span>

          <input
            className={`auth-form__input ${emailError ? 'auth-form__input--error' : ''}`}
            type='email'
            value={email}
            placeholder='Enter your email'
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
          />
        </label>

        <label className='auth-form__label'>
          <span className='auth-form__label-text'>Phone number</span>
          <div className='auth-form__phone'>
            <div className='auth-form__country'>
              <img src={uaFlag} alt='UA' />
              <span>+380</span>
            </div>

            <input
              className='auth-form__phone-input'
              type='tel'
              placeholder='12-345-67-89'
              maxLength={12}
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
            />
          </div>
          <span className='auth-form__hint'>
            Used only for volunteering coordination
          </span>
        </label>
      </SignUpForm> 
      ) : (
        <SignUpForm step={2} isValid={isFilled} onContinue={() => handleContinue('/signup/step-3')}>
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>Email</span>
          {emailError && (
            <span className='auth-form__error'>Invalid email</span>
          )}
        </span>

        <input
          className={`auth-form__input ${emailError ? 'auth-form__input--error' : ''}`}
          type='email'
          value={email}
          placeholder='Enter your email'
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
        />
      </label>
      
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>Phone number</span>
          {phoneError && (
            <span className='auth-form__error'>Enter full phone number</span>
          )}
        </span>

        <div className='auth-form__phone'>
          <div className='auth-form__country'>
            <img src={uaFlag} alt='UA' />
            <span>+380</span>
          </div>

          <input
            className={`auth-form__phone-input ${phoneError ? 'auth-form__input--error' : ''}`}
            type='tel'
            placeholder='12-345-67-89'
            maxLength={12}
            value={phone}
            onChange={(e) => {
              setPhone(formatPhone(e.target.value));
              setPhoneError(false);
            }}
          />
        </div>

        <span className='auth-form__hint'>
          Used only for volunteering coordination
        </span>
      </label>
    </SignUpForm>
      )}
    </>
  );
};

export default SignUpStep2;
