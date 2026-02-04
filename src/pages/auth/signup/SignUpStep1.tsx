import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../signup/SignUpForm';
import { isNameValid } from '../../../utils/validators';
import { useSignUp } from '../../../context/SignUpContext';

type Props = {
  admin: boolean;
}

const SignUpStep1 = ({admin}: Props) => {
  const { data, setFirstName, setLastName, backendErrors, clearBackendError } =
    useSignUp();
  const { first_name: firstName, last_name: lastName } = data;

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const navigate = useNavigate();

  const isFilled = Boolean(firstName.trim() && lastName.trim());

  const capitalize = (value: string) => {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleContinue = (path: string) => {
    const firstValid = isNameValid(firstName);
    const lastValid = isNameValid(lastName);

    setFirstNameError(!firstValid);
    setLastNameError(!lastValid);

    if (!firstValid || !lastValid) return;

    navigate(path);
  };

  return (
    <>
    {admin === true ? (
      <SignUpForm 
        step={1} 
        isValid={isFilled} 
        onContinue={() => handleContinue('/administrationsignup/step-2')}
      >
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>First name</span>
          {firstNameError && (
            <span className='auth-form__error'>Must contain only letters</span>
          )}
        </span>

        <input
          className={`auth-form__input ${firstNameError ? 'auth-form__input--error' : ''}`}
          value={firstName}
          placeholder='Enter your first name'
          onChange={(e) => {
            setFirstName(capitalize(e.target.value));
            setFirstNameError(false);
          }}
        />
      </label>

      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>Last name</span>
          {lastNameError && (
            <span className='auth-form__error'>Must contain only letters</span>
          )}
        </span>

        <input
          className={`auth-form__input ${lastNameError ? 'auth-form__input--error' : ''}`}
          value={lastName}
          placeholder='Enter your last name'
          onChange={(e) => {
            setLastName(capitalize(e.target.value));
            setLastNameError(false);
          }}
        />
      </label>
    </SignUpForm>
    ) : (
      <SignUpForm 
        step={1} 
        isValid={isFilled} 
        onContinue={() => handleContinue('/signup/step-2')}
      >
      <label className='auth-form__label auth-form__label--with-error'>
        <span className='auth-form__label-row'>
          <span className='auth-form__label-text'>First name</span>
          {(firstNameError || backendErrors.first_name) && (
            <span className='auth-form__error'>
              {backendErrors.first_name?.[0] || 'Must contain only letters'}
            </span>
          )}
        </span>

        <input
          className={`auth-form__input ${
            firstNameError || backendErrors.first_name
              ? 'auth-form__input--error'
              : ''
          }`}
          value={firstName}
          placeholder='Enter your first name'
          onChange={(e) => {
            setFirstName(capitalize(e.target.value));
            setFirstNameError(false);
            clearBackendError('first_name');
          }}
        />
      </label>

<label className='auth-form__label auth-form__label--with-error'>
  <span className='auth-form__label-row'>
    <span className='auth-form__label-text'>Last name</span>

    {(lastNameError || backendErrors.last_name) && (
      <span className='auth-form__error'>
        {backendErrors.last_name?.[0] || 'Must contain only letters'}
      </span>
    )}
  </span>

  <input
    className={`auth-form__input ${
      lastNameError || backendErrors.last_name
        ? 'auth-form__input--error'
        : ''
    }`}
    value={lastName}
    placeholder='Enter your last name'
    onChange={(e) => {
      setLastName(capitalize(e.target.value));
      setLastNameError(false);
      clearBackendError('last_name');
    }}
  />
</label>

    </SignUpForm>
        )
      }
    </>
  );
};

export default SignUpStep1;
