import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import { isPasswordValid } from '../../../utils/validators';

import eyeOpen from '../../../assets/eye-open.svg';
import eyeClosed from '../../../assets/eye-closed.svg';
import checkIcon from '../../../assets/checkbox-check.svg';
import { useSignUp } from '../../../context/SignUpContext';
import { registerRequest } from '../../../api/auth.api';

type Props = {
  admin: boolean;
}

const SignUpStep4 = ({admin}: Props) => {
  const { data, setPassword, reset } = useSignUp();
  const { password } = data;

  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();

  const isMinLength = password.length >= 8;
  const isMatch = password === confirm;
  const isValid = isPasswordValid(password, confirm) && agree;

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      await registerRequest(data);
      reset();
      navigate('/signin');
    } catch (error) {
      console.error('Registration failed:', error);
      // пізніше можна додати показ помилки користувачу
    }
  };

  return (
    <>
    {admin === true ? (
      <SignUpForm 
        step={4} 
        isValid={isValid} 
        onContinue={handleSubmit}
        path='administrationsignup'
      >
        {/* Password */}
        <label className='auth-form__label auth-form__label--with-error'>
          <span className='auth-form__label-row'>
            <span className='auth-form__label-text'>Password</span>
            {!isMinLength && password && (
              <span className='auth-form__error'>Minimum 8 characters</span>
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
              alt='Toggle password'
              className='auth-form__eye'
              onClick={() => setShowPassword((v) => !v)}
            />
          </div>

          <span className='auth-form__hint'>Minimum 8 characters</span>
        </label>

        {/* Confirm */}
        <label className='auth-form__label auth-form__label--with-error'>
          <span className='auth-form__label-row'>
            <span className='auth-form__label-text'>Confirm password</span>
            {confirm && !isMatch && (
              <span className='auth-form__error'>Passwords do not match</span>
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
            alt='Toggle password'
            className='auth-form__eye'
            onClick={() => setShowPassword((v) => !v)}
          />
        </div>
      </label>

        {/* Checkbox */}
        <label className='auth-form__checkbox'>
          <span
            className={`auth-form__checkbox-box ${agree ? 'auth-form__checkbox-box--checked' : ''}`}
            onClick={() => setAgree(!agree)}
          >
            {agree && <img src={checkIcon} alt='checked' />}
          </span>

          <span className='auth-form__checkbox-text'>
            I agree to the Terms of Use and Privacy Policy
          </span>
        </label>
      </SignUpForm>
    ) : (
      <SignUpForm 
        step={4} 
        isValid={isValid} 
        onContinue={handleSubmit}
      >
        {/* Password */}
        <label className='auth-form__label auth-form__label--with-error'>
          <span className='auth-form__label-row'>
            <span className='auth-form__label-text'>Password</span>
            {!isMinLength && password && (
              <span className='auth-form__error'>Minimum 8 characters</span>
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
              alt='Toggle password'
              className='auth-form__eye'
              onClick={() => setShowPassword((v) => !v)}
            />
          </div>

          <span className='auth-form__hint'>Minimum 8 characters</span>
        </label>

        {/* Confirm */}
        <label className='auth-form__label auth-form__label--with-error'>
          <span className='auth-form__label-row'>
            <span className='auth-form__label-text'>Confirm password</span>
            {confirm && !isMatch && (
              <span className='auth-form__error'>Passwords do not match</span>
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
            alt='Toggle password'
            className='auth-form__eye'
            onClick={() => setShowPassword((v) => !v)}
          />
        </div>
      </label>

        {/* Checkbox */}
        <label className='auth-form__checkbox'>
          <span
            className={`auth-form__checkbox-box ${agree ? 'auth-form__checkbox-box--checked' : ''}`}
            onClick={() => setAgree(!agree)}
          >
            {agree && <img src={checkIcon} alt='checked' />}
          </span>

          <span className='auth-form__checkbox-text'>
            I agree to the Terms of Use and Privacy Policy
          </span>
        </label>
      </SignUpForm>
    )}
    </>
  );
};

export default SignUpStep4;
