import type { ReactNode } from 'react';
import checkIcon from '../../assets/CircleСheck.svg';
import './ConfirmModal.scss';

interface Props {
  title: string;
  description?: ReactNode;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'default' | 'danger';
  icon?: string;
}

export const ConfirmModal = ({
  title,
  description,
  confirmText,
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
  icon,
}: Props) => {
  return (
    <div className='confirm-modal-overlay' onClick={onCancel}>
      <div
        className={`confirm-modal confirm-modal--${variant}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={icon ?? checkIcon}
          alt='Confirm'
          className='confirm-modal__icon'
        />

        <h2 className='confirm-modal__title'>{title}</h2>

        {description && (
          <p className='confirm-modal__description'>{description}</p>
        )}

        <div className='confirm-modal__actions'>
          <button className='confirm-modal__cancel' onClick={onCancel}>
            {cancelText}
          </button>

          <button className='confirm-modal__confirm' onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
