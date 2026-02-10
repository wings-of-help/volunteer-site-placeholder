import { useTranslation } from 'react-i18next';
import DoorOpenIcon from '../../assets/DoorOpen.svg';
import './LogoutModal.scss';

interface Props {
  onCancel: () => void;
  onConfirm: () => void;
}

export const LogoutModal = ({ onCancel, onConfirm }: Props) => {
  const {t} = useTranslation();
  return (
    <div className="modal-backdrop">
      <div className="logout-modal">
        <img
          src={DoorOpenIcon}
          alt="Logout"
          className="logout-modal__icon"
        />

        <p className="logout-modal__title">
          {t("Are-you-sure-you-want-to-log-out")}
        </p>

        <div className="logout-modal__actions">
          <button
            className="logout-modal__btn logout-modal__btn--cancel"
            onClick={onCancel}
          >
            {t("Cancel")}
          </button>

          <button
            className="logout-modal__btn logout-modal__btn--confirm"
            onClick={onConfirm}
          >
            {t("Logout")}
          </button>
        </div>
      </div>
    </div>
  );
};
