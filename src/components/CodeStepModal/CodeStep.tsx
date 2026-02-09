import { Fragment } from 'react';
import crossIcon from '../../assets/cross.svg';
import arrowLeftIcon from '../../assets/ep_arrow-left.svg';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  value: string;
  code: string[];
  onCodeChange: (index: number, value: string) => void;
  onBack: () => void;
  onConfirm: () => void;
  onClose: () => void;
}

export const CodeStep = ({
  title,
  value,
  code,
  onCodeChange,
  onBack,
  onConfirm,
  onClose,
}: Props) => {
  const { t } = useTranslation();

  const isCodeComplete = code.every((digit) => digit !== '');

  return (
    <div className='profile-modal-overlay' onClick={onClose}>
      <div className='profile-modal' onClick={(e) => e.stopPropagation()}>
        <div className='profile-modal__header'>
          <h2 className='profile-modal__title'>{title}</h2>
          <button className='profile-modal__close' onClick={onClose}>
            <img src={crossIcon} alt='Close' />
          </button>
        </div>

        <p className='profile-modal__subtitle'>
          {t('Weve-sent-a-verification-code-to')}
          <strong>{value}</strong>
        </p>

        <button className='profile-modal__back' onClick={onBack}>
          <img src={arrowLeftIcon} alt='Back' />
        </button>

        <p className='profile-modal__code-label'>
          {t('Enter-verification-code')}
        </p>

        <div className='profile-modal__code-row'>
          {code.map((digit, i) => (
            <Fragment key={i}>
              <input
                id={`code-${i}`}
                className='profile-modal__code-input'
                value={digit}
                onChange={(e) => onCodeChange(i, e.target.value)}
                maxLength={1}
              />
            </Fragment>
          ))}
        </div>

        <button
          className={`profile-modal__submit ${
            isCodeComplete ? 'profile-modal__submit--active' : ''
          }`}
          disabled={!isCodeComplete}
          onClick={onConfirm}
        >
          {t('Confirm')}
        </button>

        <div className='profile-modal__resend'>
          <span>{t('Didnt-receive-code')}</span>
          <button className='profile-modal__resend-link'>
            {t('Resend')}
          </button>
        </div>
      </div>
    </div>
  );
};
