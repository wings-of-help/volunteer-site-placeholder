import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import arrowLeft from '../../assets/ep_arrow-left.svg';
import { useTranslation } from 'react-i18next';

import './ForgotPasswordPage.scss';

export const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!isValid) return;

  navigate('/verify-code', { state: { email } });
};


  return (
    <div className='forgot'>
      <div className='forgot__container'>
        <Link to='/signin' className='forgot__back'>
          <img src={arrowLeft} alt='back' className='forgot__back-icon' />
          {t('Back')}
        </Link>

        <h1 className='forgot__title'>{t('Forgot-your-password')}</h1>

        <p className='forgot__subtitle'>
          {t(
            'Enter-your-email-address-and-we-well-send-you-a-verification-code',
          )}
        </p>

        <form onSubmit={handleSubmit} className='forgot__form'>
          <label className='forgot__label'>{t('Email')}</label>

          <input
            type='email'
            value={email}
            placeholder={t('Enter-your-email')}
            onChange={(e) => setEmail(e.target.value)}
            className='forgot__input'
          />

          <button type='submit' disabled={!isValid} className='forgot__button'>
            {t('Send-code')}
          </button>
        </form>
      </div>
    </div>
  );
};
