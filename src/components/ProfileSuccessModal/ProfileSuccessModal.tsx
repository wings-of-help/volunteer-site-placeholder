interface Props {
  title: string;
  description: string;
  value?: string;
  onClose: () => void;
}

import checkCircleIcon from '../../assets/CircleСheck.svg';

export const ProfileSuccessModal = ({
  title,
  description,
  value,
  onClose,
}: Props) => {
  return (
    <div className='profile-modal-overlay' onClick={onClose}>
      <div
        className='profile-modal profile-modal--success'
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={checkCircleIcon}
          alt='Success'
          className='profile-modal__success-icon'
        />

        <h2 className='profile-modal__success-title'>{title}</h2>

        <p className='profile-modal__success-text'>
          {description}
          {value && (
            <>
              <br />
              <strong>{value}</strong>
            </>
          )}
        </p>

        <button
          className='profile-modal__submit profile-modal__submit--active'
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>
  );
};
