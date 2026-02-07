import { Link } from 'react-router-dom';
import arrowLeft from '../../../assets/arrow-left.svg';
import { useTranslation } from 'react-i18next';

type Props = {
  step: number;
  isValid: boolean;
  onContinue: () => void;
  children: React.ReactNode;
  path?: string;
   globalError?: string;
  submitLabel?: string;
};

const SignUpForm = ({ step, isValid, onContinue, children, path = "signup", globalError,
  submitLabel, }: Props) => {
    const {t} = useTranslation();
  return (
    <div className='auth-layout__container auth-form'>
      <div className='auth-form__header'>
        <h1 className='auth-form__title'>{t("Create-an-Account")}</h1>
        <p className='auth-form__subtitle'>
          {t("Join-Wings-of-Help-to-request-or-provide-help")}
        </p>
      </div>

      <div className='auth-form__step'>
        {step && step > 1 && (
          <Link to={`/${path}/step-${step - 1}`} className='auth-form__back'>
            <img src={arrowLeft} alt='Back' />
          </Link>
        )}
        <span>{`${t("Step")} ${step} ${t("of-4")}`}</span>
      </div>

      <div className='auth-form__fields'>{children}</div>

      <div className='auth-form__actions auth-form__actions--signup'>
        <div className='auth-form__global-error-wrapper'>
          <div className='auth-form__global-error'>{globalError ?? ''}</div>
        </div>

        <button
          className={`auth-form__button ${isValid ? 'auth-form__button--active' : ''}`}
          disabled={!isValid}
          onClick={onContinue}
          type='button'
        >
          {submitLabel ?? t("Continue")}
        </button>

        <div className='auth-form__signin'>
          <span>{t("Already-have-an-account")}</span>
          <Link to='/signin' className='auth-form__signin-link'>
            {t("Sign-in")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
