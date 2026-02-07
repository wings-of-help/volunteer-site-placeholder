import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../signup/SignUpForm';
import { isOnlyLetters, hasMinTwoLetters } from '../../../utils/validators';
import { useSignUp } from '../../../context/SignUpContext';
import { useTranslation } from 'react-i18next';

type Props = {
  admin: boolean;
};

const SignUpStep1 = ({ admin }: Props) => {
  const {t} = useTranslation();
  const { data, setFirstName, setLastName, backendErrors, clearBackendError } =
    useSignUp();
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
      firstError = t("Must-contain-only-letters");
    } else if (!hasMinTwoLetters(firstName)) {
      firstError = t("Must contain more than one letter");
    }

    if (!isOnlyLetters(lastName)) {
      lastError = t("Must-contain-only-letters");
    } else if (!hasMinTwoLetters(lastName)) {
      lastError = t("Must contain more than one letter");
    }

    setFirstNameError(firstError);
    setLastNameError(lastError);

    if (firstError || lastError) return;

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
              <span className='auth-form__label-text'>{t("First-name")}</span>
              {firstNameError && (
                <span className='auth-form__error'>{firstNameError}</span>
              )}
            </span>

            <input
              className={`auth-form__input ${firstNameError ? 'auth-form__input--error' : ''}`}
              value={firstName}
              placeholder={t("Enter-your-first-name")}
              onChange={(e) => {
                setFirstName(capitalize(e.target.value));
                setFirstNameError(null);
              }}
            />
          </label>

          <label className='auth-form__label auth-form__label--with-error'>
            <span className='auth-form__label-row'>
              <span className='auth-form__label-text'>{t("Last-name")}</span>
              {lastNameError && (
                <span className='auth-form__error'>{lastNameError}</span>
              )}
            </span>

            <input
              className={`auth-form__input ${lastNameError ? 'auth-form__input--error' : ''}`}
              value={lastName}
              placeholder={t("Enter-your-last-name")}
              onChange={(e) => {
                setLastName(capitalize(e.target.value));
                setLastNameError(null);
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
              <span className='auth-form__label-text'>{t("First-name")}</span>
              {(firstNameError || backendErrors.first_name) && (
                <span className='auth-form__error'>
                  {firstNameError || backendErrors.first_name?.[0]}
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
              placeholder={t("Enter-your-first-name")}
              onChange={(e) => {
                setFirstName(capitalize(e.target.value));
                setFirstNameError(null);
                clearBackendError('first_name');
              }}
            />
          </label>

          <label className='auth-form__label auth-form__label--with-error'>
            <span className='auth-form__label-row'>
              <span className='auth-form__label-text'>{t("Last-name")}</span>

              {(lastNameError || backendErrors.last_name) && (
                <span className='auth-form__error'>
                  {lastNameError || backendErrors.first_name?.[0]}
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
              placeholder={t("Enter-your-last-name")}
              onChange={(e) => {
                setLastName(capitalize(e.target.value));
                setLastNameError(null);
                clearBackendError('last_name');
              }}
            />
          </label>
        </SignUpForm>
      )}
    </>
  );
};

export default SignUpStep1;
