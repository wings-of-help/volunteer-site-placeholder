import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import arrowLeft from '../../assets/ep_arrow-left.svg';
import { requestPasswordReset } from '../../api/user.api';
import { useTranslation } from 'react-i18next';

import './ForgotPasswordPage.scss';

export const ForgotPasswordPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    try {
      setError('');
      setLoading(true);

      await requestPasswordReset(email);

      navigate('/verify-code', { state: { email } });
    } catch (err: any) {
      if (err?.email) {
        setError(err.email[0]);
      } else if (err?.detail) {
        setError(err.detail);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
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

           {error && <p className='forgot__error'>{error}</p>}

          <button
            type='submit'
            disabled={!isValid || loading}
            className='forgot__button'
          >
            {loading ? t('Sending...') : t('Send-code')}
          </button>
        </form>
      </div>
    </div>
  );
};
