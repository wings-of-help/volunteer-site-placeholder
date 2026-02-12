import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import arrowLeft from '../../assets/ep_arrow-left.svg';
import './VerifyCodePage.scss';

const CODE_LENGTH = 6;

export const VerifyCodePage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < CODE_LENGTH - 1) {
      const next = document.getElementById(`code-${index + 1}`);
      next?.focus();
    }
  };

  const isFilled = code.every((digit) => digit !== '');

  return (
    <div className='forgot'>
      <div className='forgot__container'>
        <Link to='/forgot-password' className='forgot__back'>
          <img src={arrowLeft} alt='back' className='forgot__back-icon' />
          {t('Back')}
        </Link>

        <h1 className='forgot__title'>{t('Check-your-email')}</h1>

        <p className='forgot__subtitle'>
          {t('Enter-the-6-digit-code-sent-to')} <strong>{email}</strong>
        </p>

        <p className='code__label'>{t('Verification-code')}</p>

        <div className='code'>
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              className='code__input'
              value={digit}
              placeholder='0'
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={1}
            />
          ))}
        </div>

        <button
          className='forgot__button'
          disabled={!isFilled}
          onClick={() => navigate('/new-password')}
        >
          {t('Confirm')}
        </button>

        <div className='code__resend'>
          {t('Didnt-receive-the-code')}
          <button className='code__resend-link'>{t('Resend')}</button>
        </div>
      </div>
    </div>
  );
};
