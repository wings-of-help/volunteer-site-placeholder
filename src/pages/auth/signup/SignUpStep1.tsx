import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../signup/SignUpForm';
import { isOnlyLetters, hasMinTwoLetters } from '../../../utils/validators';
import { useSignUp } from '../../../context/SignUpContext';
import { useTranslation } from 'react-i18next';
import errorIcon from '../../../assets/red-eye.svg';

type Props = {
  admin: boolean;
};

const SignUpStep1 = ({ admin }: Props) => {
  const { t } = useTranslation();
  const {
    data,
    setFirstName,
    setLastName,
    backendErrors,
    clearBackendError,
  } = useSignUp();

  const { first_name: firstName, last_name: lastName } = data;

  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);

  const navigate = useNavigate();
  const isFilled = Boolean(firstName.trim() && lastName.trim());

  const capitalize = (value: string) => {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleContinue = (path: string) => {
    let firstError: string | null = null;
    let lastError: string | null = null;

    if (!isOnlyLetters(firstName)) {
      firstError = t('Must-contain-only-letters');
    } else if (!hasMinTwoLetters(firstName)) {
      firstError = t('Must contain more than one letter');
    }

    if (!isOnlyLetters(lastName)) {
      lastError = t('Must-contain-only-letters');
    } else if (!hasMinTwoLetters(lastName)) {
      lastError = t('Must contain more than one letter');
    }

    setFirstNameError(firstError);
    setLastNameError(lastError);

    if (firstError || lastError) return;

    navigate(path);
  };

  const renderField = (
    label: string,
    value: string,
    setValue: (val: string) => void,
    error: string | null,
    backendError?: string
  ) => {
    const finalError = error || backendError;

    return (
      <label className='auth-form__label'>
        <span className='auth-form__label-text'>{label}</span>

        <input
          className={`auth-form__input ${
            finalError ? 'auth-form__input--error' : ''
          }`}
          value={value}
          placeholder={label}
          onChange={(e) => {
            setValue(capitalize(e.target.value));
            if (label.includes('First')) {
              setFirstNameError(null);
              clearBackendError('first_name');
            } else {
              setLastNameError(null);
              clearBackendError('last_name');
            }
          }}
        />

        {finalError && (
          <div className='auth-form__helper auth-form__helper--error'>
            <img src={errorIcon} alt='' />
            <span>{finalError}</span>
          </div>
        )}
      </label>
    );
  };

  return (
    <SignUpForm
      step={1}
      isValid={isFilled}
      onContinue={() =>
        handleContinue(
          admin ? '/administrationsignup/step-2' : '/signup/step-2'
        )
      }
    >
      {renderField(
        t('First-name'),
        firstName,
        setFirstName,
        firstNameError,
        backendErrors.first_name?.[0]
      )}

      {renderField(
        t('Last-name'),
        lastName,
        setLastName,
        lastNameError,
        backendErrors.last_name?.[0]
      )}
    </SignUpForm>
  );
};

export default SignUpStep1;
